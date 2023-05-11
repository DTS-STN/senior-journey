import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import { LearnPageLayout } from '../../../components/LearnPageLayout'
import { getDCTermsTitle } from '../../../utils/seo-utils'

const Fred: FC = () => {
  const { t, i18n } = useTranslation('learn/case-studies/fred')
  const en = i18n.getFixedT('en', 'learn/case-studies/fred')
  const fr = i18n.getFixedT('fr', 'learn/case-studies/fred')

  return (
    <>
      <NextSeo title={t('header')} additionalMetaTags={[getDCTermsTitle(en('header'), fr('header'))]} />
      <LearnPageLayout header={t('header')} breadcrumbItems={[]}>
        Content here
      </LearnPageLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn/case-studies/fred'], null, ['en', 'fr'])),
    },
  }
}

export default Fred
