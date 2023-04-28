import { FC } from 'react'

import RefreshIcon from '@mui/icons-material/Refresh'
import { Button } from '@mui/material'
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

const compareByDisplayOrder = (a: { displayOrder?: number | null }, b?: { displayOrder?: number | null }) => {
  return (a.displayOrder ?? 0) - (b?.displayOrder ?? 0)
}

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

  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-4 lg:block xl:col-span-3">
          <div className="text-right">
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
        </section>
        <section id="content" className="lg:col-span-8 xl:col-span-9">
          <NestedAccordion
            linksHeader={t('links-header')}
            sectionTitle={beforeRetiring.title}
            subSectionTitle={beforeRetiring.subTitle}
            tasks={beforeRetiring.tasks}
          />
          <NestedAccordion
            linksHeader={t('links-header')}
            sectionTitle={applyingBenefits.title}
            subSectionTitle={applyingBenefits.subTitle}
            tasks={applyingBenefits.tasks}
          />
          <NestedAccordion
            linksHeader={t('links-header')}
            sectionTitle={receivingBenefits.title}
            subSectionTitle={receivingBenefits.subTitle}
            tasks={receivingBenefits.tasks}
          />
        </section>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<TasksProps | {}> = async ({ locale, params }) => {
  const filters = params?.filters

  const translation = await serverSideTranslations(locale ?? 'default', ['common', 'quiz/tasks'])

  const beforeRetiringTasks = [...tasksData.beforeRetiring.tasks].sort(compareByDisplayOrder)
  const applyingBenefitsTasks = [...tasksData.applyingBenefits.tasks].sort(compareByDisplayOrder)
  const receivingBenefitsTasks = [...tasksData.receivingBenefits.tasks].sort(compareByDisplayOrder)

  if (!Array.isArray(filters)) {
    // not filters segement => `/quiz/tasks`
    // return all tasks
    const applyingBenefits = {
      ...tasksData.applyingBenefits,
      tasks: applyingBenefitsTasks,
    }
    const beforeRetiring = {
      ...tasksData.beforeRetiring,
      tasks: beforeRetiringTasks,
    }
    const receivingBenefits = {
      ...tasksData.receivingBenefits,
      tasks: receivingBenefitsTasks,
    }

    return {
      props: {
        ...translation,
        applyingBenefits: tasksGroupDtoMapper.toDto(applyingBenefits, locale),
        beforeRetiring: tasksGroupDtoMapper.toDto(beforeRetiring, locale),
        receivingBenefits: tasksGroupDtoMapper.toDto(receivingBenefits, locale),
      },
    }
  }

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
    const validatedFilters = await filtersSchema.validate(jsonFilters)

    log.debug(validatedFilters)

    function filterTasksByAnswers({ answerKey }: { answerKey: string }) {
      if (answerKey === 'all') return true
      if (validatedFilters.answers === undefined) return true
      if (validatedFilters.answers.length === 0) return true
      return validatedFilters.answers.some((answer) => answer === answerKey)
    }

    function filterTasksByTag({ tags }: { tags: ReadonlyArray<{ code: string }> }) {
      if (validatedFilters.tags === undefined) return true
      if (validatedFilters.tags.length === 0) return true
      return tags.some(({ code }) => validatedFilters.tags?.includes(code))
    }

    const applyingBenefits = {
      ...tasksData.applyingBenefits,
      tasks: applyingBenefitsTasks.filter(filterTasksByAnswers).filter(filterTasksByTag),
    }
    const beforeRetiring = {
      ...tasksData.beforeRetiring,
      tasks: beforeRetiringTasks.filter(filterTasksByAnswers).filter(filterTasksByTag),
    }
    const receivingBenefits = {
      ...tasksData.receivingBenefits,
      tasks: receivingBenefitsTasks.filter(filterTasksByAnswers).filter(filterTasksByTag),
    }

    return {
      props: {
        ...translation,
        applyingBenefits: tasksGroupDtoMapper.toDto(applyingBenefits, locale),
        beforeRetiring: tasksGroupDtoMapper.toDto(beforeRetiring, locale),
        filters: validatedFilters,
        receivingBenefits: tasksGroupDtoMapper.toDto(receivingBenefits, locale),
      },
    }
  } catch (ex) {
    log.warn(ex, 'Invalid param filters')

    // page not found
    return {
      props: {},
      notFound: true,
    }
  }
}

export default Tasks
