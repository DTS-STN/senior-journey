import { FC, PropsWithChildren } from 'react'

import { Link as MuiLink } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import {
  LearnPageLayout
} from '../../components/LearnPageLayout'
import { BreadcrumbItemType } from '../../components/Breadcrumb'

interface ImportantCardProps extends PropsWithChildren { }
const ImportantCard: FC<ImportantCardProps> = ({ children }) => (
  <p className="rounded-lg bg-[#ffe8a3]/[.3] p-5">{children}</p>
)

interface DisclaimerCardProps extends PropsWithChildren { }
const DisclaimerCard: FC<DisclaimerCardProps> = ({ children }) => (
  <p className="rounded-lg bg-[#e9f1ff]/[.7] p-5">{children}</p>
)

const FromWorkToRetirement: FC = () => {
  const { t } = useTranslation('learn/from-work-to-retirement')

  const breadcrumbs: BreadcrumbItemType[] = t('breadcrumbs', {
    returnObjects: true,
  })


  return (
    <LearnPageLayout
      header={t('header')}
      learnMoreHeader={t('learn-more-heading')}
      learnMoreLinks={[]}
      breadCrumbItems={
        breadcrumbs.map((breadcrumb, index) => ({
          text: t(`breadcrumbs.${index}.text`),
          link: t(`breadcrumbs.${index}.link`),
        }))
      }
    >
      <NextSeo title={t('header')} />

      <h2 id="key-takeaways" className="h2 !mt-0">
        {t('key-takeaways.heading')}
      </h2>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>{t('key-takeaways.list.choices-to-start')}</li>
        <li>{t('key-takeaways.list.retire-from-work')}</li>
        <li>{t('key-takeaways.list.affort-to-delay')}</li>
        <li>{t('key-takeaways.list.public-pensions')}</li>
        <li>{t('key-takeaways.list.at-age')}</li>
      </ul>
      <p>{t('key-takeaways.retirement-today')}</p>
      <ul className="mb-5 list-disc space-y-2 pl-7">
        <li>
          <Trans
            ns="learn/from-work-to-retirement"
            i18nKey="key-takeaways.life-chapters.phase-retirement.content"
            components={{
              a: (<MuiLink href={t('key-takeaways.life-chapters.phase-retirement.link')} />),
            }}
          />
        </li>
        <li>
          <Trans
            ns="learn/from-work-to-retirement"
            i18nKey="key-takeaways.life-chapters.second-career.content"
            components={{
              a: (<MuiLink href={t('key-takeaways.life-chapters.second-career.link')} />),
            }}
          />
        </li>
        <li>
          <Trans
            ns="learn/from-work-to-retirement"
            i18nKey="key-takeaways.life-chapters.full-retirement.content"
            components={{
              a: (<MuiLink href={t('key-takeaways.life-chapters.full-retirement.link')} />),
            }}
          />
        </li>
      </ul>

      <h2 id="phased-retirement" className="h2">
        {t('phased-retirement.heading')}
      </h2>
      <h3 id="phased-retirement" className="h3">
        {t('phased-retirement.sub-heading')}
      </h3>
      <p>{t('phased-retirement.content')}</p>

      <h2 id="full-retirement" className="h2">
        {t('full-retirement.heading')}
      </h2>
      <h3 id="full-retirement" className="h3">
        {t('full-retirement.sub-heading')}
      </h3>
      <p>{t('full-retirement.content')}</p>

      <h2 id="combine-job-pensions-income" className="h2">
        {t('combine-job-pensions-income.heading')}
      </h2>
      <p>{t('combine-job-pensions-income.content-one')}</p>
      <h3 id="combine-job-pensions-income-sub-heading-one" className="h3">
        {t('combine-job-pensions-income.sub-heading-one')}
      </h3>
      <p>{t('combine-job-pensions-income.content-two')}</p>
      <p>
        <Trans
          ns="learn/from-work-to-retirement"
          i18nKey="combine-job-pensions-income.content-three.content"
          components={{
            a: (<MuiLink href={t('combine-job-pensions-income.content-three.link')} />),
          }}
        />
      </p>

      <ImportantCard>
        <Trans
          ns="learn/from-work-to-retirement"
          i18nKey="combine-job-pensions-income.smart-tip"
        />
      </ImportantCard>

      <p>
        <Trans
          ns="learn/from-work-to-retirement"
          i18nKey="combine-job-pensions-income.content-four.content"
          components={{
            a: (<MuiLink href={t('combine-job-pensions-income.content-four.link')} />),
          }}
        />
      </p>
      <p>
        <Trans
          ns="learn/from-work-to-retirement"
          i18nKey="combine-job-pensions-income.content-five.content"
          components={{
            a: (<MuiLink href={t('combine-job-pensions-income.content-five.link')} />),
          }}
        />
      </p>
      <h3 id="combine-job-pensions-income-sub-heading-two" className="h3">
        {t('combine-job-pensions-income.sub-heading-two')}
      </h3>
      <p>{t('combine-job-pensions-income.content-six')}</p>
      <DisclaimerCard>
        <Trans
          ns="learn/from-work-to-retirement"
          i18nKey="combine-job-pensions-income.disclaimer"
        />
      </DisclaimerCard>

      <h2 id="case-study" className="h2">
        {t('case-study.heading')}
      </h2>
      <h3 id="case-study-sub-heading-one" className="h3">
        {t('case-study.sub-heading')}
      </h3>

    </LearnPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'learn/from-work-to-retirement',
      ])),
    },
  }
}

export default FromWorkToRetirement
