import { useEffect } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../components/Layout'

import { AppWindow } from '../lib/types'
import { getNextSEOConfig } from '../next-seo.config'
import '../styles/globals.css'
import { createCounter } from '../utils/metrics'

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

// help to prevent double firing of adobe analytics pageLoad event
let appPreviousLocationPathname = ''

const requestCounter = createCounter('senior-journey.requests.count')

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const config = getConfig()
  const adobeAnalyticsScriptSrc =
    config?.publicRuntimeConfig?.adobeAnalyticsScriptSrc
  const appBaseUri = config?.publicRuntimeConfig?.appBaseUri
  const nextSEOConfig = getNextSEOConfig(appBaseUri, router)

  // XXX :: GjB :: this is just a sample metric!
  requestCounter.add(1)

  // Web Analytics - taken from Google Analytics example
  // @see https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
  useEffect(() => {
    const handleRouteChange = () => {
      // only push event if pathname is different
      if (window.location.pathname !== appPreviousLocationPathname) {
        ;(window as AppWindow).adobeDataLayer?.push?.({ event: 'pageLoad' })
        appPreviousLocationPathname = window.location.pathname
      }
    }

    handleRouteChange()
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      {adobeAnalyticsScriptSrc && (
        <>
          <Script src="https://code.jquery.com/jquery-3.6.3.min.js" />
          <Script src={adobeAnalyticsScriptSrc} />
        </>
      )}

      <DefaultSeo {...nextSEOConfig} />
      <QueryClientProvider client={queryClient}>
      {router.pathname === '/' ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
