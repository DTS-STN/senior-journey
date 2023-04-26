import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../../../components/Layout'
import NestedAccordion from '../../../components/NestedAccordion'
import { Task } from '../../../components/TaskCard'


const TaskListPrint: FC = () => {

  const { t } = useTranslation('quiz/tasks/task-list')
  
  const section1Tasks: Task[] = t('before-retiring.tasks', { returnObjects: true })
  const section2Tasks: Task[] = t('applying-benefits.tasks', { returnObjects: true })
  const section3Tasks: Task[] = t('receiving-benefits.tasks', { returnObjects: true })
  const filterAnswerKeys = new Set(['All', "Unprepared", "CanadaFT", ""])

  const section1FilteredTasks = section1Tasks.filter(task => filterAnswerKeys.has(task['answer-key']))
  const section2FilteredTasks = section2Tasks.filter(task => filterAnswerKeys.has(task['answer-key']))
  const section3FilteredTasks = section3Tasks.filter(task => filterAnswerKeys.has(task['answer-key']))

  return (
    <Layout>
      <NestedAccordion sectionTitle={t('before-retiring.title')} subSectionTitle={t('before-retiring.sub-title')} tasks={section1FilteredTasks} />
      <NestedAccordion sectionTitle={t('applying-benefits.title')} subSectionTitle={t('before-retiring.sub-title')} tasks={section2FilteredTasks} />
      <NestedAccordion sectionTitle={t('receiving-benefits.title')} subSectionTitle={t('before-retiring.sub-title')} tasks={section3FilteredTasks} />
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