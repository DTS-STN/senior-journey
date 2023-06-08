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
        <IconButton
          onClick={handleClick}
          aria-label={buttonLabel}
          className="w-full justify-start rounded-none text-primary-500"
        >
          {open ? <ExpandLess /> : <ExpandMore />}
          <span className="font-body text-base text-black/[0.87]">{buttonLabel}</span>
        </IconButton>
      </div>
      <Collapse in={open}>
        <div className="pb-8 pt-4">
          <h3 className="pb-4 font-bold">{descriptionHeading}</h3>
          <p>{description}</p>
          <h3 className="pb-4 pt-8 font-bold">{valuesHeading}</h3>
          <AccessibilityTable tableData={tableData} />
        </div>
      </Collapse>
    </div>
  )
}

export default AccessibilityGraphContainer
