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
      <h2 className="h2">{t('contact-us.title')}</h2>
      <p className="text-black pb-4">{t('contact-us.description')}</p>
      <div className="text-basic-gray card border border-gray-300 text-gray-900 shadow-sm rounded-md p-4 mb-6">
        <h3 className="text-xl font-bold border-b pb-2">{t('contact-us.cards.call-us.title')}</h3>
        <p className="pt-3 text-lg">{t('contact-us.cards.call-us.description')}</p>
        <p className="text-lg md:inline"><span className="font-bold">{t('contact-us.cards.call-us.toll-free')}</span> {t('contact-us.cards.call-us.toll-number')}</p>
        <p className="text-lg md:inline md:ml-10"><span className="font-bold">{t('direct')}</span> {t('contact-us.cards.call-us.direct-number')}</p>
      </div>
      <div className="text-basic-gray card border border-gray-300 text-gray-900 shadow-sm rounded-md p-4">
        <h3 className="text-xl font-bold border-b pb-2">{t('contact-us.cards.find-office.title')}</h3>
        <p className="pt-3 text-lg">{t('contact-us.cards.find-office.description')}</p>
        <Link href={t('contact-us.cards.find-office.href')}><p className="text-lg">{t('contact-us.cards.find-office.link-text')}</p></Link>
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
