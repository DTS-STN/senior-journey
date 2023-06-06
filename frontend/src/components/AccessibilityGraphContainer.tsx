import React, { useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, IconButton } from '@mui/material'

import AccessibilityTable, { TableData } from './AccessibilityTable'

export interface AccessibilityGraphContainerProps {
  tableData: TableData
  description: React.ReactNode
  descriptionHeading: string
  valuesHeading: string
  buttonLabel: string
}

const AccessibilityGraphContainer: React.FC<AccessibilityGraphContainerProps> = ({
  description,
  tableData,
  descriptionHeading,
  valuesHeading,
  buttonLabel,
}) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="my-8 border-b border-t border-b-primary-500 border-t-primary-500">
      <div>
        <IconButton onClick={handleClick} aria-label={buttonLabel} className="text-primary-500">
          {open ? <ExpandLess /> : <ExpandMore />}
        <span className='text-base font-body text-black'>{buttonLabel}</span>
        </IconButton>
      </div>
      <Collapse in={open}>
        <div className="py-6">
          <h3 className="pb-4 font-bold">{descriptionHeading}</h3>
          <p>{description}</p>
          <h3 className="pb-4 font-bold">{valuesHeading}</h3>
          <AccessibilityTable tableData={tableData} />
        </div>
      </Collapse>
    </div>
  )
}

export default AccessibilityGraphContainer
