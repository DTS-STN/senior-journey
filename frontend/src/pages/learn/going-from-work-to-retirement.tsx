import { FC } from 'react'

import { Link as MuiLink } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import AlertCard from '../../components/AlertCard'
import { LearnPageLayout } from '../../components/LearnPageLayout'
import { getDCTermsTitle } from '../../utils/seo-utils'

const GoingFromWorkToRetirement: FC = () => {
  const { t, i18n } = useTranslation('learn/going-from-work-to-retirement')
  const en = i18n.getFixedT('en', 'learn/going-from-work-to-retirement')
  const fr = i18n.getFixedT('fr', 'learn/going-from-work-to-retirement')

  return (
    <>
      <NextSeo
        title={t('header')}
        description={t('meta.description')}
        additionalMetaTags={[getDCTermsTitle(en('header'), fr('header'))]}
      />
      <LearnPageLayout
        header={t('header')}
        breadcrumbItems={[
          {
            link: '/',
            text: t('common:application-name'),
          },
          {
            link: '/learn',
            text: t('breadcrumbs.learn'),
          },
        ]}
      >
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
              ns="learn/going-from-work-to-retirement"
              i18nKey="key-takeaways.life-chapters.phase-retirement.content"
              components={{
                a: <MuiLink href={t('key-takeaways.life-chapters.phase-retirement.link')} />,
              }}
            />
          </li>
          <li>
            <Trans
              ns="learn/going-from-work-to-retirement"
              i18nKey="key-takeaways.life-chapters.second-career.content"
              components={{
                a: <MuiLink href={t('key-takeaways.life-chapters.second-career.link')} />,
              }}
            />
          </li>
          <li>
            <Trans
              ns="learn/going-from-work-to-retirement"
              i18nKey="key-takeaways.life-chapters.full-retirement.content"
              components={{
                a: <MuiLink href={t('key-takeaways.life-chapters.full-retirement.link')} />,
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
            ns="learn/going-from-work-to-retirement"
            i18nKey="combine-job-pensions-income.content-three.content"
            components={{
              a: <MuiLink href={t('combine-job-pensions-income.content-three.link')} />,
            }}
          />
        </p>

        <AlertCard>
          <Trans ns="learn/going-from-work-to-retirement" i18nKey="combine-job-pensions-income.smart-tip" />
        </AlertCard>

        <p>
          <Trans
            ns="learn/going-from-work-to-retirement"
            i18nKey="combine-job-pensions-income.content-four.content"
            components={{
              a: <MuiLink href={t('combine-job-pensions-income.content-four.link')} />,
            }}
          />
        </p>
        <p>
          <Trans
            ns="learn/going-from-work-to-retirement"
            i18nKey="combine-job-pensions-income.content-five.content"
            components={{
              a: <MuiLink href={t('combine-job-pensions-income.content-five.link')} />,
            }}
          />
        </p>
        <h3 id="combine-job-pensions-income-sub-heading-two" className="h3">
          {t('combine-job-pensions-income.sub-heading-two')}
        </h3>
        <p>{t('combine-job-pensions-income.content-six')}</p>
        <AlertCard type="disclaimer">
          <Trans ns="learn/going-from-work-to-retirement" i18nKey="combine-job-pensions-income.disclaimer" />
        </AlertCard>

        <h2 id="case-study" className="h2">
          {t('case-study.heading')}
        </h2>
        <h3 id="case-study-sub-heading-one" className="h3">
          {t('case-study.sub-heading')}
        </h3>
      </LearnPageLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn/going-from-work-to-retirement'], null, [
        'en',
        'fr',
      ])),
    },
  }
}

export default GoingFromWorkToRetirement
