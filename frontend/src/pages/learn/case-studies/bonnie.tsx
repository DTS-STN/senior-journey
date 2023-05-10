import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import { LearnPageLayout } from '../../../components/LearnPageLayout'

const Bonnie: FC = () => {
  const { t } = useTranslation('learn/case-studies/bonnie')

  return (
    <LearnPageLayout
      header={t('header')}
      breadcrumbItems={[

      ]}
    >
      <NextSeo title={t('header')} />

    </LearnPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'learn/case-studies/bonnie',
      ])),
    },
  }
}

export default Bonnie
