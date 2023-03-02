import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useMatches } from '@remix-run/react'

import { LocaleSwitcher } from '~/components'

export async function loader({ params }: LoaderArgs) {
  if (params.locale === undefined || !['en', 'fr'].includes(params.locale)) {
    throw new Response('Not found', { status: 404, statusText: 'Not found' })
  }

  return json({ locale: params.locale })
}

export function useLocale() {
  return useMatches().find((match) => match.id === 'routes/$locale')?.params
    .locale
}

export default function Index() {
  return (
    <>
      <LocaleSwitcher />
      <Outlet />
    </>
  )
}
