import { FC } from 'react'

import Link from 'next/link'

export type LinkButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export type LinkButtonStyle = 'default' | 'primary'

export interface LinkButtonProps {
  external?: boolean
  fullWidth?: boolean
  href: string
  id?: string
  lang?: string
  size?: LinkButtonSize
  style?: LinkButtonStyle
  text: string
}

const sizes = {
  xs: 'px-1.5 py-px rounded-sm text-sm',
  sm: 'px-2.5 py-1.5 rounded-sm text-sm',
  md: 'px-3.5 py-2.5 rounded text-base',
  lg: 'px-4 py-2.5 rounded-md text-lg',
}

const styles = {
  default: `bg-gray-normal border-b-gray-500 border-gray-dark border-r-gray-500 text-blue-light focus:bg-gray-dark focus:text-blue-light hover:bg-gray-dark hover:border-l-gray-deep hover:border-t-grasy-deep hover:text-blue-light visited:text-blue-light`,
  primary: `bg-blue-dark border-blue-dark text-basic-white active:bg-blue-active focus:bg-blue-normal focus:text-basic-white hover:bg-blue-normal hover:text-basic-white visited:text-basic-white`,
}

const LinkButton: FC<LinkButtonProps> = ({
  external,
  fullWidth,
  href,
  id,
  lang,
  size,
  style,
  text,
}) => {
  const baseClasses =
    'align-middle border font-display inline-flex items-center justify-center no-underline elevation-2 text-center active:elevation-8 focus:ring-1 focus:ring-black focus:ring-offset-2'
  const fullWidthClasses = fullWidth ? 'w-full' : undefined
  const sizeClasses = sizes[size ?? 'md']
  const styleClasses = styles[style ?? 'default']

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      id={id}
      lang={lang}
      className={`${baseClasses} ${fullWidthClasses} ${sizeClasses} ${styleClasses}`}
    >
      {text}
    </Link>
  )
}

export default LinkButton
