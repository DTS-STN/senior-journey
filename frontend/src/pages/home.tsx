import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import Tabcordian from '../components/Tabcordian'

export interface SupportingSeniorsCardProps {
  src: string
  href: string
  linkText: string
  text: string
}

const SupportingSeniorsCard: FC<SupportingSeniorsCardProps> = ({
  src,
  href,
  linkText,
  text,
}) => {
  return (
    <div className="flex flex-col rounded-md p-4 elevation-1">
      <div className="mx-auto h-[300px]">
        <Image src={src} width={200} height={300} alt="" />
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
      <p>{text}</p>
    </div>
  )
}

const Home: FC = () => {
  const { t } = useTranslation('home')

  return (
    <Layout>
      <NextSeo title={t('header')} />

      <section className="rounded-3xl bg-[#f5f5f5] ">
        <div className="pt-10 flex flex-col items-center md:flex-row-reverse">
          <div className="mb-4 md:mb-0 w-2/3 md:w-2/3 lg:w-3/5">
            <Image
              src="/assets/banner.svg"
              width={742}
              height={548}
              sizes="100%"
              alt=""
              priority
            />
          </div>
          <div className="w-full px-6 text-center md:w-2/3 pb-4 md:pl-14 md:text-left lg:w-4/5">
            <h3 className="h3 mb-4 text-left text-5xl font-bold text-primary-700">
              {t('banner.title')}
            </h3>
            <p className="text-left text-lg font-normal">
              {t('banner.text')}
            </p>
          </div>
        </div>
      </section>

      <section>
        <Tabcordian data={t('tabs', { returnObjects: true })} />
      </section>

      <section>
        <h2 className="h2 pb-8">{t('supporting-seniors.title')}</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <SupportingSeniorsCard
            src="/assets/supporting-seniors-family-and-friends.svg"
            href={t('supporting-seniors.cards.family-and-friends.href')}
            linkText={t(
              'supporting-seniors.cards.family-and-friends.link-text'
            )}
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
      <section className="py-8">
        <h2 className="h2">{t('contact-us.title')}</h2>
        <p className="pb-4">{t('contact-us.description')}</p>
        <div className="mb-6 rounded-lg border p-4">
          <h3 className="border-b pb-2 text-xl font-bold">
            {t('contact-us.cards.call-us.title')}
          </h3>
          <p className="pt-3 text-lg">
            {t('contact-us.cards.call-us.description')}
          </p>
          <p className="text-lg md:inline">
            <span className="font-bold">
              {t('contact-us.cards.call-us.toll-free')}
            </span>{' '}
            {t('contact-us.cards.call-us.toll-number')}
          </p>
          <p className="text-lg md:ml-10 md:inline">
            <span className="font-bold">
              {t('contact-us.cards.call-us.direct')}
            </span>{' '}
            {t('contact-us.cards.call-us.direct-number')}
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="border-b pb-2 text-xl font-bold">
            {t('contact-us.cards.find-office.title')}
          </h3>
          <p className="pt-3 text-lg">
            {t('contact-us.cards.find-office.description')}
          </p>
          <Link
            className="text-lg"
            href={t('contact-us.cards.find-office.href')}
          >
            {t('contact-us.cards.find-office.link-text')}
          </Link>
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
