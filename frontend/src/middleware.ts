import { NextRequest, NextResponse } from 'next/server'

import { getLogger } from './logging/log-util'

function isPageRequest(pathname: string) {
  if (pathname.includes('/_next/')) return false
  if (pathname.includes('/api/')) return false
  if (pathname.includes('/assets/')) return false

  return true
}

export function middleware(req: NextRequest) {
  const { nextUrl, url } = req
  const { locale, pathname } = nextUrl
  const logger = getLogger('middleware')

  if (!isPageRequest(pathname)) {
    logger.trace(`Request for static resource ${pathname} is not a candidate for processing`)
    return NextResponse.next()
  }

  if (pathname === '/' && (locale === 'default')) {
    logger.debug(`Request for language chooser is not a candidate for processing`)
    return NextResponse.next()
  }

  if (pathname === '/' && (locale === 'en' || locale === 'fr')) {
    logger.debug(`Request for /${locale}/ will be redirected to /${locale}/home`)
    return NextResponse.redirect(new URL(`/${locale}/home`, url))
  }

  if (locale === 'default') {
    logger.debug(`Request for ${pathname} will be redirected to /en${pathname}`)
    return NextResponse.redirect(new URL(`/en${pathname}`, url))
  }

  logger.trace(`Request ${pathname} is not a candidate for processing`)
  return NextResponse.next()
}
