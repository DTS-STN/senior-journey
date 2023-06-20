import { FC } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import AccessibilityTable, { TableData } from './AccessibilityTable'

export interface AccessibilityGraphContainerProps {
  tableData: TableData
  description: React.ReactNode
  descriptionHeading: string
  valuesHeading: string
  buttonLabel: string
  autoWidthColumns?: boolean
}

const AccessibilityGraphContainer: FC<AccessibilityGraphContainerProps> = ({
  description,
  tableData,
  descriptionHeading,
  valuesHeading,
  buttonLabel,
}) => {
  return (
    <details className="group my-8 border-y border-y-primary-500">
      <summary className="flex cursor-pointer items-center gap-2 p-2 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary-700">
        <ExpandMoreIcon color="primary" className="transition-transform group-open:rotate-180" />
        <div>{buttonLabel}</div>
      </summary>
      <section className="p-2">
        <h3 className="h6 my-4">{descriptionHeading}</h3>
        <p>{description}</p>
        <h3 className="h6 my-4">{valuesHeading}</h3>
        <AccessibilityTable tableData={tableData} />
      </section>
    </details>
  )
}

export default AccessibilityGraphContainer
