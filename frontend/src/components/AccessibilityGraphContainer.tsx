import React, { useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, IconButton } from '@mui/material'

import AccessibilityTable, { TableData } from './AccessibilityTable'

export interface AccessibilityGraphContainerProps {
  tableData: TableData
  description:  React.ReactNode
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
    <div className="border-t border-t-primary-500 border-b border-b-primary-500 mb-5">
      <div>
        <IconButton onClick={handleClick} aria-label={buttonLabel} className='text-primary-500'>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <span>{buttonLabel}</span>
      </div>
      <Collapse in={open}>
        <div className='py-6'>
        <h3 className="font-bold pb-4">{descriptionHeading}</h3>
        <p>{description}</p>
        <h3 className="font-bold pb-4">{valuesHeading}</h3>
        <AccessibilityTable tableData={tableData} />
        </div>
      </Collapse>
    </div>
  )
}

export default AccessibilityGraphContainer
