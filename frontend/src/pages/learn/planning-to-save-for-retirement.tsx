import { FC, useMemo } from 'react'

import { Link as MuiLink } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'

import {
  LearnMoreLink,
  LearnPageLayout,
} from '../../components/LearnPageLayout'

const PlanningToSaveForRetirement: FC = () => {
  const { t } = useTranslation('learn/planning-to-save-for-retirement')
  const router = useRouter()

  const learnMoreLinks = useMemo<ReadonlyArray<LearnMoreLink>>(
    () => [
      {
        href: '#',
        primary: t('transitioning-heading'),
        secondary: t('transitioning-content'),
      },
      {
        href: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp.html',
        primary: t('cpp-heading'),
        secondary: t('cpp-content'),
      },
      {
        href: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security.html',
        primary: t('oas-heading'),
        secondary: t('oas-content'),
      },
      {
        href: '#',
        primary: t('sources-of-income-heading'),
        secondary: t('sources-of-income-content'),
      },
    ],
    [t]
  )

  return (
    <LearnPageLayout
      header={t('header')}
      learnMoreHeader={t('learn-more-heading')}
      learnMoreLinks={learnMoreLinks}
    >
      <NextSeo title={t('header')} />
      <h2 id="overview" className="sr-only">
        {t('overview-link-text')}
      </h2>
      <p>{t('overview')}</p>
      <h2 id="how-much-will-you-need" className="h2">
        {t('how-much-will-you-need-heading')}
      </h2>
      <Trans
        ns="learn/planning-to-save-for-retirement"
        i18nKey="how-much-will-you-need-content"
        components={{ anchor: <MuiLink href={t('GIS-link')} /> }}
      />
      <h2 id="changes-with-age" className="h2">
        {t('changes-with-age-heading')}
      </h2>
      <p>{t('changes-with-age-content-one')}</p>
      <p>{t('changes-with-age-content-two')}</p>
      <h2 id="turning-savings-into-income" className="h2">
        {t('turning-savings-into-income-heading')}
      </h2>
      <p>{t('turning-savings-into-income-content-one')}</p>
      <p>{t('turning-savings-into-income-content-two')}</p>
      <Image
        src={`/assets/rrif_${router.locale}.svg`}
        height={500}
        width={500}
        alt={t('rrif-alt')}
        className="mx-auto"
      />
      <p>{t('turning-savings-into-income-content-three')}</p>
      <Trans
        ns="learn/planning-to-save-for-retirement"
        i18nKey="turning-savings-into-income-content-four"
        components={{ anchor: <MuiLink href={t('RRIF-link')} /> }}
      />
    </LearnPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'learn/planning-to-save-for-retirement',
      ])),
    },
  }
}

export default PlanningToSaveForRetirement
