import { FC } from 'react'
import React from 'react'

import { ExpandMore, FilterList } from '@mui/icons-material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Button, Checkbox, Collapse, FormControlLabel, FormGroup, IconButton } from '@mui/material'
import { isEmpty } from 'lodash'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import * as yup from 'yup'

import Layout from '../../../components/Layout'
import NestedAccordion from '../../../components/NestedAccordion'
import { Task } from '../../../components/TaskCard'
import tasksData from '../../../data/tasks.json'
import * as tasksGroupDtoMapper from '../../../lib/mappers/tasks-group-dto-mapper'
import { getLogger } from '../../../logging/log-util'

const log = getLogger('quiz/tasks/[filters].tsx')

const filtersSchema = yup.object({
  answers: yup.array(yup.string().required()),
  tags: yup.array(yup.string().required()),
})

export interface Filters extends yup.InferType<typeof filtersSchema> {}

export type TasksGroupData =
  | typeof tasksData.applyingBenefits
  | typeof tasksData.beforeRetiring
  | typeof tasksData.receivingBenefits

export type TasksGroupDto =
  | Omit<TasksGroupData, 'subTitleEn' | 'subTitleFr' | 'tasks' | 'titleEn' | 'titleFr'> & {
      subTitle: string
      tasks: Task[]
      title: string
    }

interface TasksProps {
  applyingBenefits: TasksGroupDto
  beforeRetiring: TasksGroupDto
  filters?: Filters
  receivingBenefits: TasksGroupDto
}

const Tasks: FC<TasksProps> = ({ applyingBenefits, beforeRetiring, filters, receivingBenefits }) => {
  const { t } = useTranslation('quiz/tasks')

  let [expanded, setExpanded] = React.useState<boolean>(false)
  let [tagsToFilter, setTagToFilter] = React.useState<string[]>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.checked) setTagToFilter([...tagsToFilter, e.target.value])
    else setTagToFilter(tagsToFilter.filter((tag) => tag !== e.target.value))
  }

  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-4 lg:block xl:col-span-3">
          <div className="mb-4 text-right">
            <Button
              component={Link}
              href="/quiz/tasks"
              variant="outlined"
              startIcon={<RefreshIcon />}
              size="large"
              className="w-full md:w-auto lg:w-full"
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
                <ExpandMore className="hidden md:block" />
                <FilterList className="h-10 w-10 rounded-full bg-[#008490] p-1 text-white hover:bg-[#00545f] md:hidden" />
              </IconButton>
            </div>
            <Collapse in={expanded}>
              <FormGroup className="space-y-2" onChange={handleChange}>
                {['life-in-retirement', 'managing-finances', 'public-pensions', 'other-benefits', 'time-sensitive'].map(
                  (tag) => (
                    <FormControlLabel
                      key={tag}
                      className="m-0 rounded-full bg-gray-200"
                      control={
                        <Checkbox
                          value={tag}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<RadioButtonCheckedIcon />}
                        />
                      }
                      label={t(tag)}
                    />
                  )
                )}
              </FormGroup>
            </Collapse>
          </div>
        </section>
        <section id="content" className="lg:col-span-8 xl:col-span-9">
          <NestedAccordion
            linksHeader={t('links-header')}
            sectionTitle={beforeRetiring.title}
            subSectionTitle={beforeRetiring.subTitle}
            tasks={beforeRetiring.tasks.filter((task) => filterTasksByTag(task, { tags: tagsToFilter }))}
          />
          <NestedAccordion
            linksHeader={t('links-header')}
            sectionTitle={applyingBenefits.title}
            subSectionTitle={applyingBenefits.subTitle}
            tasks={beforeRetiring.tasks.filter((task) => filterTasksByTag(task, { tags: tagsToFilter }))}
          />
          <NestedAccordion
            linksHeader={t('links-header')}
            sectionTitle={receivingBenefits.title}
            subSectionTitle={receivingBenefits.subTitle}
            tasks={beforeRetiring.tasks.filter((task) => filterTasksByTag(task, { tags: tagsToFilter }))}
          />
        </section>
      </div>
    </Layout>
  )
}

const compareByDisplayOrder = (a: { displayOrder?: number | null }, b?: { displayOrder?: number | null }) => {
  return (a.displayOrder ?? 0) - (b?.displayOrder ?? 0)
}

const filterTasksByAnswers = ({ answerKey }: { answerKey: string }, filters?: Filters | null) => {
  if (isEmpty(filters?.answers) && answerKey === 'all') return true
  return filters?.answers?.some((answer) => answer === answerKey)
}

const filterTasksByTag = ({ tags }: { tags: ReadonlyArray<{ code: string }> }, filters?: Filters | null) => {
  if (isEmpty(filters?.tags)) return true
  return tags.some(({ code }) => filters?.tags?.includes(code))
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

  const beforeRetiringTasks = [...tasksData.beforeRetiring.tasks].sort(compareByDisplayOrder)
  const applyingBenefitsTasks = [...tasksData.applyingBenefits.tasks].sort(compareByDisplayOrder)
  const receivingBenefitsTasks = [...tasksData.receivingBenefits.tasks].sort(compareByDisplayOrder)

  const applyingBenefits = {
    ...tasksData.applyingBenefits,
    tasks: applyingBenefitsTasks.filter((task) => {
      return filterTasksByAnswers(task, validatedFilters) && filterTasksByTag(task, validatedFilters)
    }),
  }
  const beforeRetiring = {
    ...tasksData.beforeRetiring,
    tasks: beforeRetiringTasks.filter((task) => {
      return filterTasksByAnswers(task, validatedFilters) && filterTasksByTag(task, validatedFilters)
    }),
  }
  const receivingBenefits = {
    ...tasksData.receivingBenefits,
    tasks: receivingBenefitsTasks.filter((task) => {
      return filterTasksByAnswers(task, validatedFilters) && filterTasksByTag(task, validatedFilters)
    }),
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
