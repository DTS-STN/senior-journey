import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import Image from 'next/image'

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
    <div>
      <NextSeo title={t('header')} />
      <h1 className="h1">{t('header')}</h1>
      <p>{t('description')}</p>

      <section className="flex flex-col p-5 md:p-0 md:relative bg-[#f5f5f5] rounded-2xl">
        <Image
          src="/assets/banner.svg"
          className="ml-auto w-full h-full pt-5 md:w-1/2"
          width={742}
          height={548}
          sizes="100%"
          alt=""
          priority
        />
        <h2 className="text-center md:absolute top-2 left-10 h2 lg:text-4xl xl:text-5xl">
          {t('banner.title')}
        </h2>
        <p className="text-center md:absolute md:text-left lg:text-2xl top-24 left-10 md:w-1/2 xl:top-32 text-sm font-bold">
          {t('banner.text')}
        </p>
        <a
          href="#"
          className="w-1/2 shadow-xl text-sm text-center mx-auto md:absolute md:w-auto md:bottom-10 md:left-60 lg:text-xl lg:left-[300px] xl:bottom-16 bg-[#d77011] rounded-full text-white decoration-white no-underline md:px-8 py-4 lg:py-8 hover:bg-orange-800 visited:text-white visited:decoration-white"
        >
          {t('banner.quiz')}
        </a>
      </section>

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

      <section>
        <h2 className="h2">{t('contact-us.title')}</h2>
        <p className="pb-4">{t('contact-us.description')}</p>
        <div className="card border border-gray-300 shadow-sm rounded-md p-4 mb-6">
          <h3 className="text-xl font-bold border-b pb-2">{t('contact-us.cards.call-us.title')}</h3>
          <p className="pt-3 text-lg">{t('contact-us.cards.call-us.description')}</p>
          <p className="text-lg md:inline"><span className="font-bold">{t('contact-us.cards.call-us.toll-free')}</span> {t('contact-us.cards.call-us.toll-number')}</p>
          <p className="text-lg md:inline md:ml-10"><span className="font-bold">{t('contact-us.cards.call-us.direct')}</span> {t('contact-us.cards.call-us.direct-number')}</p>
        </div>
        <div className="card border border-gray-300 shadow-sm rounded-md p-4">
          <h3 className="text-xl font-bold border-b pb-2">{t('contact-us.cards.find-office.title')}</h3>
          <p className="pt-3 text-lg">{t('contact-us.cards.find-office.description')}</p>
          <Link className="text-lg" href={t('contact-us.cards.find-office.href')}>{t('contact-us.cards.find-office.link-text')}</Link>
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? 'default', ['common', 'home'])) }
})

export default Home
