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

  const beforeRetiringTasks: Task[] = t('before-retiring.tasks', { returnObjects: true })
  const applyBenefitsTasks: Task[] = t('applying-benefits.tasks', { returnObjects: true })
  const receivingBenefitsTasks: Task[] = t('receiving-benefits.tasks', { returnObjects: true })
  const filterAnswerKeySet = new Set(answers)

  const beforeRetiringFilteredTasks = sortByDisplayOrder(beforeRetiringTasks.filter(task => filterAnswerKeySet.has(task['answer-key'])))
  const applyBenefitsFilteredTasks = sortByDisplayOrder(applyBenefitsTasks.filter(task => filterAnswerKeySet.has(task['answer-key'])))
  const receivingBenefitsFilteredTasks = sortByDisplayOrder(receivingBenefitsTasks.filter(task => filterAnswerKeySet.has(task['answer-key'])))

  // filter by tags
  const tags: string[] = []
  const filterTagSet = new Set(tags);
  const beforeRetiringFilteredTasksByTag = beforeRetiringFilteredTasks.filter(task => filterTagSet.size > 0 ? filterTagSet.has(task['tag']) : true)
  const applyBenefitsFilteredTasksByTag = applyBenefitsFilteredTasks.filter(task => filterTagSet.size > 0 ? filterTagSet.has(task['tag']) : true)
  const receivingBenefitsFilteredTasksByTag = receivingBenefitsFilteredTasks.filter(task => filterTagSet.size > 0 ? filterTagSet.has(task['tag']) : true)

  return (
    <Layout>
      <NestedAccordion sectionTitle={t('before-retiring.title')} subSectionTitle={t('before-retiring.sub-title')} tasks={beforeRetiringFilteredTasksByTag} />
      <NestedAccordion sectionTitle={t('applying-benefits.title')} subSectionTitle={t('before-retiring.sub-title')} tasks={applyBenefitsFilteredTasksByTag} />
      <NestedAccordion sectionTitle={t('receiving-benefits.title')} subSectionTitle={t('before-retiring.sub-title')} tasks={receivingBenefitsFilteredTasksByTag} />
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