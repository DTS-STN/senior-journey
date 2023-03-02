import { FC, PropsWithChildren } from 'react'

import { useTranslation } from 'next-i18next'

export interface ExternalLinkProps extends PropsWithChildren {
  href: string
}

export const ExternalLink: FC<ExternalLinkProps> = ({ children, href }) => {
  const { t } = useTranslation(['common'])
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only">{t('opens-in-new-tab')}</span>
    </a>
  )
}

export default ExternalLink
