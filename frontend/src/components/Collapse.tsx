import { FC, useId } from 'react'

export interface CollapseProps {
  title: string
  children?: React.ReactNode
}

const Collapse: FC<CollapseProps> = ({ title, children }) => {
  const id = useId()
  return (
    <details
      aria-describedby={`${id}-details-summary`}
      className="rounded border p-3"
    >
      <summary
        id={`${id}-details-summary`}
        className="cursor-pointer text-blue-light hover:text-link-selected hover:underline focus:text-link-selected focus:underline"
      >
        {title}
      </summary>
      {children}
    </details>
  )
}

export default Collapse
