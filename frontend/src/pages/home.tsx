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
    <div>
      <NextSeo title={t('header')} />

      <section className="flex flex-col rounded-2xl bg-[#f5f5f5] p-5 md:relative md:p-0">
        <div className="md:w-1/3">
          <Image
            src="/assets/banner.svg"
            className="mx-auto h-full w-full pt-5"
            width={742}
            height={548}
            sizes="100%"
            alt=""
            priority
          />
        </div>
        <div className="pl-12 md:w-2/3">
          <h2 className="h2 mt-4 pb-6 text-left lg:text-4xl xl:text-6xl">
            {t('banner.title')}
          </h2>
          <p className="pb-2 text-left text-sm font-normal md:w-4/5 lg:text-lg">
            {t('banner.text')}
          </p>
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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'home'])),
  },
})

export default Home
