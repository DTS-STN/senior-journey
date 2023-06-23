import { FC, Fragment, useMemo } from 'react'

import { NavigateNext } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemText, Link as MuiLink } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import AlertCard from '../../components/AlertCard'
import { LearnPageLayout } from '../../components/LearnPageLayout'
import { pageWithServerSideTranslations } from '../../utils/next-i18next-utils'
import { getDCTermsTitle } from '../../utils/seo-utils'

const GoingFromWorkToRetirement: FC = () => {
  const { t } = useTranslation(['learn/going-from-work-to-retirement', 'common'])

  const learnMoreLinks = useMemo(
    () => [
      {
        href: t('learn-more.working-while-collecting.href'),
        primary: t('learn-more.working-while-collecting.header'),
        secondary: t('learn-more.working-while-collecting.description'),
      },
      {
        href: '/learn/deciding-when-to-start-your-public-pensions',
        primary: t('learn-more.deciding-when-to-start.header'),
        secondary: t('learn-more.deciding-when-to-start.description'),
      },
      {
        href: '/learn/rules-of-thumb-for-public-pensions',
        primary: t('learn-more.rules-of-thumb.header'),
        secondary: t('learn-more.rules-of-thumb.description'),
      },
      {
        href: '/learn/case-studies/keith',
        primary: t('learn-more.keith-case-study.header'),
        secondary: t('learn-more.keith-case-study.description'),
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
              secondary: t('key-takeaways.if-you-qualify'),
            },
            {
              primary: t('key-takeaways.more-than-double'),
              secondary: t('key-takeaways.pensions-adjusted'),
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
        <AlertCard type="tip" className="mt-5">
          <Trans
            ns="learn/going-from-work-to-retirement"
            i18nKey="key-takeaways.smart-tip"
            components={{
              a1: <MuiLink component={Link} href={t('key-takeaways.low-income-link')} />,
              a2: <MuiLink component={Link} href={t('key-takeaways.gis-link')} />,
            }}
          />
        </AlertCard>

        <h2 id="overview" className="h2 h2-gutter">
          {t('overview.heading')}
        </h2>
        <p>{t('overview.p1')}</p>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          <li>{t('overview.li1')}</li>
          <li>{t('overview.li2')}</li>
          <li>{t('overview.li3')}</li>
        </ul>
        <p>{t('overview.p2')}</p>

        <h2 id="phased-retirement" className="h2 h2-gutter">
          {t('phased-retirement.heading')}
        </h2>
        <h3 className="h3 h3-gutter">{t('phased-retirement.transition')}</h3>
        <p>{t('phased-retirement.p1')}</p>
        <p>{t('phased-retirement.p2')}</p>

        <h2 id="second-career" className="h2 h2-gutter">
          {t('second-career.heading')}
        </h2>
        <h3 className="h3 h3-gutter">{t('second-career.new-beginning')}</h3>
        <p>{t('second-career.p1')}</p>

        <h2 id="full-retirement" className="h2 h2-gutter">
          {t('full-retirement.heading')}
        </h2>
        <h3 className="h3 h3-gutter">{t('full-retirement.hanging-you-hat')}</h3>
        <p>{t('full-retirement.p1')}</p>

        <h2 id="combine-income" className="h2 h2-gutter">
          {t('combine-income.heading')}
        </h2>
        <p>{t('combine-income.p1')}</p>
        <h3 className="h3 h3-gutter">{t('combine-income.option-1.heading')}</h3>
        <p>{t('combine-income.option-1.p1')}</p>
        <p>{t('combine-income.option-1.p2')}</p>
        <p>{t('combine-income.option-1.p3')}</p>
        <p>{t('combine-income.option-1.p4')}</p>
        <p>{t('combine-income.option-1.p5')}</p>
        <p>
          <Trans
            ns="learn/going-from-work-to-retirement"
            i18nKey="combine-income.option-1.p6"
            components={{
              a1: <MuiLink component={Link} href={t('combine-income.option-1.post-retirement-benefits-link')} />,
            }}
          />
        </p>
        <p>
          <Trans
            ns="learn/going-from-work-to-retirement"
            i18nKey="combine-income.option-1.p7"
            components={{
              a2: <MuiLink component={Link} href="/learn/case-studies/keith" />,
            }}
          />
        </p>
        <p>
          <Trans
            ns="learn/going-from-work-to-retirement"
            i18nKey="combine-income.option-1.p8"
            components={{
              a3: <MuiLink component={Link} href="/learn/main-sources-of-retirement-income" />,
            }}
          />
        </p>

        <h3 className="h3 h3-gutter">{t('combine-income.option-2.heading')}</h3>
        <p>{t('combine-income.option-2.p1')}</p>
        <p>{t('combine-income.option-2.p2')}</p>
        <AlertCard type="important" className="mb-5">
          <Trans
            ns="learn/going-from-work-to-retirement"
            i18nKey="combine-income.option-2.important"
            components={{
              a1: <MuiLink component={Link} href={t('combine-income.option-2.oas-tax-link')} />,
            }}
          />
        </AlertCard>
        <p>{t('combine-income.option-2.p3')}</p>
        <p>
          <Trans
            ns="learn/going-from-work-to-retirement"
            i18nKey="combine-income.option-2.p4"
            components={{
              a1: <MuiLink component={Link} href="/learn/case-studies/bonnie" />,
            }}
          />
        </p>
        <AlertCard type="disclaimer" className="mt-5">
          <Trans ns="learn/going-from-work-to-retirement" i18nKey="combine-income.option-2.disclaimer" />
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
      ...(await pageWithServerSideTranslations(locale, 'learn/going-from-work-to-retirement')),
    },
  }
}

export default GoingFromWorkToRetirement
