import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

const Learn: FC = () => {
  const { t } = useTranslation('learn')
  return (
    <div>
      <NextSeo title={t('header')} />
      <h1 className="h1">{t('header')}</h1>
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
