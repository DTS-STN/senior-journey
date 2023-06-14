import React, { useCallback, useEffect, useRef } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Collapse, Paper } from '@mui/material'

import { TaskDto } from '../lib/types'
import { TaskAccordion } from './TaskAccordion'

export interface TaskGroupAccordionProps {
  expanded: boolean
  expandedTasks: ReadonlyArray<number>
  id: number
  linksHeader: string
  onTaskAccordionChange: (id: number, expanded: boolean) => void
  onTaskGroupAccordionChange: (id: number, expanded: boolean) => void
  sectionTitle: string
  subSectionTitle: string
  srTag: string
  tasks: ReadonlyArray<TaskDto>
}

export const TaskGroupAccordion: React.FC<TaskGroupAccordionProps> = ({
  expanded,
  expandedTasks,
  id,
  linksHeader,
  onTaskAccordionChange,
  onTaskGroupAccordionChange,
  sectionTitle,
  subSectionTitle,
  srTag,
  tasks = [],
}) => {
  const disabled = tasks.length === 0
  const detailsRef = useRef<HTMLDetailsElement | null>(null)

  const handleOnDetailsToggle = useCallback(() => {
    onTaskGroupAccordionChange(id, detailsRef.current?.open ?? false)
  }, [id, onTaskGroupAccordionChange])

  useEffect(() => {
    const detailsElement = detailsRef.current

    if (detailsElement) {
      detailsElement.addEventListener('toggle', handleOnDetailsToggle)

      return () => {
        detailsElement.removeEventListener('toggle', handleOnDetailsToggle)
      }
    }
  }, [handleOnDetailsToggle])

  return (
    <Paper square>
      <details
        ref={detailsRef}
        className="group/task-group aria-disabled:opacity-[0.54]"
        aria-disabled={disabled}
        open={disabled ? false : expanded}
        data-gc-analytics-expand={sectionTitle}
      >
        <summary className="focus:outline-0 flex cursor-pointer  gap-2 bg-primary-800 px-4 py-5 text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary-700 group-aria-disabled/task-group:pointer-events-none group-aria-disabled/task-group:select-none">
          <div className="grow">
            <h2 className="mb-2 font-display text-xl font-bold">{sectionTitle}</h2>
            <p className="m-0 text-sm text-white/70">{subSectionTitle}</p>
          </div>
          <ExpandMoreIcon className="self-center text-white/70 transition-transform group-open/task-group:rotate-180 group-aria-disabled/task-group:hidden" />
        </summary>
        <Collapse in={expanded} mountOnEnter unmountOnExit>
          <section className="divide-y">
            {tasks.map((task) => (
              <TaskAccordion
                key={task.id}
                expanded={expandedTasks.includes(task.id)}
                onTaskAccordionChange={onTaskAccordionChange}
                linksHeader={linksHeader}
                srTag={srTag}
                {...task}
              />
            ))}
          </section>
        </Collapse>
      </details>
    </Paper>
  )
}
