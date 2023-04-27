import { FC } from 'react'
import { useRouter, NextRouter } from 'next/router';
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../../../components/Layout'
import NestedAccordion from '../../../components/NestedAccordion'
import { Task } from '../../../components/TaskCard'

function processQueryAnswers(router: NextRouter): string[] {
  const queryAnswers = router.query.answers;

  let answers: string[] = []
  if (Array.isArray(queryAnswers)) {
    answers = queryAnswers
  } else {
    answers = queryAnswers ? decodeURIComponent(queryAnswers).split(',') : []
  }
  answers.push('All')
  return answers
}

function sortByDisplayOrder(array: Task[],): Task[] {
  return array.sort((a, b) => a['display-order'] - b['display-order']);
}


const TaskListPrint: FC = () => {
  const router = useRouter()
  const answers = processQueryAnswers(router);

  const { t } = useTranslation('quiz/tasks/task-list')

  const section1Tasks: Task[] = t('before-retiring.tasks', { returnObjects: true })
  const section2Tasks: Task[] = t('applying-benefits.tasks', { returnObjects: true })
  const section3Tasks: Task[] = t('receiving-benefits.tasks', { returnObjects: true })
  const filterAnswerKeySet = new Set(answers)

  const section1FilteredTasks = sortByDisplayOrder(section1Tasks.filter(task => filterAnswerKeySet.has(task['answer-key'])))
  const section2FilteredTasks = sortByDisplayOrder(section2Tasks.filter(task => filterAnswerKeySet.has(task['answer-key'])))
  const section3FilteredTasks = sortByDisplayOrder(section3Tasks.filter(task => filterAnswerKeySet.has(task['answer-key'])))

  // filter by tags
  const tags: string[] = []
  const filterTagSet = new Set(tags);
  const section1FilteredTasksByTag = section1FilteredTasks.filter(task => filterTagSet.size > 0 ? filterTagSet.has(task['tag']) : true)
  const section2FilteredTasksByTag = section2FilteredTasks.filter(task => filterTagSet.size > 0 ? filterTagSet.has(task['tag']) : true)
  const section3FilteredTasksByTag = section3FilteredTasks.filter(task => filterTagSet.size > 0 ? filterTagSet.has(task['tag']) : true)

  return (
    <Layout>
      <NestedAccordion sectionTitle={t('before-retiring.title')} subSectionTitle={t('before-retiring.sub-title')} tasks={section1FilteredTasksByTag} />
      <NestedAccordion sectionTitle={t('applying-benefits.title')} subSectionTitle={t('before-retiring.sub-title')} tasks={section2FilteredTasksByTag} />
      <NestedAccordion sectionTitle={t('receiving-benefits.title')} subSectionTitle={t('before-retiring.sub-title')} tasks={section3FilteredTasksByTag} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'quiz/tasks/task-list'
    ])),
  },
})

export default TaskListPrint