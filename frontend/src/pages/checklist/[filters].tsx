import { ChangeEvent, MouseEvent, useDeferredValue, useEffect, useMemo, useState } from 'react'

import { Cached, ExpandLess, ExpandMore, FilterList, UnfoldMore } from '@mui/icons-material'
import Print from '@mui/icons-material/Print'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material'
import { isEmpty, sortBy } from 'lodash'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import Router from 'next/router'

import checklistBannerImage from '../../../public/assets/checklist-banner.jpg'
import { HeroBanner } from '../../components/HeroBanner'
import Layout from '../../components/Layout'
import { TaskGroupAccordion } from '../../components/TaskGroupAccordion'
import tasksData from '../../data/tasks.json'
import { useRemoveQuizData } from '../../lib/hooks/useRemoveQuizData'
import * as tasksGroupDtoMapper from '../../lib/mappers/tasks-group-dto-mapper'
import { checklistFiltersSchema } from '../../lib/schemas/checklist-filters-schema'
import { ChecklistFilters, TaskTagDto, TasksGroupDto } from '../../lib/types'
import { getLogger } from '../../logging/log-util'
import theme from '../../theme'
import { pageWithServerSideTranslations } from '../../utils/next-i18next-utils'
import { getDCTermsTitle } from '../../utils/seo-utils'

const log = getLogger('pages/checklist/[filters].tsx')

interface ChecklistResultsProps {
  applyingBenefits: TasksGroupDto
  beforeRetiring: TasksGroupDto
  initialExpandedGroups: Array<number>
  initialExpandedTasks: Array<number>
  filters: ChecklistFilters
  receivingBenefits: TasksGroupDto
}

const ChecklistResults = ({
  applyingBenefits,
  beforeRetiring,
  initialExpandedGroups,
  initialExpandedTasks,
  filters,
  receivingBenefits,
}: ChecklistResultsProps) => {
  const { t } = useTranslation(['checklist', 'common'])

  const { mutate: removeQuizData } = useRemoveQuizData()

  const [expandedGroups, setExpandedGroups] = useState(initialExpandedGroups)
  const [expandedTasks, setExpandedTasks] = useState(initialExpandedTasks)
  const deferredExpandedGroups = useDeferredValue(expandedGroups)
  const deferredExpandedTasks = useDeferredValue(expandedTasks)

  const [tagsFilterExpanded, setTagsFilterExpanded] = useState(false)
  const [importantExpanded, setImportantExpanded] = useState(false)

  const allTaskIds = [...beforeRetiring.tasks, ...applyingBenefits.tasks, ...receivingBenefits.tasks].map((t) => t.id)
  const allTasksExpanded = allTaskIds.length === expandedTasks.length

  const desktop = useMediaQuery(theme.breakpoints.up('md'))

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

    return [
      ...tags.filter((tag) => tag.code !== 'other-benefits').sort((a, b) => a.code.localeCompare(b.code)),
      ...tags.filter((tag) => tag.code === 'other-benefits'),
    ]
  }, [applyingBenefits.tasks, beforeRetiring.tasks, receivingBenefits.tasks])

  function handleTagsFilterChange(e: ChangeEvent<HTMLInputElement>) {
    const newFilters = { ...filters }
    if (e.target.checked) newFilters.tags = [...newFilters.tags, e.target.value]
    else newFilters.tags = newFilters.tags.filter((tag) => tag !== e.target.value)
    Router.push({ pathname: Router.pathname, query: { filters: window.btoa(JSON.stringify(newFilters)) } }, undefined, {
      scroll: false,
    })
  }

  const handlePrint = () => {
    window.print()
  }

  function handleOnRestartQuizClick(e: MouseEvent) {
    e.preventDefault()
    removeQuizData()
    Router.push('/quiz')
  }

  function handleOnTaskGroupAccordionChange(id: number, expanded: boolean) {
    setExpandedGroups((prev) => [...new Set(expanded ? [...prev, id] : prev.filter((val) => val !== id))])
  }

  function handleOnTaskAccordionChange(id: number, expanded: boolean) {
    setExpandedTasks((prev) => [...new Set(expanded ? [...prev, id] : prev.filter((val) => val !== id))])
  }

  function handleAllTasksExpandedToggle() {
    setExpandedTasks(allTasksExpanded ? [] : allTaskIds)
  }

  useEffect(() => {
    Router.pathname
    const url = {
      pathname: Router.pathname,
      query: {
        ...Router.query,
        group: deferredExpandedGroups,
        task: deferredExpandedTasks,
      },
    }

    log.debug(url, 'Router replace - useEffect')

    Router.replace(url, undefined, {
      scroll: false,
      shallow: true,
    })
  }, [deferredExpandedGroups, deferredExpandedTasks])

  return (
    <>
      <NextSeo
        title={t('header')}
        description={t('meta.description')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <Layout
        hideChecklist={true}
        breadcrumbItems={[
          {
            link: '/',
            text: t('common:application-name'),
          },
          {
            link: '/learn',
            text: t('breadcrumbs.learn'),
          },
        ]}
        hideFooter="print"
        hideHeader="print"
      >
        <div className="hidden md:block">
          <HeroBanner className="h-[215px] grid-rows-1" imageProps={{ src: checklistBannerImage }}>
            <h1 className="h1 text-primary-700">{t('header')}</h1>
          </HeroBanner>
        </div>

        <div className="grid gap-6 print:block md:pt-8 lg:grid-cols-12">
          <section className="print:hidden lg:col-span-4 lg:block xl:col-span-3">
            <div className="mb-4 hidden lg:block">
              <Button
                variant="text"
                startIcon={<Cached />}
                size="large"
                onClick={handleOnRestartQuizClick}
                className="font-bold"
              >
                {t('restart-quiz')}
              </Button>
            </div>
            <div className="mb-4">
              <details open={importantExpanded}>
                <summary tabIndex={-1} className="mb-2 flex items-center justify-between border-b pb-3">
                  <Button
                    variant="text"
                    color="primary"
                    className="font-display text-xl"
                    onClick={() => setImportantExpanded((prev) => !prev)}
                    aria-expanded={importantExpanded}
                    aria-label={t('important-terms.show')}
                    endIcon={importantExpanded ? <ExpandLess /> : <ExpandMore />}
                    sx={{ justifyContent: 'space-between' }}
                    fullWidth
                    size="large"
                  >
                    {t('important-terms.header')}
                  </Button>
                </summary>
                <List className="p-0" disablePadding>
                  {[
                    {
                      primary: t('important-terms.cpp.header'),
                      secondary: t('important-terms.cpp.definition'),
                    },
                    {
                      primary: t('important-terms.oas.header'),
                      secondary: t('important-terms.oas.definition'),
                    },
                    {
                      primary: t('important-terms.gis.header'),
                      secondary: t('important-terms.gis.definition'),
                    },
                  ].map(({ primary, secondary }) => (
                    <ListItem key={primary} className="border-b py-2  pl-0">
                      <ListItemText
                        primary={primary}
                        primaryTypographyProps={{ className: 'text-lg mb-2' }}
                        secondary={secondary}
                        secondaryTypographyProps={{ className: 'text-base' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </details>
            </div>

            <div className="md:mb-2">
              <details open={tagsFilterExpanded}>
                <summary
                  tabIndex={-1}
                  className="flex items-center justify-between font-display text-xl md:mb-2 md:border-b md:pb-3"
                >
                  <div className="text-2xl md:hidden">{t('header')}</div>
                  {!desktop && (
                    <IconButton
                      color="primary"
                      onClick={() => setTagsFilterExpanded((prev) => !prev)}
                      aria-expanded={tagsFilterExpanded}
                      aria-label={t('show-filters')}
                    >
                      <FilterList className="h-10 w-10 rounded-full bg-[#008490] p-1 text-white hover:bg-[#00545f]" />
                    </IconButton>
                  )}
                  {desktop && (
                    <Button
                      variant="text"
                      color="primary"
                      className="font-display text-xl"
                      onClick={() => setTagsFilterExpanded((prev) => !prev)}
                      aria-expanded={tagsFilterExpanded}
                      aria-label={t('show-filters')}
                      endIcon={tagsFilterExpanded ? <ExpandLess /> : <ExpandMore />}
                      sx={{ justifyContent: 'space-between' }}
                      fullWidth
                      size="large"
                    >
                      {t('filter-tasks', { count: filters.tags.length })}
                    </Button>
                  )}
                </summary>
                <FormGroup onChange={handleTagsFilterChange} data-cy="form-group-filter-tasks">
                  {tagsFilter.map(({ code, title }) => (
                    <FormControlLabel
                      key={code}
                      control={<Checkbox name={code} value={code} checked={filters.tags.includes(code) ?? false} />}
                      label={title}
                    />
                  ))}
                </FormGroup>
              </details>
            </div>
            <div className="hidden lg:flex lg:flex-wrap lg:gap-6">
              <Button onClick={handlePrint} variant="outlined" startIcon={<Print />} className="font-bold">
                {t('print')}
              </Button>
              <Button
                onClick={handleAllTasksExpandedToggle}
                variant="outlined"
                startIcon={<UnfoldMore />}
                className="font-bold"
              >
                {t(allTasksExpanded ? 'close-all' : 'open-all')}
              </Button>
            </div>
          </section>
          <section id="content" className="print-href flex flex-col gap-4 lg:col-span-8 xl:col-span-9">
            <TaskGroupAccordion
              expanded={expandedGroups.includes(beforeRetiring.id)}
              expandedTasks={expandedTasks}
              id={beforeRetiring.id}
              linksHeader={t('links-header')}
              onTaskAccordionChange={handleOnTaskAccordionChange}
              onTaskGroupAccordionChange={handleOnTaskGroupAccordionChange}
              sectionTitle={beforeRetiring.title}
              subSectionTitle={beforeRetiring.subTitle}
              srTag={t('sr-tag')}
              tasks={beforeRetiring.tasks.filter((task) => filterTasksByTag(task, filters))}
            />
            <TaskGroupAccordion
              expanded={expandedGroups.includes(applyingBenefits.id)}
              expandedTasks={expandedTasks}
              id={applyingBenefits.id}
              linksHeader={t('links-header')}
              onTaskAccordionChange={handleOnTaskAccordionChange}
              onTaskGroupAccordionChange={handleOnTaskGroupAccordionChange}
              sectionTitle={applyingBenefits.title}
              subSectionTitle={applyingBenefits.subTitle}
              srTag={t('sr-tag')}
              tasks={applyingBenefits.tasks.filter((task) => filterTasksByTag(task, filters))}
            />
            <TaskGroupAccordion
              expanded={expandedGroups.includes(receivingBenefits.id)}
              expandedTasks={expandedTasks}
              id={receivingBenefits.id}
              linksHeader={t('links-header')}
              onTaskAccordionChange={handleOnTaskAccordionChange}
              onTaskGroupAccordionChange={handleOnTaskGroupAccordionChange}
              sectionTitle={receivingBenefits.title}
              subSectionTitle={receivingBenefits.subTitle}
              srTag={t('sr-tag')}
              tasks={receivingBenefits.tasks.filter((task) => filterTasksByTag(task, filters))}
            />
            <div className="mt-4 print:hidden lg:hidden">
              <Button
                variant="text"
                startIcon={<Cached />}
                size="large"
                onClick={handleOnRestartQuizClick}
                className="font-bold"
              >
                {t('restart-quiz')}
              </Button>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const queryVariableToNumberArray = (queryVariable: string | string[] | undefined): Array<number> => {
  if (typeof queryVariable === 'undefined') return []
  if (typeof queryVariable === 'string') return isNaN(parseInt(queryVariable)) ? [] : [parseInt(queryVariable)]
  return [...new Set(queryVariable.filter((value) => !isNaN(parseInt(value))).map((value) => parseInt(value)))]
}

export const getServerSideProps: GetServerSideProps<ChecklistResultsProps | {}> = async ({ locale, params, query }) => {
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
    log.debug(validatedFilters, 'Validated filters')

    const { applyingBenefits, beforeRetiring, receivingBenefits } = tasksData

    function sortTasksByDisplayOrder(
      tasks: typeof applyingBenefits.tasks | typeof beforeRetiring.tasks | typeof receivingBenefits.tasks,
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
      if (answerKey === 'all') return true
      return validatedFilters.answers.some((answer) => answer === answerKey)
    }

    const applyingBenefitsDtos = tasksGroupDtoMapper.toDto(
      { ...applyingBenefits, tasks: applyingBenefitsTasks.filter(filterTasksByAnswers) },
      locale,
    )

    const beforeRetiringDtos = tasksGroupDtoMapper.toDto(
      { ...beforeRetiring, tasks: beforeRetiringTasks.filter(filterTasksByAnswers) },
      locale,
    )

    const receivingBenefitsDtos = tasksGroupDtoMapper.toDto(
      { ...receivingBenefits, tasks: receivingBenefitsTasks.filter(filterTasksByAnswers) },
      locale,
    )

    return {
      props: {
        ...(await pageWithServerSideTranslations(locale, 'checklist')),
        applyingBenefits: applyingBenefitsDtos,
        beforeRetiring: beforeRetiringDtos,
        initialExpandedGroups: queryVariableToNumberArray(
          query.group ?? [applyingBenefitsDtos.id, beforeRetiringDtos.id, receivingBenefitsDtos.id].map(String),
        ),
        initialExpandedTasks: queryVariableToNumberArray(query.task),
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
