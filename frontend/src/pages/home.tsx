import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import Tabcordian from 'src/components/Tabcordian'

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
    <div className="flex flex-col rounded-md border p-4 elevation-1">
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
    <div>
      <NextSeo title={t('header')} />

      <section className="flex flex-col rounded-2xl bg-[#f5f5f5] p-5 md:relative md:p-0">
        <Image
          src="/assets/banner.svg"
          className="ml-auto h-full w-full pt-5 md:w-1/2"
          width={742}
          height={548}
          sizes="100%"
          alt=""
          priority
        />
        <h2 className="h2 left-10 top-2 text-center md:absolute lg:text-4xl xl:text-5xl">
          {t('banner.title')}
        </h2>
        <p className="left-10 top-24 text-center text-sm font-bold md:absolute md:w-1/2 md:text-left lg:text-2xl xl:top-32">
          {t('banner.text')}
        </p>
        <a
          href="#"
          className="mx-auto w-1/2 rounded-full bg-[#d77011] py-4 text-center text-sm text-white no-underline decoration-white elevation-2 visited:text-white visited:decoration-white hover:bg-orange-800 hover:text-white focus:bg-orange-800 focus:text-white active:elevation-8 md:absolute md:bottom-10 md:left-60 md:w-auto md:px-8 lg:left-[300px] lg:py-8 lg:text-xl xl:bottom-16"
        >
          {t('banner.quiz')}
        </a>
      </section>

      <section>
        <Tabcordian data={t('tabs', { returnObjects: true })} />
      </section>

      <section>
        <h2 className="h2">{t('supporting-seniors.title')}</h2>
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

      <section>
        <h2 className="h2">{t('contact-us.title')}</h2>
        <p className="pb-4">{t('contact-us.description')}</p>
        <div className="card mb-6 rounded-md border border-gray-300 p-4">
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
        <div className="card rounded-md border border-gray-300 p-4">
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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'home'])),
  },
})

export default Home
