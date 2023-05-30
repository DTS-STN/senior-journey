// @ts-check

require('./open-telemetry.config')

const { i18n } = require('./next-i18next.config')
const { statSync } = require('fs')

// prettier-ignore
const securityHeaders = [
  // for Content-Security-Policy headers, see _document.tsx
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

// prettier-ignore
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date(process.env.BUILD_DATE ?? statSync('package.json').mtime).toISOString().slice(0, 10),
    NEXT_PUBLIC_BUILD_ID: process.env.BUILD_ID ?? '0000',
    NEXT_PUBLIC_BUILD_REVISION: process.env.BUILD_REVISION ?? '00000000',
    NEXT_PUBLIC_BUILD_TIMESTAMP: new Date(process.env.BUILD_DATE ?? statSync('package.json').mtime).toISOString(),
    NEXT_PUBLIC_BUILD_VERSION: process.env.BUILD_VERSION ?? '00000000-0000-00000000',
    LOGGING_LEVEL: process.env.LOGGING_LEVEL ?? 'info',
  },
  generateBuildId: async () => (process.env.BUILD_ID ?? '0000'),
  headers: async () => ([{ source: '/:path*', headers: securityHeaders }]),
  i18n: { ...i18n, localeDetection: false },
  poweredByHeader: false,
  publicRuntimeConfig: {
    NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC: process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC,
    NEXT_PUBLIC_APP_BASE_URI: process.env.NEXT_PUBLIC_APP_BASE_URI,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
