import { useEffect } from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ValueType } from '@opentelemetry/api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { AppProps, NextWebVitalsMetric } from 'next/app'
import Head from 'next/head'

import nextI18NextConfig from '../../next-i18next.config'
import createEmotionCache from '../createEmotionCache'
import { usePublicRuntimeConfig } from '../lib/hooks/usePublicRuntimeConfig'
import type { AppWindow } from '../lib/types'
import { getLogger } from '../logging/log-util'
import { getNextSEOConfig } from '../next-seo.config'
import '../styles/globals.css'
import theme from '../theme'
import { lato, notoSans } from '../utils/fonts'
import { createCounter, createHistogram } from '../utils/metrics'

const logger = getLogger('_app')

// Create a react-query client
const queryClient = new QueryClient()

// help to prevent double firing of adobe analytics pageLoad event
let appPreviousLocationPathname = ''

const requestCounter = createCounter('senior-journey.requests.count')

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps, router }: MyAppProps) => {
  const publicRuntimeConfig = usePublicRuntimeConfig()
  const nextSEOConfig = getNextSEOConfig(publicRuntimeConfig.NEXT_PUBLIC_APP_BASE_URI, router)

  // XXX :: GjB :: this is just a sample metric!
  requestCounter.add(1)

  // Web Analytics - taken from Google Analytics example
  // @see https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
  useEffect(() => {
    const handleRouteChange = () => {
      // only push event if pathname is different

      if (appPreviousLocationPathname !== window.location.pathname) {
        appPreviousLocationPathname = window.location.pathname

        /**
         * The analytics beacon execution is scheduled to initiate a one-time callback after a configurable
         * delay in milliseconds. This ensures that the rendering process of i18next is completed before
         * capturing metrics, preventing them from containing previous page content.
         */
        setTimeout(() => {
          logger.debug(
            {
              appPreviousLocationPathname,
              beaconDelay: publicRuntimeConfig.NEXT_PUBLIC_ANALYTICS_BEACON_DELAY,
              documentTitle: document.title,
              windowLocationPathname: window.location.pathname,
            },
            'Analytics beacon execution',
          )
          ;(window as AppWindow).adobeDataLayer?.push?.({ event: 'pageLoad' })
        }, publicRuntimeConfig.NEXT_PUBLIC_ANALYTICS_BEACON_DELAY)
      }
    }

    handleRouteChange()

    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [publicRuntimeConfig.NEXT_PUBLIC_ANALYTICS_BEACON_DELAY, router.events])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>{`
        :root {
          --lato-font: ${lato.style.fontFamily};
          --noto-sans-font: ${notoSans.style.fontFamily};
        }
      `}</style>
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
  const webVitalHistogram = createHistogram(`senior-journey.${metric.label}.${metric.name}`)
  const attributes = {
    id: metric.id,
    startTime: metric.startTime,
    value: metric.value,
    description: metric.name,
    unit: 'ms',
    valueType: ValueType.INT,
  }
  webVitalHistogram.record(metric.value, attributes)
}

export default appWithTranslation(MyApp, nextI18NextConfig)
