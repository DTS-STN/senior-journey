import React, { useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, IconButton } from '@mui/material'

import AccessibilityTable, { TableData } from './AccessibilityTable'

export interface AccessibilityGraphContainerProps {
  tableData: TableData
  description: string
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
        <IconButton onClick={handleClick} aria-label={buttonLabel}>
          {open ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
        <span>{buttonLabel}</span>
      </div>
      <Collapse in={open}>
        <h3 className="font-bold">{descriptionHeading}</h3>
        <p>{description}</p>
        <h3 className="font-bold">{valuesHeading}</h3>
        <AccessibilityTable tableData={tableData} />
      </Collapse>
    </div>
  )
}

export default AccessibilityGraphContainer
