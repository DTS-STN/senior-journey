import { Chip, Link } from '@mui/material'

import { TaskDto } from '../lib/types'
import Markdown from './Markdown'

interface TaskCardProps {
  linksHeader: string
  showCheckbox?: boolean
  task: TaskDto
}

const TaskCard: React.FC<TaskCardProps> = ({ linksHeader, showCheckbox, task }) => {
  return (
    <>
      {showCheckbox && <input type="checkbox" className="relative top-2 mb-4 h-6 w-6" />}
      {showCheckbox && <hr />}
      <Markdown>{task.description}</Markdown>
      {task.links.length > 0 && (
        <>
          <h5 className="mb-4 text-sm font-light tracking-wider">{linksHeader}</h5>
          <ul className="mb-4 list-disc space-y-2 pl-7">
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
            <Chip key={tag.code} label={tag.title} />
          ))}
        </div>
      )}
    </>
  )
}

export default TaskCard
