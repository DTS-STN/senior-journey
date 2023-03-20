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

  const breadCrumbItems = (locale === 'en' ?
  [
      {
        "text": "Home",
        "link": "/home"
      },
      {
        "text": "Learn",
        "link": "/learn"
      }
  ]
  :
  [
      {
        "text": "(FR)Home",
        "link": "/home"
      },
      {
        "text": "(FR)Learn",
        "link": "/learn"
      }
  ] 
  )

  return{
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn'])),
      breadCrumbItems: breadCrumbItems
    }
  }
}

export default Learn
