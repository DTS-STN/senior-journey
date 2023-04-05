import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

const Learn: FC = () => {
  const { t } = useTranslation('learn')

  return (
    <>
      <NextSeo title={t('header')} />
      <section className="rounded-2xl bg-[#f5f5f5]">
        <div className="flex flex-col items-center md:flex-row-reverse">
          <div className="m-12 w-1/2 md:w-1/3 lg:w-1/5">
            <Image
              src="/assets/learn-banner.svg"
              width={742}
              height={548}
              sizes="100%"
              alt=""
              priority
            />
          </div>
          <div className="w-full px-6 md:w-2/3 md:pl-12 lg:w-4/5">
            <h2 className="h2 pb-6 text-left text-5xl font-semibold xl:text-5xl">
              {t('banner.title')}
            </h2>
            <p className="text-left text-lg font-normal md:w-4/5">
              {t('banner.text')}
            </p>
          </div>
        </div>
        <div className="relative flex w-full justify-center md:-mt-8 lg:bottom-6 xl:bottom-14">
          <Link
            href="#"
            className="mx-auto mb-4 w-full rounded-full bg-[#d77011] px-8 py-4 text-center
            text-sm text-white no-underline decoration-white shadow-xl visited:text-white visited:decoration-white
            hover:bg-orange-800 md:w-auto lg:text-xl"
          >
            {t('banner.quiz')}
          </Link>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'learn',
      ])),
    },
  }
}

export default Learn
