import { DefaultSeoProps } from 'next-seo'
import { OpenGraphMedia } from 'next-seo/lib/types'
import { Router } from 'next/router'
import urlcat from 'urlcat'

import { getLogger } from './logging/log-util'

const logger = getLogger('next-seo-config')

export type NextSEORouter = Pick<Router, 'asPath' | 'locale'>

export interface LanguageAlternate {
  hrefLang: string
  href: string
}

export const getLanguageAlternates = (
  appBaseUri: string,
  router: NextSEORouter,
): ReadonlyArray<LanguageAlternate> | undefined => {
  if (!appBaseUri) return
  try {
    return [
      {
        hrefLang: 'en',
        href: urlcat(appBaseUri, `/en${router.asPath}`),
      },
      {
        hrefLang: 'fr',
        href: urlcat(appBaseUri, `/fr${router.asPath}`),
      },
    ]
  } catch (error) {
    const message =
      error instanceof Error
        ? `Unable to perform operation getLanguageAlternates due to: ${error.message}`
        : `Unknown error occurred`
    logger.error(error, message)
  }
}

export const getOpenGraphImages = (appBaseUri: string): ReadonlyArray<OpenGraphMedia> | undefined => {
  if (!appBaseUri) return
  return [
    {
      url: urlcat(appBaseUri, '/assets/ogp.jpg'),
      width: 1200,
      height: 630,
      type: 'image/jpeg',
    },
  ]
}

export type GetNextSEOConfig = (appBaseUri: string, router: NextSEORouter) => DefaultSeoProps

export const getDefaultConfig: GetNextSEOConfig = (appBaseUri, router) => ({
  titleTemplate: '%s - Canada.ca',
  defaultTitle: 'Retirement Hub | Carrefour retraite',
  description:
    "It's never too early or too late to learn about your retirement options and plan for your future. Find out about public pensions, when to take them and tips to consider for your retirement income. | Il n'est jamais trop tôt ni trop tard pour s'informer sur les options de retraite qui s'offrent à vous et planifier votre avenir. Renseignez-vous sur les pensions publiques, le meilleur moment pour commencer à les recevoir et les conseils pour maximiser votre revenu de retraite.",
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Employment and Social Development Canada',
    },
    {
      name: 'author',
      keyOverride: 'author:fr',
      lang: 'fr',
      content: 'Emploi et Développement social Canada',
    },
    { name: 'dcterms.accessRights', content: '2' },
    {
      name: 'dcterms.creator',
      content: 'Employment and Social Development Canada',
    },
    {
      name: 'dcterms.creator',
      keyOverride: 'dcterms.creator:fr',
      lang: 'fr',
      content: 'Emploi et Développement social Canada',
    },
    { name: 'dcterms.language', content: 'eng' },
    {
      name: 'dcterms.language',
      keyOverride: 'dcterms.language:fr',
      lang: 'fr',
      content: 'fra',
    },
    { name: 'dcterms.service', content: 'ESDC-EDSC_RH-CR' },
    { name: 'dcterms.spatial', content: 'Canada' },
    {
      name: 'dcterms.subject',
      content: 'SO Society and Culture; Seniors',
    },
    {
      name: 'dcterms.subject',
      keyOverride: 'dcterms.subject:fr',
      lang: 'fr',
      content: 'SO Société et Culture; Aînés',
    },
  ],
  languageAlternates: getLanguageAlternates(appBaseUri, router),
  openGraph: {
    images: getOpenGraphImages(appBaseUri),
    locale: 'en_CA',
    siteName: 'Retirement Hub | Carrefour retraite - Canada.ca',
    type: 'website',
  },
  twitter: {
    site: '@ESDC_GC',
    cardType: 'summary_large_image',
  },
})

export const getEnglishConfig: GetNextSEOConfig = (appBaseUri, router) => ({
  titleTemplate: '%s - Retirement Hub - Canada.ca',
  defaultTitle: 'Retirement Hub - Canada.ca',
  description:
    "It's never too early or too late to learn about your retirement options and plan for your future. Find out about public pensions, when to take them and tips to consider for your retirement income.",
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Employment and Social Development Canada',
    },
    { name: 'dcterms.accessRights', content: '2' },
    {
      name: 'dcterms.creator',
      content: 'Employment and Social Development Canada',
    },
    { name: 'dcterms.language', content: 'eng' },
    { name: 'dcterms.service', content: 'ESDC-EDSC_RH-CR' },
    { name: 'dcterms.spatial', content: 'Canada' },
    {
      name: 'dcterms.subject',
      content: 'SO Society and Culture; Seniors',
    },
  ],
  languageAlternates: getLanguageAlternates(appBaseUri, router),
  openGraph: {
    images: getOpenGraphImages(appBaseUri),
    locale: 'en_CA',
    siteName: 'Retirement Hub - Canada.ca',
    type: 'website',
  },
  twitter: {
    site: '@ESDC_GC',
    cardType: 'summary_large_image',
  },
})

export const getFrenchConfig: GetNextSEOConfig = (appBaseUri, router) => ({
  titleTemplate: '%s - Carrefour retraite - Canada.ca',
  defaultTitle: 'Carrefour retraite - Canada.ca',
  description:
    "Il n'est jamais trop tôt ni trop tard pour s'informer sur les options de retraite qui s'offrent à vous et planifier votre avenir. Renseignez-vous sur les pensions publiques, le meilleur moment pour commencer à les recevoir et les conseils pour maximiser votre revenu de retraite.",
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Emploi et Développement social Canada',
    },
    { name: 'dcterms.accessRights', content: '2' },
    {
      name: 'dcterms.creator',
      content: 'Emploi et Développement social Canada',
    },
    { name: 'dcterms.language', content: 'fra' },
    { name: 'dcterms.service', content: 'ESDC-EDSC_RH-CR' },
    { name: 'dcterms.spatial', content: 'Canada' },
    {
      name: 'dcterms.subject',
      content: 'SO Société et Culture; Aînés',
    },
  ],
  languageAlternates: getLanguageAlternates(appBaseUri, router),
  openGraph: {
    images: getOpenGraphImages(appBaseUri),
    locale: 'fr_CA',
    siteName: 'Carrefour retraite - Canada.ca',
    type: 'website',
  },
  twitter: {
    site: '@EDSC_GC',
    cardType: 'summary_large_image',
  },
})

export const getNextSEOConfig: GetNextSEOConfig = (appBaseUri, router) => {
  const { locale } = router
  if (locale === 'en') return getEnglishConfig(appBaseUri, router)
  if (locale === 'fr') return getFrenchConfig(appBaseUri, router)
  return getDefaultConfig(appBaseUri, router)
}
