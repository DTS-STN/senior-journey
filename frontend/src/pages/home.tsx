import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import Layout from '../components/Layout'

const Home: FC = () => {
  const { t } = useTranslation('home')

  return (
    <Layout>
      <NextSeo title={t('header')} />
      <h1 className="h1">{t('header')}</h1>
      <p>{t('description')}</p>
      <h1 className="h1">{t('contact-us')}</h1>
      <p className="text-black pb-4">{t('contact-desc')}</p>
      <div className="text-basic-gray card border border-gray-300 text-gray-900 shadow-sm rounded-md p-4 mb-6">
        <h2 className="text-xl font-bold border-b pb-2">{t('call-us')}</h2>
        <p className="pt-3 text-lg">{t('call-us-desc')}</p>
        <p className="text-lg md:inline"><span className="font-bold">{t('toll-free')}</span> {t('toll-number')}</p>
        <p className="text-lg md:inline md:ml-10"><span className="font-bold">{t('direct')}</span> {t('direct-number')}</p>
      </div>
      <div className="text-basic-gray card border border-gray-300 text-gray-900 shadow-sm rounded-md p-4">
        <h2 className="text-xl font-bold border-b pb-2">{t('find-office')}</h2>
        <p className="pt-3 text-lg">{t('find-office-desc')}</p>
        <Link href={t('find-office-url')}><p className="text-lg">{t('find-office-link-text')}</p></Link>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'home'])),
  },
})

export default Home
