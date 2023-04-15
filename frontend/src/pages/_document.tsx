/* eslint-disable @next/next/no-sync-scripts */

import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript, } from 'next/document';

import { getLogger } from '../logging/log-util';
import { generateRandomNonce, generateStrictContentSecurityPolicy } from '../utils/content-security-policy';
import Script from 'next/script';

const log = getLogger('_document.tsx')

const adobeAnalyticsConfigured = process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC !== undefined
const defaultAdobeAnalyticsDomains = ['*.demdex.net', 'assets.adobedtm.com', 'cm.everesttech.net', 'code.jquery.com'];
const defaultAdobeAnalyticsScriptHashes = [`'sha256-eUTan7s7Let/AtTx7e/BFrXBJ1hNp+oNNppAFt05OMc='`, `'sha256-ijXSZE47lIAA0cp6SwVwWQroK1Mbcv6gKq8PugakSdI='`, `'sha256-WR7dYY/Sv6nA60KEEdlxilApWnN1lTS8373DIVAL42U='`];

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
  const adobeAnalyticsScriptHashes = process.env.ADOBE_ANALYTICS_CSP_SCRIPT_HASHES
    ? JSON.parse(process.env.ADOBE_ANALYTICS_CSP_SCRIPT_HASHES)
    : defaultAdobeAnalyticsScriptHashes;
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
  contentSecurityPolicy['font-src']?.push("fonts.gstatic.com")
  contentSecurityPolicy['style-src']?.push("fonts.googleapis.com")

  if (adobeAnalyticsConfigured) {
    log.debug('Adobe Analytics configuration detected, adding necessary Content-Security-Policy directives')

    const adobeAnalyticsDomains = getAdobeAnalyticsDomains()
    const adobeAnalyticsSriptHashes = getAdobeAnalyticsScriptHashes()

    contentSecurityPolicy['connect-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['frame-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['img-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['prefetch-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['script-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['style-src']?.push(adobeAnalyticsDomains)
    contentSecurityPolicy['script-src']?.push(adobeAnalyticsSriptHashes)
  }


  log.debug(`Adding 'nonce-${nonce}' directives to Content-Security-Policy`)
  contentSecurityPolicy['script-src']?.push(`'nonce-${nonce}'`)

  // transform the contentSecurityPolicy object into a correctly-formatted string
  return Object.entries(contentSecurityPolicy).map(([key, value]) => `${key} ${value.join(' ')}`).join('; ');
}

/**
 * A custom Document class that extends Next.js' built-in Document class.
 *
 * @class MyDocument
 * @extends Document
 */
class MyDocument extends Document<DocumentInitialProps & { nonce: string }> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & { nonce: string }> {
    const nonce = generateRandomNonce()
    ctx.res?.setHeader('Content-Security-Policy', generateCsp(nonce))
    return { ...await Document.getInitialProps(ctx), nonce }
  }

  render() {
    const { locale, nonce } = this.props
    const lang = (locale?.toLowerCase() ?? 'default') === 'default' ? 'en' : this.props.locale

    return (
      <Html lang={lang}>
        <Head nonce={nonce}>
          <meta charSet="utf-8" />
          <link rel="icon" href="/assets/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
          {adobeAnalyticsConfigured && <Script strategy="beforeInteractive" src="https://code.jquery.com/jquery-3.6.3.min.js" />}
          {adobeAnalyticsConfigured && <Script strategy="beforeInteractive" src={process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC} />}
        </body>
      </Html>
    )
  }
}

export default MyDocument
