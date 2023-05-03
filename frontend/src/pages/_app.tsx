import { useEffect } from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { AppProps, NextWebVitalsMetric } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'

import createEmotionCache from '../createEmotionCache'
import { AppWindow } from '../lib/types'
import { getNextSEOConfig } from '../next-seo.config'
import '../styles/globals.css'
import '../styles/latofonts.css'
import theme from '../theme'
import { createCounter, createHistogram } from '../utils/metrics'
import { ValueType } from '@opentelemetry/api'

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

// help to prevent double firing of adobe analytics pageLoad event
let appPreviousLocationPathname = ''

const requestCounter = createCounter('senior-journey.requests.count')

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  router,
}: MyAppProps) => {
  const config = getConfig()
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
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultSeo {...nextSEOConfig} />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const webVitalHistogram = createHistogram('senior-journey.' + metric.label + '.' + metric.name)
  const attributes = {id: metric.id, startTime: metric.startTime, value: metric.value, description: metric.name, unit: 'ms', valueType: ValueType.INT}
  webVitalHistogram.record(metric.value, attributes)
}


export default appWithTranslation(MyApp)
