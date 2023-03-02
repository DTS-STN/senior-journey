import { FC, MouseEventHandler } from 'react'

export type ActionButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export type ActionButtonStyle = 'default' | 'primary'

export interface ActionButtonProps {
  disabled?: boolean
  fullWidth?: boolean
  id?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: ActionButtonSize
  style?: ActionButtonStyle
  text: string
  type?: 'button' | 'submit' | 'reset'
}

const sizes = {
  xs: 'px-1.5 py-px rounded-sm text-sm',
  sm: 'px-2.5 py-1.5 rounded-sm text-sm',
  md: 'px-3.5 py-2.5 rounded text-base',
  lg: 'px-4 py-2.5 rounded-md text-lg',
}

const styles = {
  default:
    'border-gray-dark bg-gray-normal text-blue-light hover:bg-gray-dark hover:border-l-gray-deep hover:border-t-grasy-deep focus:bg-gray-dark focus:text-blue-light border-r-gray-500 border-b-gray-500',
  primary:
    'border-blue-dark bg-blue-dark text-basic-white hover:bg-blue-normal active:bg-blue-active focus:bg-blue-normal focus:text-basic-white',
}

const ActionButton: FC<ActionButtonProps> = ({
  disabled,
  fullWidth,
  id,
  onClick,
  size,
  style,
  text,
  type,
}) => {
  const baseClasses =
    'align-middle border font-display inline-flex items-center justify-center shadow-sm disabled:cursor-not-allowed disabled:opacity-70 disabled:pointer-events-none disabled:shadow-none focus:ring-1 focus:ring-black focus:ring-offset-2'
  const fullWidthClasses = fullWidth ? 'w-full' : undefined
  const sizeClasses = sizes[size ?? 'md']
  const styleClasses = styles[style ?? 'default']

  return (
    <button
      id={id}
      className={`${baseClasses} ${fullWidthClasses} ${sizeClasses} ${styleClasses}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

ActionButton.defaultProps = {
  type: 'button',
  style: 'default',
}

export default ActionButton
