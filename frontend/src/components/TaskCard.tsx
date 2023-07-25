import React from 'react'

import { Chip, Link } from '@mui/material'

import { TaskDto } from '../lib/types'
import Markdown from './Markdown'

interface TaskCardProps {
  linksHeader: string
  showCheckbox?: boolean
  srTag: string
  task: TaskDto
}

const TaskCard = ({ linksHeader, showCheckbox, srTag, task }: TaskCardProps) => {
  return (
    <>
      {showCheckbox && <input type="checkbox" className="relative top-2 mb-4 h-6 w-6" />}
      {showCheckbox && <hr />}
      <Markdown>{task.description}</Markdown>
      {task.links.length > 0 && (
        <>
          <h4 className="mb-4 font-bold">{linksHeader}</h4>
          <ul className="mb-4 list-disc space-y-1 pl-7">
            {task.links.map((link) => (
              <li key={link.link}>
                <Link href={link.link}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {task.tags.length > 0 && (
        <div className="flex gap-2">
          {task.tags.map((tag) => (
            <React.Fragment key={tag.code}>
              <span className="sr-only">{srTag}:</span>
              <Chip key={tag.code} label={tag.title} />
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  )
}

export default TaskCard
