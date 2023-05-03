import React from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

import { TaskDto } from '../lib/types'
import TaskCard from './TaskCard'

interface NestedAccordionProps {
  linksHeader: string
  sectionTitle: string
  subSectionTitle: string
  tasks: ReadonlyArray<TaskDto>
}

const NestedAccordion: React.FC<NestedAccordionProps> = ({
  linksHeader,
  sectionTitle,
  subSectionTitle,
  tasks = [],
}) => {
  return (
    <Accordion className="mb-4">
      <AccordionSummary
        className="bg-[#00363C] text-white"
        disabled={tasks.length === 0}
        expandIcon={<ExpandMoreIcon className="text-white" />}
      >
        <div>
          <div className="mb-2 font-display font-bold">{sectionTitle}</div>
          <div className="text-xs">{subSectionTitle}</div>
        </div>
      </AccordionSummary>
      {tasks.map((task) => (
        <Accordion key={task.id}>
          <AccordionSummary className="font-display font-bold" expandIcon={<ExpandMoreIcon />}>
            {task.title}
          </AccordionSummary>
          <AccordionDetails>
            <TaskCard linksHeader={linksHeader} showCheckbox={false} task={task} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Accordion>
  )
}

export default NestedAccordion
