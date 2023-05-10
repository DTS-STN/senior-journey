import { ChangeEvent, FC, MouseEvent, useMemo, useState } from 'react'

import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined, ExpandLess, ExpandMore, FilterList } from '@mui/icons-material'
import Print from '@mui/icons-material/Print'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Button, Checkbox, Collapse, FormControlLabel, FormGroup, IconButton } from '@mui/material'
import { isEmpty, sortBy } from 'lodash'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import Image from 'next/image'

import Layout from '../../components/Layout'
import NestedAccordion from '../../components/NestedAccordion'
import tasksData from '../../data/tasks.json'
import { useRemoveQuizData } from '../../lib/hooks/useRemoveQuizData'
import * as tasksGroupDtoMapper from '../../lib/mappers/tasks-group-dto-mapper'
import { TaskTagDto, TasksGroupDto } from '../../lib/types'
import { getLogger } from '../../logging/log-util'

const log = getLogger('pages/checklist/[filters].tsx')

const checklistFiltersSchema = yup.object({
  answers: yup.array(yup.string().required()).required(),
  tags: yup.array(yup.string().required()).required(),
})

export interface ChecklistFilters extends yup.InferType<typeof checklistFiltersSchema> {}

interface ChecklistProps {
  applyingBenefits: TasksGroupDto
  beforeRetiring: TasksGroupDto
  filters: ChecklistFilters
  receivingBenefits: TasksGroupDto
}

const Tasks: FC<ChecklistProps> = ({ applyingBenefits, beforeRetiring, filters, receivingBenefits }) => {
  const { t } = useTranslation('checklist')
  let router = useRouter()
  const { mutate: removeQuizData } = useRemoveQuizData()

  let [expanded, setExpanded] = useState(true)

  function filterTasksByTag({ tags }: { tags: ReadonlyArray<{ code: string }> }, filters: ChecklistFilters) {
    if (isEmpty(filters.tags)) return true
    return tags.some(({ code }) => filters.tags.includes(code))
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

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const newFilters = { ...filters }
    if (e.target.checked) newFilters.tags = [...newFilters.tags, e.target.value]
    else newFilters.tags = newFilters.tags.filter((tag) => tag !== e.target.value)
    const encodedFilters = encodeURIComponent(window.btoa(JSON.stringify(newFilters)))
    router.push(`/checklist/${encodedFilters}`)
  }

  const handlePrint = () => {
    window.print()
  }

  function handleOnRestartQuizClick(e: MouseEvent) {
    e.preventDefault()
    removeQuizData()
    router.push('/learn')
  }

  return (
    <Layout
      hideChecklist={true}
      breadcrumbItems={[
        {
          link: t('breadcrumbs.home.link'),
          text: t('breadcrumbs.home.text'),
        },
        {
        link: t("breadcrumbs.learn.link"), 
        text: t("breadcrumbs.learn.text")
        }
      ]}
      hideFooter="print"
      hideHeader="print"
    >

        <section className="print:hidden rounded-3xl bg-gray-surface mb-10 px-8 py-8 flex flex-col md:flex-row-reverse items-center">
          <div className="pb-4 md:pb-0 sm:3/12 md:w-1/12">
                <Image src="/assets/checklist.png" width={120} height={75} sizes="100%" alt="" priority />
            </div>
            <div className="w-11/12">
              <h2 className="font-display text-4xl text-primary-700 md:text-6xl font-bold">
                {t('your-retirement-checklist')}
              </h2>
            </div>
        </section>
        
      <div className="grid gap-6 print:block lg:grid-cols-12">
        <section className="print:hidden lg:col-span-4 lg:block xl:col-span-3">
          <div className="mb-4 text-right">
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              size="large"
              className="w-full md:w-auto lg:w-full"
              onClick={handleOnRestartQuizClick}
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
                    className={`m-0 rounded ${filters?.tags.includes(code) ? 'bg-[#CDF9FF]' : 'bg-gray-200'}`}
                    control={
                      <Checkbox
                        value={code}
                        icon={<CheckBoxOutlineBlankOutlined />}
                        checkedIcon={<CheckBoxOutlined />}
                        checked={filters.tags.includes(code) ?? false}
                      />
                    }
                    label={title}
                  />
                ))}
              </FormGroup>
            </Collapse>
          </div>
          <Button
            onClick={handlePrint}
            variant="outlined"
            startIcon={<Print />}
            size="large"
            className="mt-5 hidden border-gray-default font-bold md:inline md:w-full lg:w-2/5"
          >
            {t('print')}
          </Button>
        </section>
        <section id="content" className="print-href lg:col-span-8 xl:col-span-9">
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

export const getServerSideProps: GetServerSideProps<ChecklistProps | {}> = async ({ locale, params }) => {
  const filters = params?.filters

  if (typeof filters !== 'string') {
    // page not found
    return {
      props: {},
      notFound: true,
    }
  }

  try {
    const decodedFilters = Buffer.from(filters, 'base64url')
    const jsonFilters = JSON.parse(decodedFilters.toString())
    const validatedFilters = await checklistFiltersSchema.validate(jsonFilters)
    log.debug(validatedFilters)

    const { applyingBenefits, beforeRetiring, receivingBenefits } = tasksData

    function sortTasksByDisplayOrder(
      tasks: typeof applyingBenefits.tasks | typeof beforeRetiring.tasks | typeof receivingBenefits.tasks
    ) {
      return sortBy(tasks, [
        function (o) {
          return o.displayOrder
        },
      ])
    }

    const applyingBenefitsTasks = sortTasksByDisplayOrder(applyingBenefits.tasks)
    const beforeRetiringTasks = sortTasksByDisplayOrder(beforeRetiring.tasks)
    const receivingBenefitsTasks = sortTasksByDisplayOrder(receivingBenefits.tasks)

    function filterTasksByAnswers({ answerKey }: { answerKey: string }) {
      if (isEmpty(validatedFilters.answers) && answerKey === 'all') return true
      return validatedFilters.answers.some((answer) => answer === answerKey)
    }

    const applyingBenefitsDtos = tasksGroupDtoMapper.toDto({
      ...applyingBenefits,
      tasks: applyingBenefitsTasks.filter(filterTasksByAnswers),
    })

    const beforeRetiringDtos = tasksGroupDtoMapper.toDto({
      ...beforeRetiring,
      tasks: beforeRetiringTasks.filter(filterTasksByAnswers),
    })

    const receivingBenefitsDtos = tasksGroupDtoMapper.toDto({
      ...receivingBenefits,
      tasks: receivingBenefitsTasks.filter(filterTasksByAnswers),
    })

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'default', ['common', 'checklist'])),
        applyingBenefits: applyingBenefitsDtos,
        beforeRetiring: beforeRetiringDtos,
        filters: validatedFilters,
        receivingBenefits: receivingBenefitsDtos,
      },
    }
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

export default Tasks
