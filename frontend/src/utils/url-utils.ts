import { resolveHref as nextResolveHref } from 'next/dist/shared/lib/router/utils/resolve-href'
import Router from 'next/router'
import type { UrlObject } from 'url'

/**
 * Intellectual Property of Youth Digital Gateway (YDG)'s Engineer
 * @param url UrlObject or string
 * @returns next.js resolved href string
 */
export const resolveHref = (url: UrlObject | string): string => {
  return nextResolveHref(Router, url)
}
