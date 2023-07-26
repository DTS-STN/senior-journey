import { PropsWithChildren } from 'react'

export interface ContainerProps extends PropsWithChildren {
  className?: string
}

const Container = ({ children, className }: ContainerProps) => (
  <div className={`container mx-auto px-4 ${className ? className : ''}`}>{children}</div>
)

export default Container
