import { ChangeEvent, FC, MouseEvent, useMemo, useState } from 'react'

import { ExpandLess, ExpandMore, FilterList } from '@mui/icons-material'
import Print from '@mui/icons-material/Print'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Button, Checkbox, Collapse, FormControlLabel, FormGroup, IconButton } from '@mui/material'
import { isEmpty, sortBy } from 'lodash'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import Layout from '../../components/Layout'
import NestedAccordion from '../../components/NestedAccordion'
import tasksData from '../../data/tasks.json'
import { useRemoveQuizData } from '../../lib/hooks/useRemoveQuizData'
import * as tasksGroupDtoMapper from '../../lib/mappers/tasks-group-dto-mapper'
import { TaskTagDto, TasksGroupDto } from '../../lib/types'
import { getLogger } from '../../logging/log-util'
import { getDCTermsTitle } from '../../utils/seo-utils'

const log = getLogger('pages/checklist/[filters].tsx')

const checklistFiltersSchema = yup.object({
  answers: yup.array(yup.string().required()).required(),
  tags: yup.array(yup.string().required()).required(),
})

export interface ChecklistFilters extends yup.InferType<typeof checklistFiltersSchema> {}

interface ChecklistResultsProps {
  applyingBenefits: TasksGroupDto
  beforeRetiring: TasksGroupDto
  filters: ChecklistFilters
  receivingBenefits: TasksGroupDto
}

const ChecklistResults: FC<ChecklistResultsProps> = ({
  applyingBenefits,
  beforeRetiring,
  filters,
  receivingBenefits,
}) => {
  const { t, i18n } = useTranslation('checklist')
  const en = i18n.getFixedT('en', 'checklist')
  const fr = i18n.getFixedT('fr', 'checklist')

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
    router.push(`/checklist/${encodedFilters}`, undefined, { scroll: false })
  }

  const handlePrint = () => {
    window.print()
  }

  function handleOnRestartQuizClick(e: MouseEvent) {
    e.preventDefault()
    removeQuizData()
    router.push('/quiz')
  }

  return (
    <>
      <NextSeo title={t('header')} additionalMetaTags={[getDCTermsTitle(en('header'), fr('header'))]} />
      <Layout
        hideChecklist={true}
        breadcrumbItems={[
          {
            link: t('breadcrumbs.home.link'),
            text: t('breadcrumbs.home.text'),
          },
          {
            link: t('breadcrumbs.learn.link'),
            text: t('breadcrumbs.learn.text'),
          },
        ]}
        hideFooter="print"
        hideHeader="print"
      >
        <section className="mb-10 flex flex-col items-center rounded-3xl bg-gray-surface px-8 py-8 print:hidden md:flex-row-reverse">
          <div className="sm:3/12 pb-4 md:w-1/12 md:pb-0">
            <Image src="/assets/checklist.png" width={120} height={75} sizes="100%" alt="" priority />
          </div>
          <div className="w-11/12">
            <h1 className="font-display text-4xl font-bold text-primary-700 md:text-6xl">{t('header')}</h1>
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
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between border-b">
                <div className="hidden text-xl md:block">{t('filter-tasks')}</div>
                <div className="text-2xl md:hidden">{t('header')}</div>
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
                <FormGroup onChange={handleChange} data-cy="form-group-filter-tasks">
                  {tagsFilter.map(({ code, title }) => (
                    <FormControlLabel
                      key={code}
                      control={<Checkbox name={code} value={code} checked={filters.tags.includes(code) ?? false} />}
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
              className="hidden md:inline-block lg:w-full"
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ChecklistResultsProps | {}> = async ({ locale, params }) => {
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

    const applyingBenefitsDtos = tasksGroupDtoMapper.toDto(
      { ...applyingBenefits, tasks: applyingBenefitsTasks.filter(filterTasksByAnswers) },
      locale
    )

    const beforeRetiringDtos = tasksGroupDtoMapper.toDto(
      { ...beforeRetiring, tasks: beforeRetiringTasks.filter(filterTasksByAnswers) },
      locale
    )

    const receivingBenefitsDtos = tasksGroupDtoMapper.toDto(
      { ...receivingBenefits, tasks: receivingBenefitsTasks.filter(filterTasksByAnswers) },
      locale
    )

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'default', ['common', 'checklist'], null, ['en', 'fr'])),
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

export default ChecklistResults
