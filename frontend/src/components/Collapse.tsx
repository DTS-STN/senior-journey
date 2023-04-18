import { FC, useId } from 'react'

import { Paper } from '@mui/material'

export interface CollapseProps {
  title: string
  children?: React.ReactNode
}

const Collapse: FC<CollapseProps> = ({ title, children }) => {
  const id = useId()
  return (
    <Paper variant="outlined">
      <details aria-describedby={`${id}-details-summary`}>
        <summary
          id={`${id}-details-summary`}
          className="cursor-pointer p-3 text-blue-light hover:text-link-selected hover:underline focus:text-link-selected focus:underline"
        >
          {title}
        </summary>
        {children}
      </details>
    </Paper>
  )
}

export default Collapse
