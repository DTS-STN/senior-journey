import { FC } from 'react'

import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MdArrowForwardIos } from 'react-icons/md'

import { LearnPageLayout } from '../../components/LearnPageLayout'

const PlanningToSaveForRetirement: FC = () => {
  const { t } = useTranslation('learn/planning-to-save-for-retirement')
  const router = useRouter()

  return (
    <LearnPageLayout header={t('header')}>
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
        components={{ anchor: <a href={t('GIS-link')} /> }}
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
        components={{ anchor: <a href={t('RRIF-link')} /> }}
      />
      <h2 className="h2">{t('learn-more-heading')}</h2>
      {[
        {
          href: '#',
          heading: t('transitioning-heading'),
          content: t('transitioning-content'),
        },
        {
          href: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp.html',
          heading: t('cpp-heading'),
          content: t('cpp-content'),
        },
        {
          href: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security.html',
          heading: t('oas-heading'),
          content: t('oas-content'),
        },
        {
          href: '#',
          heading: t('sources-of-income-heading'),
          content: t('sources-of-income-content'),
        },
      ].map(({ href, heading, content }) => (
        <a
          key={heading}
          href={href}
          className="space-between m-5 flex w-[100%] items-center border-b-2 text-black no-underline visited:text-black"
        >
          <div className="flex-1 md:mr-20">
            <h3 className="mb-2 font-medium">{heading}</h3>
            <p className="text-[.9em] text-gray-700">{content}</p>
          </div>
          <MdArrowForwardIos className="ml-5 text-[2rem] font-bold md:mr-5 xl:text-2xl" />
        </a>
      ))}
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
