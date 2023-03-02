import { useLocation } from '@remix-run/react'

import { AppLink } from './AppLink'
import { useLocale } from '~/routes/$locale'

export function useLocaleSwitcherData() {
  const locale = useLocale()?.toLowerCase()
  const location = useLocation()
  if (locale === undefined) return { locale, ...location }
  let pathname = location.pathname.toLowerCase()
  if (pathname === `/${locale}`) {
    pathname = '/'
  } else if (pathname.startsWith(`/${locale}/`)) {
    pathname = pathname.substring(`/${locale}`.length)
  }
  return {
    locale,
    pathname,
    search: location.search,
  }
}

export const LocaleSwitcher = () => {
  const data = useLocaleSwitcherData()
  const locale = data.locale
  const linkStyle =
    'font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
  return (
    <>
      {(locale === undefined || locale === 'fr') && (
        <AppLink className={linkStyle} locale="en" to={{ ...data }}>
          English
        </AppLink>
      )}
      {(locale === undefined || locale === 'en') && (
        <AppLink className={linkStyle} locale="fr" to={{ ...data }}>
          Français
        </AppLink>
      )}
    </>
  )
}
