import { Link } from '@remix-run/react'
import type { RemixLinkProps } from '@remix-run/react/dist/components'

import { useLocale } from '~/routes/$locale'

export interface AppLinkProps extends Omit<RemixLinkProps, 'to'> {
  locale?: 'en' | 'fr'
  to: string
}

export default function AppLink({ locale, ...args }: AppLinkProps) {
  const matchedLocale = useLocale()
  const resolvedLocale = locale ?? matchedLocale

  if (resolvedLocale === undefined) throw new Error('Locale is undefined')

  const to = resolvedLocale ? `/${resolvedLocale}${args.to}` : args.to

  return (
    <Link {...args} to={to}>
      {args.children}
    </Link>
  )
}
