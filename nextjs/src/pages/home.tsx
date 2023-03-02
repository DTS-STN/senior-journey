import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import Layout from '../components/Layout'

const Home: FC = () => {
  const { t } = useTranslation('home')

  return (
    <Layout>
      <NextSeo title={t('header')} />
      <h1 className="h1">{t('header')}</h1>
      <p>{t('description')}</p>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'home'])),
  },
})

export default Home
