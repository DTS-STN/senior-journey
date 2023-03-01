import { Link } from '@remix-run/react'
import type { RemixLinkProps } from '@remix-run/react/dist/components'

import { useLocale } from '~/routes/$locale'

export default function AppLink({ children, ...args }: RemixLinkProps) {
  const locale = useLocale()

  if (locale === undefined) throw new Error('Locale is undefined')

  return (
    <Link {...args} to={`/${locale}${args.to}`}>
      {children}
    </Link>
  )
}
