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
    <div>
      <NextSeo title={t('header')} />
      <section className="bg-[#f5f5f5] rounded-2xl">
        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="w-1/2 md:w-1/3 lg:w-1/5 m-12">
            <Image src="/assets/learn-banner.svg" width={742} height={548} sizes="100%" alt="" priority />
          </div>
          <div className="w-full md:w-2/3 lg:w-4/5 md:pl-12 px-6">
            <h2 className="text-left h2 text-5xl xl:text-5xl pb-6 font-semibold">{t('banner.title')}</h2>
            <p className="text-left md:w-4/5 text-lg font-normal">{t('banner.text')}</p>

          </div>
        </div>
        <div className="w-full flex justify-center relative lg:bottom-6 xl:bottom-14 md:-mt-8">
        <Link href="#" className="w-full mx-6 mb-4 shadow-xl text-sm text-center mx-auto md:w-auto lg:text-xl
            bg-[#d77011] rounded-full text-white decoration-white no-underline px-8 py-4 
            hover:bg-orange-800 visited:text-white visited:decoration-white">
              {t('banner.quiz')}
            </Link>
        </div>
    </section>
    </div>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ locale }) => {

  return{
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn'])),
    }
  }
}

export default Learn
