import React from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox } from '@mui/material'

import { TaskDto } from '../lib/types'
import TaskCard from './TaskCard'

interface NestedAccordionProps {
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

const NestedAccordion: React.FC<NestedAccordionProps> = ({
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
  return (
    <Accordion
      className="mb-4"
      disableGutters
      expanded={expanded}
      onChange={(_, exp) => {
        onTaskGroupAccordionChange(id, exp)
      }}
      sx={{
        '@media print': {
          '.MuiCollapse-root': {
            height: 'auto !important',
            visibility: 'visible !important',
          },
        },
        '.MuiAccordionSummary-root:focus': {
          backgroundColor: '#00363C',
        },
      }}
    >
      <AccordionSummary
        className="bg-[#00363C] text-white"
        disabled={tasks.length === 0}
        expandIcon={<ExpandMoreIcon className="text-white" />}
      >
        <div>
          <div className="mb-2 font-display text-xl font-bold">{sectionTitle}</div>
          <div className="text-sm opacity-70">{subSectionTitle}</div>
        </div>
      </AccordionSummary>
      {tasks.map((task) => (
        <Accordion
          key={task.id}
          disableGutters
          className="sm:ml-4"
          expanded={expandedTasks.includes(task.id)}
          onChange={(_, expanded) => {
            onTaskAccordionChange(task.id, expanded)
          }}
          sx={{
            'boxShadow': '0',
            '.MuiAccordionSummary-root:focus': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <AccordionSummary
            className="py-2 font-display text-lg font-medium sm:pl-0"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <Checkbox className="-mt-2.5 hidden print:inline" />
            {task.title}
          </AccordionSummary>
          <AccordionDetails className="py-4 sm:pl-14">
            <TaskCard linksHeader={linksHeader} showCheckbox={false} srTag={srTag} task={task} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Accordion>
  )
}

export default NestedAccordion
