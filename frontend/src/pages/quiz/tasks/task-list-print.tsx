import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TaskCard, { Task } from '../../../components/TaskCard' 

const TaskListPrint: FC = () => {

  const { t } = useTranslation('quiz/tasks/task-list')
  const section1Tasks: Task[] = t('section-1.tasks', { returnObjects: true })
  const section2Tasks: Task[] = t('section-2.tasks', { returnObjects: true })
  const section3Tasks: Task[] = t('section-3.tasks', { returnObjects: true })
  const filterIds = new Set(['1', '3', '20', '30', '100'])

  const section1FilteredTasks = section1Tasks.filter(task => filterIds.has(task.id))
  const section2FilteredTasks = section2Tasks.filter(task => filterIds.has(task.id))
  const section3FilteredTasks = section3Tasks.filter(task => filterIds.has(task.id))

  return (

    <div className="mx-4">
      {section1FilteredTasks.length > 0
        && (<div className="pl-5 mb-4 mt-4">
          <strong>{t('section-1.title')}</strong>
          <hr className="mt-4" />
        </div>)}
      {section1FilteredTasks.map((task, index) => (
        <TaskCard key={task.id} showCheckbox={true}
          task={task}/>
      ))}

      {section2FilteredTasks.length > 0
        && (<div className="pl-5 mb-4 mt-4">
          <strong>{t('section-2.title')}</strong>
          <hr className="mt-4" />
        </div>)}

      {section2FilteredTasks.map((task, index) => (
        <TaskCard key={task.id} showCheckbox={true}
          task={task} />
      ))}

      {section3FilteredTasks.length > 0
        && (<div className="pl-5 mb-4 mt-4">
          <strong>{t('section-3.title')}</strong>
          <hr className="mt-4" />
        </div>)}

      {section3FilteredTasks.map((task, index) => (
        <TaskCard key={task.id} showCheckbox={true}
          task={task} />
      ))}

    </div>
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
