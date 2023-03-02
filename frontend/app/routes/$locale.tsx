import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useMatches } from '@remix-run/react'
import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { LocaleSwitcher } from '~/components'

export const handle = {
  i18n: ['common']
}

export async function loader({ params }: LoaderArgs) {
  if (params.locale === undefined || !['en', 'fr'].includes(params.locale)) {
    throw new Response('Not found', { status: 404, statusText: 'Not found' })
  }

  return json({ locale: params.locale })
}

export function useChangeLanguage(locale: string) {
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale, i18n])
}

export function useLocale() {
  return useMatches().find((match) => match.id === 'routes/$locale')?.params.locale
}

export default function Index() {
  const locale = useLocale() || 'en';
  useChangeLanguage(locale)

  return (
    <>
      <LocaleSwitcher />
      <Outlet />
    </>
  )
}
