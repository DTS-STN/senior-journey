import fetchMock from 'jest-fetch-mock'
import { NextRequest, NextResponse } from 'next/server'

import { middleware } from '../src/middleware'

describe('middleware', () => {
  const nextConfig = {
    i18n: { defaultLocale: 'default', locales: ['default', 'en', 'fr'] }
  }

  const mockedStaticNext = jest.fn()
  const mockedStaticRedirect = jest.fn()

  NextResponse.next = mockedStaticNext
  NextResponse.redirect = mockedStaticRedirect

  beforeEach(() => {
    fetchMock.doMock()
    fetchMock.resetMocks()

    mockedStaticNext.mockClear()
    mockedStaticRedirect.mockClear()
  })

  it.each(['/_next/_buildManifest.js', '/api/livez', '/assets/favicon.ico'])('correctly detects non-page requests: %s', (pathname) => {
    const request = new NextRequest(new URL(`https://example.com${pathname}`), { nextConfig })

    middleware(request)

    expect(mockedStaticNext).toBeCalled()
    expect(mockedStaticRedirect).not.toBeCalled()
  })

  it('correctly detects root route requests: /', () => {
    const request = new NextRequest(new URL('https://example.com/'), { nextConfig })

    middleware(request)

    expect(mockedStaticNext).toBeCalled()
    expect(mockedStaticRedirect).not.toBeCalled()
  })

  it.each(['en', 'fr'])('correctly detects root locale route requests: / → /%s/home', (locale) => {
    const request = new NextRequest(new URL('https://example.com/'), { nextConfig })
    request.nextUrl.locale = locale

    middleware(request)

    expect(mockedStaticNext).not.toBeCalled()
    expect(mockedStaticRedirect).toBeCalledWith(new URL(`/${locale}/home`, 'https://example.com/'))
  })

  it('correctly detects non-root locale requests: /* → /en/*', () => {
    const request = new NextRequest(new URL('https://example.com/test'), { nextConfig })
    request.nextUrl.locale = 'default'

    middleware(request)

    expect(mockedStaticNext).not.toBeCalled()
    expect(mockedStaticRedirect).toBeCalledWith(new URL(`/en/test`, 'https://example.com/'))
  })

  it.each(['en', 'fr'])('correctly detects non-root locale requests: /%s/*', (locale) => {
    const request = new NextRequest(new URL(`https://example.com/${locale}/test`), { nextConfig })
    request.nextUrl.locale = locale

    middleware(request)

    expect(mockedStaticNext).toBeCalled()
    expect(mockedStaticRedirect).not.toBeCalled()
  })
})
