import { NextRequest, NextResponse } from 'next/server'

import { getLogger } from './logging/log-util'

/**
 * Checks whether a given pathname is excluded based on a list of excluded paths.
 *
 * @param {string} pathname - The pathname to check.
 * @returns {boolean} - true if the pathname is excluded, false otherwise.
 */
function isExcluded(pathname: string) {
  const excludedPaths = ['/_next/', '/api/', '/assets/', '/robots.txt']
  return excludedPaths.some((excludedPath) => pathname.includes(excludedPath))
}

function isRootAssetForward(pathname: string) {
  const forwardedPaths = [
    '/apple-touch-icon-120x120-precomposed.png',
    '/apple-touch-icon-120x120.png',
    '/apple-touch-icon-152x152-precomposed.png',
    '/apple-touch-icon-152x152.png',
    '/apple-touch-icon-precomposed.png',
    '/apple-touch-icon.png',
    '/favicon.ico'
  ]
  
  return forwardedPaths.some((forwardedPath) => pathname.includes(forwardedPath))
}

/**
 * Middleware function that processes incoming requests and returns the appropriate response.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} - The appropriate response for the incoming request.
 */
export function middleware(req: NextRequest) {
  const { nextUrl, url } = req
  const { locale, pathname } = nextUrl
  const logger = getLogger('middleware')

  logger.trace(`Incoming request for [${pathname}]`)

  if (isExcluded(pathname)) {
    logger.trace(`Request for excluded path [${pathname}] is not a candidate for processing`)
    return NextResponse.next()
  }

  logger.trace(`Processing request for [${pathname}]`)

  if (isRootAssetForward(pathname)) {
    if (RegExp('/apple-touch-icon(.*).png').test(pathname)) {
      return NextResponse.rewrite(new URL('/assets/favicon-mobile.png', req.url))
    }
    return NextResponse.rewrite(new URL('/assets' + pathname, req.url))
  }

  if (locale === 'default' && pathname !== '/') {
    logger.trace(`Requested path [${pathname}] does not include required locale of [en|fr]`)

    req.nextUrl.pathname = '/404'
    return NextResponse.rewrite(req.nextUrl, { status: 404 })
  }

  if ((locale === 'en' || locale === 'fr') && pathname === '/') {
    logger.debug(`Requested path /${locale}/ will be redirected to /${locale}/home`)
    return NextResponse.redirect(new URL(`/${locale}/home`, url))
  }

  logger.trace(`Processing completed for request [${pathname}]`)
  return NextResponse.next()
}
