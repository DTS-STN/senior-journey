import { FC, PropsWithChildren } from 'react'
import { Visibility as VisibilityIcon, Star as StarIcon, Error as ErrorIcon } from '@mui/icons-material';

export type AlertType = 'tip' | 'disclaimer' | 'important'

export interface AlertCardProps extends PropsWithChildren {
  type?: AlertType,
}

const iconBgColors = {
  tip: 'bg-[#96DE3B]',
  disclaimer: 'bg-[#DE743B]',
  important: 'bg-[#3B4CDE]'
}

const textBgColors = {
  tip: 'bg-[#D7FED6]',
  disclaimer: 'bg-[#FEE4D6]',
  important: 'bg-[#D6F2FE]'
}

const iconClasses = {
  tip: StarIcon,
  disclaimer: ErrorIcon,
  important: VisibilityIcon
}

const AlertCard: FC<AlertCardProps> = ({
    type,
    children
}) => {
  const iconBgColor = iconBgColors[type ?? 'tip']
  const textBgColor = textBgColors[type ?? 'tip']
  const IconClass = iconClasses[type ?? 'tip']

  return (
    <div className="rounded-lg overflow-hidden relative">
        <div className="grid lg:grid-cols-12 sm:grid-cols-1">
          <div className={`${iconBgColor} lg:col-span-1 p-4 z-10 relative lg:flex sm:ps-4 lg:items-center lg:justify-left`}>
              <div className="mx-auto">
                  <IconClass className="text-white transform scale-125" />
              </div>
          </div>
          <div className={`${textBgColor} lg:col-span-11 p-5`}>{children}</div>
        </div>
    </div>
  )
}

export default AlertCard