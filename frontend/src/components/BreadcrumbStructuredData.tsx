import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import urlcat from 'urlcat'

import { usePublicRuntimeConfig } from '../lib/hooks/usePublicRuntimeConfig'
import { BreadcrumbProps } from './Breadcrumb'

interface ListItem {
  '@type': 'ListItem'
  'position': number
  'name': string
  'item'?: string
}

const BreadcrumbStructuredData: FC<BreadcrumbProps> = ({ items }) => {
  const { locale } = useRouter()
  const { t } = useTranslation('common')
  const publicRuntimeConfig = usePublicRuntimeConfig()

  const itemListElement: Array<ListItem> = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': t('goc-site'),
      'item': t('header.goc-link'),
    },
    ...(items?.map<ListItem>(({ link, text }, index) => ({
      '@type': 'ListItem',
      'position': index + 2,
      'name': text,
      'item': urlcat(publicRuntimeConfig.NEXT_PUBLIC_APP_BASE_URI, `/${locale ?? 'en'}${link}`),
    })) ?? []),
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement,
  }

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </Head>
  )
}

export default BreadcrumbStructuredData
