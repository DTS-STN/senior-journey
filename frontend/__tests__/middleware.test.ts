import { NextRequest, NextResponse } from 'next/server'

import { middleware } from '../src/middleware'

jest.mock('next/server', () => {
  return {
    NextRequest: jest.fn().mockImplementation((url: URL) => {
      return {
        nextUrl: { pathname: url.pathname, locale: 'default' },
        url: url,
      }
    }),
    NextResponse: jest.fn().mockImplementation((init: BodyInit | null) => {
      return { init }
    }),
  }
})

describe('middleware', () => {
  const mockedStaticNext = jest.fn()
  const mockedStaticRedirect = jest.fn()

  beforeEach(() => {
    mockedStaticNext.mockClear()
    mockedStaticRedirect.mockClear()
    // assign the mock jest.fn() to static method
    NextResponse.next = mockedStaticNext
    NextResponse.redirect = mockedStaticRedirect
  })
  ;['/_next/test', '/api/test', '/assets/favicon.ico'].forEach((pathname) => {
    it('correctly detects non-page requests', () => {
      const url = new URL(`https://example.com${pathname}`)
      const request = new NextRequest(url)

      middleware(request)

      expect(mockedStaticNext).toBeCalled()
      expect(mockedStaticRedirect).not.toBeCalled()
    })
  })

  it('correctly detects root route requests', () => {
    const url = new URL('https://example.com/')
    const request = new NextRequest(url)

    middleware(request)

    expect(mockedStaticNext).toBeCalled()
    expect(mockedStaticRedirect).not.toBeCalled()
  })
  ;['en', 'fr'].forEach((locale) => {
    it(`correctly detects root locale route requests - locale: ${locale}`, () => {
      const url = new URL('https://example.com/')
      const request = new NextRequest(url)
      request.nextUrl.locale = locale

      middleware(request)

      expect(mockedStaticNext).not.toBeCalled()
      expect(mockedStaticRedirect).toBeCalledWith(
        new URL(`/${locale}/home`, 'https://example.com/')
      )
    })
  })

  it('correctly detects non-root router default locale requests - locale: default', () => {
    const url = new URL('https://example.com/test')
    const request = new NextRequest(url)

    middleware(request)

    expect(mockedStaticNext).not.toBeCalled()
    expect(mockedStaticRedirect).toBeCalledWith(
      new URL(`/en/test`, 'https://example.com/')
    )
  })
  ;['en', 'fr'].forEach((locale) => {
    it(`correctly detects non-root locale requests - locale: ${locale}`, () => {
      const url = new URL(`https://example.com/${locale}/test`)
      const request = new NextRequest(url)
      request.nextUrl.locale = locale

      middleware(request)

      expect(mockedStaticNext).toBeCalled()
      expect(mockedStaticRedirect).not.toBeCalled()
    })
  })
})
