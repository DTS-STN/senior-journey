import { FC } from 'react'

import { GetServerSideProps } from 'next'

import { HomePage } from '../components/pages/HomePage'
import { SplashPage } from '../components/pages/SplashPage'
import { pageWithServerSideTranslations } from '../utils/next-i18next-utils'

const isHomePage = (locale?: string) => locale === 'en' || locale === 'fr'

interface IndexProps {
  locale?: string
}

const Index: FC<IndexProps> = ({ locale }) => {
  return isHomePage(locale) ? <HomePage /> : <SplashPage />
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async ({ locale }) => {
    const translations =  isHomePage(locale) ? await pageWithServerSideTranslations(locale, 'home') : {}
    return {
      props: {
        ...translations,
        locale,
      },
    }
}

export default Index
