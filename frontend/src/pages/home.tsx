import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import Layout from '../components/Layout'


export interface SupportingSeniorsCardProps {
  src: string,
  href: string,
  linkText: string,
  text: string
}

const SupportingSeniorsCard: FC<SupportingSeniorsCardProps> = ({src, href, linkText, text}) => {
return (
  <div className="flex flex-col border rounded-md shadow-lg p-4">

      <div className="h-[300px] mx-auto">
          <Image 
              src={src}
              width={200}
              height={300}
              alt=""
          />
      </div>
      <a href={href} target='_blank' rel="noopener noreferrer">{linkText}</a>
      <p>{text}</p>
  </div>
)
}

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
          <SupportingSeniorsCard 
              src="/assets/supporting-seniors-family-and-friends.svg" 
              href={t('supporting-seniors.cards.family-and-friends.href')} 
              linkText={t('supporting-seniors.cards.family-and-friends.link-text')}
              text={t('supporting-seniors.cards.family-and-friends.text')} 
            />
            <SupportingSeniorsCard 
              src="/assets/supporting-seniors-representatives.svg"
              href={t('supporting-seniors.cards.representatives.href')} 
              linkText={t('supporting-seniors.cards.representatives.link-text')}
              text={t('supporting-seniors.cards.representatives.text')} 
            />
            <SupportingSeniorsCard 
              src="/assets/supporting-seniors-organizations.svg"
              href={t('supporting-seniors.cards.organizations.href')} 
              linkText={t('supporting-seniors.cards.organizations.link-text')}
              text={t('supporting-seniors.cards.organizations.text')} 
            />
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
