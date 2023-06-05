import { FC, PropsWithChildren } from 'react'

import { Error as ErrorIcon, Star as StarIcon, Visibility as VisibilityIcon } from '@mui/icons-material'

export type AlertType = 'tip' | 'disclaimer' | 'important'

export interface AlertCardProps extends PropsWithChildren {
  className?: string
  type?: AlertType
}

const iconBgColors = {
  tip: 'bg-[#96DE3B]',
  disclaimer: 'bg-[#DE743B]',
  important: 'bg-[#3B4CDE]',
}

const textBgColors = {
  tip: 'bg-[#D7FED6]',
  disclaimer: 'bg-[#FEE4D6]',
  important: 'bg-[#D6F2FE]',
}

const icons = {
  tip: StarIcon,
  disclaimer: ErrorIcon,
  important: VisibilityIcon,
}

const AlertCard: FC<AlertCardProps> = ({ className, type, children }) => {
  const iconBgColor = iconBgColors[type ?? 'tip']
  const textBgColor = textBgColors[type ?? 'tip']
  const Icon = icons[type ?? 'tip']

  return (
    <div className={`overflow-hidden rounded-lg ${className ?? ''}`}>
      <div className="flex flex-col md:flex-row">
        <div className={`${iconBgColor} p-4 text-white md:flex md:flex-col md:justify-center`}>
          <Icon fontSize="large" />
        </div>
        <div className={`${textBgColor} p-6`}>{children}</div>
      </div>
    </div>
  )
}

export default AlertCard
