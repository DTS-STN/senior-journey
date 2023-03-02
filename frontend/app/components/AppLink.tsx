import type { LinkProps } from '@remix-run/react'
import { Link, useHref } from '@remix-run/react'

import { useLocale } from '~/routes/$locale'

export interface AppLinkProps extends LinkProps {
  locale?: 'en' | 'fr'
}

export const AppLink = ({ locale, ...args }: AppLinkProps) => {
  const matchedLocale = useLocale()
  const resolvedLocale = locale ?? matchedLocale
  const href = useHref(args.to)
  const to = resolvedLocale ? `/${resolvedLocale}${href}` : href
  return (
    <Link {...args} to={to}>
      {args.children}
    </Link>
  )
}
