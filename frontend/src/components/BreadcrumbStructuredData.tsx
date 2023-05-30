import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'

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
  const config = getConfig()
  const appBaseUri = config?.publicRuntimeConfig?.appBaseUri

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
      'item': `${appBaseUri}/${locale}${link}`,
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
