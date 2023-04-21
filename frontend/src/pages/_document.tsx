/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'

import createEmotionServer from '@emotion/server/create-instance'
import { AppType } from 'next/app'
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import Script from 'next/script'

import createEmotionCache from '../createEmotionCache'
import { getLogger } from '../logging/log-util'
import {
  generateRandomNonce,
  generateStrictContentSecurityPolicy,
} from '../utils/content-security-policy'
import { MyAppProps } from './_app'

const log = getLogger('_document.tsx')

const adobeAnalyticsConfigured =
  process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC !== undefined
const defaultAdobeAnalyticsDomains = [
  '*.demdex.net',
  'assets.adobedtm.com',
  'cm.everesttech.net',
  'code.jquery.com',
]
const defaultAdobeAnalyticsScriptHashes = [
  `'sha256-eUTan7s7Let/AtTx7e/BFrXBJ1hNp+oNNppAFt05OMc='`,
  `'sha256-ijXSZE47lIAA0cp6SwVwWQroK1Mbcv6gKq8PugakSdI='`,
  `'sha256-WR7dYY/Sv6nA60KEEdlxilApWnN1lTS8373DIVAL42U='`,
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
 * A function that returns a string of Adobe Analytics script hashes.
 *
 * The function checks if the environment variable ADOBE_ANALYTICS_CSP_SCRIPT_HASHES exists and if it does, it parses it
 * as a JSON string and returns a string of Adobe Analytics script hashes. If it doesn’t exist, it returns the default
 * Adobe Analytics script hashes.
 *
 * @returns {string} A string of Adobe Analytics script hashes.
 */
function getAdobeAnalyticsScriptHashes() {
  const adobeAnalyticsScriptHashes = process.env
    .ADOBE_ANALYTICS_CSP_SCRIPT_HASHES
    ? JSON.parse(process.env.ADOBE_ANALYTICS_CSP_SCRIPT_HASHES)
    : defaultAdobeAnalyticsScriptHashes
  return adobeAnalyticsScriptHashes.join(' ')
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
  const contentSecurityPolicy = generateStrictContentSecurityPolicy()

  // note these directives will be ignored by modern browsers that support nonce directives
  contentSecurityPolicy['script-src']?.push("'unsafe-eval'", "'unsafe-inline'")
  contentSecurityPolicy['style-src']?.push("'unsafe-eval'", "'unsafe-inline'")

  // required by google fonts
  contentSecurityPolicy['font-src']?.push('fonts.gstatic.com')
  contentSecurityPolicy['style-src']?.push('fonts.googleapis.com')

  if (adobeAnalyticsConfigured) {
    log.debug(
      'Adobe Analytics configuration detected, adding necessary Content-Security-Policy directives'
    )

    const adobeAnalyticsDomains = getAdobeAnalyticsDomains()
    const adobeAnalyticsSriptHashes = getAdobeAnalyticsScriptHashes()

    contentSecurityPolicy['connect-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['frame-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['img-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['script-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['style-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['script-src']?.push(adobeAnalyticsSriptHashes)
  }

  log.debug(`Adding 'nonce-${nonce}' directives to Content-Security-Policy`)
  contentSecurityPolicy['script-src']?.push(`'nonce-${nonce}'`)

  // transform the contentSecurityPolicy object into a correctly-formatted string
  return Object.entries(contentSecurityPolicy)
    .map(([key, value]) => `${key} ${value.join(' ')}`)
    .join('; ')
}

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
  nonce: string
}

export default function MyDocument({
  emotionStyleTags,
  locale,
  nonce,
}: MyDocumentProps) {
  const lang =
    (locale?.toLowerCase() ?? 'default') === 'default' ? 'en' : locale
  return (
    <Html lang={lang}>
      <Head nonce={nonce}>
        <meta charSet="utf-8" />
        <link rel="icon" href="/assets/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
        {adobeAnalyticsConfigured && (
          <Script
            strategy="beforeInteractive"
            src="https://code.jquery.com/jquery-3.6.3.min.js"
          />
        )}
        {adobeAnalyticsConfigured && (
          <Script
            strategy="beforeInteractive"
            src={process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC}
          />
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

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  const nonce = generateRandomNonce()
  ctx.res?.setHeader('Content-Security-Policy', generateCsp(nonce))

  return {
    ...initialProps,
    emotionStyleTags,
    nonce,
  }
}
