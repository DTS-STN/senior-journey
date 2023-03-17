import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import Layout from '../components/Layout'

const Home: FC = () => {
  const { t } = useTranslation('home')

  return (
    <Layout>
      <NextSeo title={t('header')} />
      <h1 className="h1">{t('header')}</h1>
      <p>{t('description')}</p>

      <section>
        <h2 className='h2'>{t('supporting-seniors.title')}</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <div className="flex flex-col border rounded-md shadow-lg p-4">
            <div className="mx-auto">
                <Image 
                    src="/assets/supporting-seniors-family-and-friends.svg" 
                    width={200}
                    height={300}
                    style={{ width: 200, height: 300 }}
                    alt=""
                />
            </div>
            <a href={t('supporting-seniors.cards.family-and-friends.href')} target='_blank' rel="noopener noreferrer">{t('supporting-seniors.cards.family-and-friends.link-text')}</a>
            <p>{t('supporting-seniors.cards.family-and-friends.text')}</p>
          </div>
          <div className="flex flex-col border rounded-md shadow-lg p-4">
            <div className="mx-auto">
                <Image 
                    src="/assets/supporting-seniors-representatives.svg"
                    width={200}
                    height={300}
                    style={{ width: 200, height: 300 }}
                    alt=""
                />
            </div>
            <a href={t('supporting-seniors.cards.representatives.href')} target='_blank' rel="noopener noreferrer">{t('supporting-seniors.cards.representatives.link-text')}</a>
            <p>{t('supporting-seniors.cards.representatives.text')}</p>
          </div>
          <div className="flex flex-col border rounded-md shadow-lg p-4">
            <div className="mx-auto">
                <Image 
                    src="/assets/supporting-seniors-organizations.svg"
                    width={200}
                    height={300}
                    style={{ width: 200, height: 300 }}
                    alt=""
                />
            </div>
            <a href={t('supporting-seniors.cards.organizations.href')} target='_blank' rel="noopener noreferrer">{t('supporting-seniors.cards.organizations.link-text')}</a>
            <p>{t('supporting-seniors.cards.organizations.text')}</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'home'])),
  },
})

export default Home
