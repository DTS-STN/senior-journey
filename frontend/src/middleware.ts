import { NextRequest, NextResponse } from 'next/server'

import { getLogger } from './logging/log-util'

export function middleware(req: NextRequest) {
  const { nextUrl, url } = req
  const { locale, pathname } = nextUrl
  const logger = getLogger('middleware')

  if (pathname === '/' && locale !== 'default') {
    logger.debug(`Request for /${locale}/ will be redirected to /${locale}/home`)
    return NextResponse.redirect(new URL(`/${locale}/home`, url))
  }

  return NextResponse.next()
}
