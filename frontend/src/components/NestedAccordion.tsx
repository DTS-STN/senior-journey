import React from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox } from '@mui/material'

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
    <Accordion className="mb-4"
    sx={{
      "@media print": {
        ".MuiCollapse-root": {
          height: "auto !important",
          visibility: "visible !important"
        }
      },
      ".MuiAccordion-root.Mui-expanded":{
        margin: "0"
      }
    }}>
      <AccordionSummary
        className="bg-[#00363C] text-white"
        disabled={tasks.length === 0}
        expandIcon={<ExpandMoreIcon className="text-white" />}
      >
        <div>
          <div className="mb-2 font-display font-bold text-xl pt-8">{sectionTitle}</div>
          <div className="text-sm opacity-70">{subSectionTitle}</div>
        </div>
      </AccordionSummary>
      {tasks.map((task) => (
        <Accordion key={task.id}
          sx={{
            boxShadow: '0',
            ".MuiAccordionSummary-root.Mui-expanded": {
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }
          }}
        >
          <AccordionSummary className="font-display font-medium py-2 text-lg" expandIcon={<ExpandMoreIcon />}>
          <Checkbox className="-mt-2.5 hidden print:inline"/>
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
