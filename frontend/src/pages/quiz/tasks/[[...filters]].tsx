import React, { FC, useMemo, useState } from 'react'

import { ExpandLess, ExpandMore, FilterList } from '@mui/icons-material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import Cached from '@mui/icons-material/Cached'
import { Button, Checkbox, Collapse, FormControlLabel, FormGroup, IconButton } from '@mui/material'
import { isEmpty, sortBy } from 'lodash'
import Print from '@mui/icons-material/Print'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import Layout from '../../../components/Layout'
import NestedAccordion from '../../../components/NestedAccordion'
import tasksData from '../../../data/tasks.json'
import { useRemoveQuizData } from '../../../lib/hooks/useRemoveQuizData'
import * as tasksGroupDtoMapper from '../../../lib/mappers/tasks-group-dto-mapper'
import { TaskTagDto, TasksGroupDto } from '../../../lib/types'
import { getLogger } from '../../../logging/log-util'
import Image from 'next/image'

const log = getLogger('quiz/tasks/[filters].tsx')

const filtersSchema = yup.object({
  answers: yup.array(yup.string().required()),
  tags: yup.array(yup.string().required()),
})

export interface Filters extends yup.InferType<typeof filtersSchema> {}

interface TasksProps {
  applyingBenefits: TasksGroupDto
  beforeRetiring: TasksGroupDto
  filters?: Filters
  receivingBenefits: TasksGroupDto
}

const Tasks: FC<TasksProps> = ({ applyingBenefits, beforeRetiring, filters, receivingBenefits }) => {
  const { t } = useTranslation('quiz/tasks')
  let router = useRouter()
  const { mutate: removeQuizData } = useRemoveQuizData()

  let [expanded, setExpanded] = useState<boolean>(true)

  function filterTasksByTag({ tags }: { tags: ReadonlyArray<{ code: string }> }, filters?: Filters | null) {
    if (isEmpty(filters?.tags)) return true
    return tags.some(({ code }) => filters?.tags?.includes(code))
  }

  const tagsFilter = useMemo(() => {
    const tags: TaskTagDto[] = []
    const tasks = [...applyingBenefits.tasks, ...beforeRetiring.tasks, ...receivingBenefits.tasks]

    tasks.forEach((task) => {
      task.tags.forEach((tag) => {
        if (!tags.some(({ code }) => code === tag.code)) {
          tags.push(tag)
        }
      })
    })

    return sortBy(tags, [
      function (o) {
        return o.code
      },
    ])
  }, [applyingBenefits.tasks, beforeRetiring.tasks, receivingBenefits.tasks])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (!filters) filters = {}
    if (e.target.checked) filters.tags = [...(filters?.tags ?? []), e.target.value]
    else filters.tags = (filters?.tags ?? []).filter((tag) => tag !== e.target.value)
    const encodedFilters = encodeURIComponent(window.btoa(JSON.stringify(filters)))
    router.push(`/quiz/tasks/${encodedFilters}`)
  }

  const handlePrint = () => {
    window.print();
  };

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    removeQuizData()
    router.push('/learn')
  }
  
  return (
    <Layout 
    hideChecklist={true}
    breadcrumbItems={[
      {
        link: t("breadcrumbs.home.link"), 
        text: t("breadcrumbs.home.text")
      },
      {
        link: t("breadcrumbs.learn.link"), 
        text: t("breadcrumbs.learn.text")
      }
    ]}
    hideFooter='print'
    hideHeader='print'
    >
      <section className="print:hidden rounded-3xl bg-gray-surface mb-10 px-8 py-8 flex flex-col md:flex-row-reverse items-center">
          <div className="pb-4 md:pb-0 sm:3/12 md:w-1/12">
                <Image src="/assets/checklist.png" width={120} height={75} sizes="100%" alt="" priority />
            </div>
            <div className="w-11/12">
              <h2 className="font-display text-4xl text-primary-700 md:text-6xl font-bold">
                {t('title')}
              </h2>
            </div>
        </section>
      
      <div className="print:block grid gap-6 lg:grid-cols-12">
        <section className="print:hidden lg:col-span-4 lg:block xl:col-span-3">
          <div className="mb-4">
            <Button
              component={Link}
              href="/quiz/tasks"
              variant="text"
              startIcon={<Cached />}
              size="large"
              className="w-full md:w-auto lg:w-full justify-start font-bold text-base"
              onClick={handleClick}
            >
              {t('restart-quiz')}
            </Button>
          </div>
          <div className="mt-2">
            <div className="mb-2 flex items-center justify-between border-b">
              <div className="hidden text-xl md:block">{t('filter-tasks')}</div>
              <div className="text-2xl md:hidden">{t('your-retirement-checklist')}</div>
              <IconButton
                color="primary"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label={t('show-filters')}
              >
                 {expanded ? <ExpandLess className="hidden md:block" /> : <ExpandMore className="hidden md:block" />}
                <FilterList className="h-10 w-10 rounded-full bg-[#008490] p-1 text-white hover:bg-[#00545f] md:hidden" />
              </IconButton>
            </div>
            <Collapse in={expanded}>
              <FormGroup className="space-y-2" onChange={handleChange}>
                {tagsFilter.map(({ code, title }) => (
                  <FormControlLabel
                    key={code}
                    className="m-0 rounded-full bg-gray-200"
                    control={
                      <Checkbox
                        value={code}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        checked={filters?.tags?.includes(code)}
                      />
                    }
                    label={title}
                  />
                ))}
              </FormGroup>
            </Collapse>
          </div>
          <p>Answers:</p>
          <ul className="mb-4 list-disc space-y-2 pl-7">
            {filters?.answers?.map((answer) => (
              <li key={answer}>{answer}</li>
            ))}
          </ul>
          <p>Tags:</p>
          <ul className="list-disc space-y-2 pl-7">
            {filters?.tags?.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <Button
              onClick={handlePrint}
              variant="outlined"
              startIcon={<Print />}
              size="large"
              className="hidden md:inline md:w-full lg:w-2/5 font-bold border-gray-default"
            >
              {t('print')}
            </Button>
        </section>
        <section id="content" className="lg:col-span-8 xl:col-span-9 print-href">
          <NestedAccordion
            linksHeader={t('links-header')}
            sectionTitle={beforeRetiring.title}
            subSectionTitle={beforeRetiring.subTitle}
            tasks={beforeRetiring.tasks.filter((task) => filterTasksByTag(task, filters))}
          />
          <NestedAccordion
            linksHeader={t('links-header')}
            sectionTitle={applyingBenefits.title}
            subSectionTitle={applyingBenefits.subTitle}
            tasks={applyingBenefits.tasks.filter((task) => filterTasksByTag(task, filters))}
          />
          <NestedAccordion
            linksHeader={t('links-header')}
            sectionTitle={receivingBenefits.title}
            subSectionTitle={receivingBenefits.subTitle}
            tasks={receivingBenefits.tasks.filter((task) => filterTasksByTag(task, filters))}
          />
        </section>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<TasksProps | {}> = async ({ locale, params }) => {
  const filters = params?.filters

  let validatedFilters: Filters | null = null

  if (Array.isArray(filters)) {
    if (filters.length > 1) {
      // can only have one segment
      // page not found
      return {
        props: {},
        notFound: true,
      }
    }

    try {
      const decodedFilters = Buffer.from(filters[0], 'base64url')
      const jsonFilters = JSON.parse(decodedFilters.toString())
      validatedFilters = await filtersSchema.validate(jsonFilters)
      log.debug(validatedFilters)
    } catch (ex) {
      // invalid param filters
      // page not found
      log.warn(ex, 'Invalid param filters')
      return {
        props: {},
        notFound: true,
      }
    }
  }

  const beforeRetiringTasks = sortBy(
    [...tasksData.beforeRetiring.tasks],
    [
      function (o) {
        return o.displayOrder
      },
    ]
  )
  const applyingBenefitsTasks = sortBy(
    [...tasksData.applyingBenefits.tasks],
    [
      function (o) {
        return o.displayOrder
      },
    ]
  )
  const receivingBenefitsTasks = sortBy(
    [...tasksData.receivingBenefits.tasks],
    [
      function (o) {
        return o.displayOrder
      },
    ]
  )

  function filterTasksByAnswers({ answerKey }: { answerKey: string }, filters?: Filters | null) {
    if (isEmpty(filters?.answers) && answerKey === 'all') return true
    return filters?.answers?.some((answer) => answer === answerKey)
  }

  const applyingBenefits = {
    ...tasksData.applyingBenefits,
    tasks: applyingBenefitsTasks.filter((task) => filterTasksByAnswers(task, validatedFilters)),
  }
  const beforeRetiring = {
    ...tasksData.beforeRetiring,
    tasks: beforeRetiringTasks.filter((task) => filterTasksByAnswers(task, validatedFilters)),
  }
  const receivingBenefits = {
    ...tasksData.receivingBenefits,
    tasks: receivingBenefitsTasks.filter((task) => filterTasksByAnswers(task, validatedFilters)),
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'quiz/tasks'])),
      applyingBenefits: tasksGroupDtoMapper.toDto(applyingBenefits, locale),
      beforeRetiring: tasksGroupDtoMapper.toDto(beforeRetiring, locale),
      filters: validatedFilters,
      receivingBenefits: tasksGroupDtoMapper.toDto(receivingBenefits, locale),
    },
  }
}

export default Tasks
