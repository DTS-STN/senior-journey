/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'

import createEmotionServer from '@emotion/server/create-instance'
import { AppType } from 'next/app'
import Document, { DocumentContext, DocumentProps, Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

import createEmotionCache from '../createEmotionCache'
import { getLogger } from '../logging/log-util'
import { generateRandomNonce } from '../utils/content-security-policy'
import { MyAppProps } from './_app'

const log = getLogger('_document.tsx')

const adobeAnalyticsConfigured = process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC !== undefined
const devmodeEnabled = process.env.NODE_ENV !== 'production'

// see https://experienceleague.adobe.com/docs/id-service/using/reference/csp.html
const defaultAdobeAnalyticsDomains = [
  '*.demdex.net',
  'assets.adobedtm.com',
  'canada.sc.omtrdc.net',
  'cm.everesttech.net',
  'code.jquery.com',
]

/**
 * A function that returns a string of Adobe Analytics domains.
 *
 * The function checks if the environment variable ADOBE_ANALYTICS_CSP_DOMAINS exists and if it does, it parses it as a
 * JSON string and returns a string of Adobe Analytics domains. If it doesn’t exist, it returns the default Adobe
 * Analytics domains.
 *
 * @returns {string} A string of Adobe Analytics domains.
 */
function getAdobeAnalyticsDomains() {
  const adobeAnalyticsDomains = process.env.ADOBE_ANALYTICS_CSP_DOMAINS
    ? JSON.parse(process.env.ADOBE_ANALYTICS_CSP_DOMAINS)
    : defaultAdobeAnalyticsDomains
  return adobeAnalyticsDomains.join(' ')
}

/**
 * Generates a Content Security Policy (CSP) string.
 *
 * @param {string} nonce - A unique string used to restrict the execution of scripts.
 * @returns {string} - A string representing the CSP header.
 *
 * @see https://csp-evaluator.withgoogle.com/ - For checking CSP headers.
 * @see https://experienceleague.adobe.com/docs/experience-platform/tags/client-side/content-security-policy.html - For Adobe Analytics.
 */
function generateCsp(nonce: string): string {
  const contentSecurityPolicy = {
    'default-src': ["'none'"],
    'base-uri': ["'self'"],
    'connect-src': ["'self'"],
    'img-src': ["'self'"],
    'font-src': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'self'"],
    'frame-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'"],
  }

  // required by Next.js Image with placeholder="blur"
  contentSecurityPolicy['img-src']?.push('data:')

  // required by MUI; TODO: figure out how to tighten this up
  // see: https://mui.com/material-ui/guides/content-security-policy/
  contentSecurityPolicy['style-src']?.push("'unsafe-eval'", "'unsafe-inline'")

  // required by google fonts
  contentSecurityPolicy['font-src']?.push('fonts.gstatic.com')
  contentSecurityPolicy['style-src']?.push('fonts.googleapis.com')

  if (devmodeEnabled) {
    log.debug('Devmode detected, adding unsafe-eval Content-Security-Policy directives to enable live reloading')
    contentSecurityPolicy['script-src']?.push("'unsafe-eval'")
  }

  if (adobeAnalyticsConfigured) {
    log.debug('Adobe Analytics configuration detected, adding necessary Content-Security-Policy directives')

    const adobeAnalyticsDomains = getAdobeAnalyticsDomains()

    contentSecurityPolicy['connect-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['frame-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['img-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['script-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['script-src']?.push("'unsafe-inline'") // 😠💩😠 required by AA 😠💩😠
    contentSecurityPolicy['style-src']?.push(adobeAnalyticsDomains)
  }

  if (!adobeAnalyticsConfigured) {
    log.debug(
      `Adobe Analytics configuration not detected, adding 'nonce-${nonce}' directives to Content-Security-Policy`
    )
    contentSecurityPolicy['script-src']?.push(`'nonce-${nonce}'`)
  }

  // transform the contentSecurityPolicy object into a correctly-formatted string
  return Object.entries(contentSecurityPolicy)
    .map(([key, value]) => `${key} ${value.join(' ')}`)
    .join('; ')
}

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: React.JSX.Element[]
  nonce: string
}

export default function MyDocument({ emotionStyleTags, locale, nonce }: MyDocumentProps) {
  const lang = (locale?.toLowerCase() ?? 'default') === 'default' ? 'en' : locale

  return (
    <Html lang={lang}>
      <Head nonce={nonce}>
        <meta charSet="utf-8" />
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap&family=Patua+One:wght@100;400;700&display=swap"
        />
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
        {adobeAnalyticsConfigured && (
          <Script strategy="beforeInteractive" src="https://code.jquery.com/jquery-3.6.3.min.js" />
        )}
        {adobeAnalyticsConfigured && (
          <Script strategy="beforeInteractive" src={process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC} />
        )}
      </body>
    </Html>
  )
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  const nonce = generateRandomNonce()
  ctx.res?.setHeader('Content-Security-Policy', generateCsp(nonce))

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)

  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    // eslint-disable-next-line react/no-danger
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
      nonce={nonce}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
    nonce,
  }
}
