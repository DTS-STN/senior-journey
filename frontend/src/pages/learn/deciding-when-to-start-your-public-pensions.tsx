import { FC, Fragment, useMemo } from 'react'

import { NavigateNext } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemText, Link as MuiLink, Paper, useMediaQuery } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import AccessibilityGraphContainer from '../../components/AccessibilityGraphContainer'
import AlertCard from '../../components/AlertCard'
import { LearnPageLayout } from '../../components/LearnPageLayout'
import theme from '../../theme'
import { getDCTermsTitle } from '../../utils/seo-utils'

const DecidingWhenToCollectPublicPensions: FC = () => {
  const { locale } = useRouter()
  const { t } = useTranslation(['learn/deciding-when-to-start-your-public-pensions', 'common'])

  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  function getImageSrc(imagePrefix: string, extension: string = 'png') {
    return `/assets/${imagePrefix}-${mobile ? 'mobile' : 'desktop'}-${locale ?? 'en'}.${extension}`
  }

  const learnMoreLinks = useMemo(
    () => [
      {
        href: '/learn/main-sources-of-retirement-income',
        primary: t('learn-more.main-sources-of-retirment-income.header'),
        secondary: t('learn-more.main-sources-of-retirment-income.description'),
      },
      {
        href: '/learn/rules-of-thumb-for-public-pensions',
        primary: t('learn-more.rules-of-thumb-for-public-pensions.header'),
        secondary: t('learn-more.rules-of-thumb-for-public-pensions.description'),
      },
      {
        href: '/learn/case-studies/fred',
        primary: t('learn-more.fred-case-study.header'),
        secondary: t('learn-more.fred-case-study.description'),
      },
      {
        href: '/learn/case-studies/bonnie',
        primary: t('learn-more.bonnie-case-study.header'),
        secondary: t('learn-more.bonnie-case-study.description'),
      },
    ],
    [t]
  )

  return (
    <>
      <NextSeo
        title={t('header')}
        description={t('meta.description')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
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
        <h2 id="key-takeaways" className="h2 h2-gutter-bottom">
          {t('key-takeaways.heading')}
        </h2>
        <List disablePadding>
          {[
            {
              primary: t('key-takeaways.highest-monthly-amount'),
              secondary: t('key-takeaways.start-collecting'),
            },
            {
              primary: t('key-takeaways.payment-increase'),
              secondary: t('key-takeaways.no-benefit'),
            },
            {
              primary: t('key-takeaways.people-who-qualify'),
              secondary: (
                <Trans
                  ns="learn/deciding-when-to-start-your-public-pensions"
                  i18nKey="key-takeaways.if-you-qualify"
                  components={{
                    a1: <MuiLink href={t('key-takeaways.if-you-qualify-a1')} />,
                    a2: <MuiLink href={t('key-takeaways.if-you-qualify-a2')} />,
                  }}
                />
              ),
            },
            {
              primary: t('key-takeaways.more-than-double'),
              secondary: t('key-takeaways.pensions-adjusted'),
            },
            {
              primary: t('key-takeaways.planning-retirement'),
              secondary: t('key-takeaways.common-law'),
            },
          ].map(({ primary, secondary }) => (
            <ListItem key={primary} className="border-b">
              <ListItemText
                primary={primary}
                primaryTypographyProps={{ className: 'font-medium text-xl font-display my-2' }}
                secondary={secondary}
                secondaryTypographyProps={{ className: 'text-base' }}
              />
            </ListItem>
          ))}
        </List>

        <h2 id="overview" className="h2 h2-gutter">
          {t('overview.heading')}
        </h2>
        <p>{t('overview.p1')}</p>
        <p>
          <Trans
            ns="learn/deciding-when-to-start-your-public-pensions"
            i18nKey="overview.p2"
            components={{ a1: <MuiLink href={t('overview.a1')} /> }}
          />
        </p>
        <p>{t('overview.p3')}</p>
        <p>{t('overview.p4')}</p>

        <h2 id="old-age-security" className="h2 h2-gutter">
          {t('old-age-security.heading')}
        </h2>
        <p>{t('old-age-security.content-one')}</p>
        <p>{t('old-age-security.content-two')}</p>

        <h3 className="h3 h3-gutter">{t('old-age-security.table-one.title')}</h3>

        <Paper variant="outlined" className="mb-6 overflow-x-auto">
          <table className="min-w-full border-collapse divide-y text-left">
            <thead className="bg-gray-surface">
              <tr className="divide-x">
                <th scope="col" className="px-3 py-2.5">
                  {t('old-age-security.table-one.header-one')}
                </th>
                <th scope="col" className="px-3 py-2.5">
                  {t('old-age-security.table-one.header-two')}
                </th>
                <th scope="col" className="px-3 py-2.5">
                  {t('old-age-security.table-one.header-three')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                {
                  col1: t('old-age-security.table-one.row-one.column-one-value'),
                  col2: t('old-age-security.table-one.row-one.column-two-value'),
                  col3: t('old-age-security.table-one.row-one.column-three-value'),
                },
                {
                  col1: t('old-age-security.table-one.row-two.column-one-value'),
                  col2: t('old-age-security.table-one.row-two.column-two-value'),
                  col3: t('old-age-security.table-one.row-two.column-three-value'),
                },
              ].map((row) => (
                <tr key={row.col1} className="divide-x">
                  <td className="px-3 py-2.5">{row.col1}</td>
                  <td className="px-3 py-2.5">{row.col2}</td>
                  <td className="px-3 py-2.5">{row.col3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>

        <Image
          alt={t('old-age-security.oas-delay.description')}
          src={getImageSrc('oas-delay')}
          width={842}
          height={519}
          className="w-full"
        />
        <p className="mt-2 rounded-lg bg-gray-surface p-4">{t('old-age-security.oas-delay.p')}</p>
        <AccessibilityGraphContainer
          tableData={{
            caption: t('old-age-security.oas-delay.accessibility.caption'),
            header: t('old-age-security.oas-delay.accessibility.header', { returnObjects: true }),
            rows: t('old-age-security.oas-delay.accessibility.rows', { returnObjects: true }),
          }}
          description={t('old-age-security.oas-delay.description')}
          buttonLabel={t('old-age-security.oas-delay.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />

        <p>{t('old-age-security.auto-increase.p1')}</p>
        <Image
          alt={t('old-age-security.auto-increase.description')}
          src={getImageSrc('oas-auto-increase')}
          width={842}
          height={519}
          className="w-full"
        />
        <p className="mt-2 rounded-lg bg-gray-surface p-4">{t('old-age-security.auto-increase.p2')}</p>
        <AccessibilityGraphContainer
          tableData={{
            caption: t('old-age-security.auto-increase.accessibility.caption'),
            header: t('old-age-security.auto-increase.accessibility.header', { returnObjects: true }),
            rows: t('old-age-security.auto-increase.accessibility.rows', { returnObjects: true }),
          }}
          description={t('old-age-security.auto-increase.description')}
          buttonLabel={t('old-age-security.auto-increase.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />

        <h3 className="h3 h3-gutter">{t('old-age-security.we-pay.heading')}</h3>
        <p>{t('old-age-security.we-pay.p')}</p>

        <h3 className="h3 h3-gutter">{t('old-age-security.high-income.heading')}</h3>
        <p>
          <Trans
            ns="learn/deciding-when-to-start-your-public-pensions"
            i18nKey="old-age-security.high-income.p"
            components={{ a1: <MuiLink href={t('old-age-security.high-income.a1')} /> }}
          />
        </p>

        <h2 id="cpp-pension" className="h2 h2-gutter">
          {t('cpp-pension.heading')}
        </h2>
        <p>
          <Trans
            ns="learn/deciding-when-to-start-your-public-pensions"
            i18nKey="cpp-pension.p1"
            components={{ a1: <MuiLink href={t('cpp-pension.a1')} /> }}
          />
        </p>
        <AlertCard type="tip">
          <Trans ns="learn/deciding-when-to-start-your-public-pensions" i18nKey="cpp-pension.smart-tip" />
        </AlertCard>
        <Image
          alt={t('cpp-pension.description')}
          src={getImageSrc('cpp-delay')}
          width={842}
          height={519}
          className="mt-2 w-full"
        />
        <p className="mt-2 rounded-lg bg-gray-surface p-4">{t('cpp-pension.p2')}</p>
        <AccessibilityGraphContainer
          tableData={{
            caption: t('cpp-pension.accessibility.caption'),
            header: t('cpp-pension.accessibility.header', { returnObjects: true }),
            rows: t('cpp-pension.accessibility.rows', { returnObjects: true }),
          }}
          description={t('cpp-pension.description')}
          buttonLabel={t('cpp-pension.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />
        <p>
          <Trans
            ns="learn/deciding-when-to-start-your-public-pensions"
            i18nKey="cpp-pension.p3"
            components={{ a2: <Link className="text-secondary-700 underline" href="/learn/case-studies/fred" /> }}
          />
        </p>
        <AlertCard type="disclaimer">
          <Trans ns="learn/deciding-when-to-start-your-public-pensions" i18nKey="cpp-pension.disclaimer" />
        </AlertCard>

        <h2 className="h2 h2-gutter">{t('learn-more.header')}</h2>
        <List disablePadding>
          {learnMoreLinks.map(({ href, primary, secondary }) => (
            <Fragment key={primary}>
              <ListItem disablePadding className="border-b">
                <ListItemButton href={href} component={Link}>
                  <ListItemText
                    primary={primary}
                    primaryTypographyProps={{
                      variant: 'subtitle1',
                      className: 'font-display font-medium underline underline-offset-4',
                      component: 'h3',
                    }}
                    secondary={secondary}
                  />
                  <NavigateNext color="primary" />
                </ListItemButton>
              </ListItem>
            </Fragment>
          ))}
        </List>
      </LearnPageLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'learn/deciding-when-to-start-your-public-pensions',
      ])),
    },
  }
}

export default DecidingWhenToCollectPublicPensions
