import { FC, useCallback, useEffect, useRef } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Checkbox, Collapse } from '@mui/material'

import { TaskDto } from '../lib/types'
import TaskCard from './TaskCard'

export interface TaskAccordionProps extends TaskDto {
  expanded: boolean
  linksHeader: string
  onTaskAccordionChange: (id: number, expanded: boolean) => void
  srTag: string
}

export const TaskAccordion: FC<TaskAccordionProps> = (props) => {
  const { expanded, id, linksHeader, onTaskAccordionChange, srTag, title } = props
  const detailsRef = useRef<HTMLDetailsElement | null>(null)

  const handleOnDetailsToggle = useCallback(() => {
    onTaskAccordionChange(id, detailsRef.current?.open ?? false)
  }, [id, onTaskAccordionChange])

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
    <details ref={detailsRef} className="group/task divide-y transition-transform sm:ml-4" open={expanded}>
      <summary className=" flex cursor-pointer gap-2 px-4 py-5 font-display text-lg font-medium focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary-700 sm:pl-0">
        <Checkbox className="-mt-2.5 hidden print:inline" />
        <h3 className="grow">{title}</h3>
        <ExpandMoreIcon className="self-center text-black/50 transition-transform group-open/task:rotate-180" />
      </summary>
        <section className="p-4 sm:pl-14">
          <TaskCard linksHeader={linksHeader} showCheckbox={false} srTag={srTag} task={props} />
        </section>
    </details>
  )
}