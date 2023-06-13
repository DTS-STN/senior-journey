import { FC, Fragment, useMemo } from 'react'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { List, ListItem, ListItemButton, ListItemText, Link as MuiLink } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import AlertCard from '../../components/AlertCard'
import { LearnPageLayout } from '../../components/LearnPageLayout'
import { getDCTermsTitle } from '../../utils/seo-utils'

const PlanningToSaveForRetirement: FC = () => {
  const { t, i18n } = useTranslation('learn/planning-to-save-for-retirement')
  const en = i18n.getFixedT('en', 'learn/planning-to-save-for-retirement')
  const fr = i18n.getFixedT('fr', 'learn/planning-to-save-for-retirement')

  const learnMoreLinks = useMemo(
    () => [
      {
        href: '/learn/main-sources-of-retirement-income',
        primary: t('learn-more.main-sources-of-retirment-income.header'),
        secondary: t('learn-more.main-sources-of-retirment-income.description'),
      },
      {
        href: '/learn/going-from-work-to-retirement',
        primary: t('learn-more.going-from-work-to-retirement.header'),
        secondary: t('learn-more.going-from-work-to-retirement.description'),
      },
      {
        href: t('learn-more.budget-planner.href'),
        primary: t('learn-more.budget-planner.header'),
        secondary: t('learn-more.budget-planner.description'),
      },
      {
        href: t('learn-more.saving-for-retirement.href'),
        primary: t('learn-more.saving-for-retirement.header'),
        secondary: t('learn-more.saving-for-retirement.description'),
      },
    ],
    [t]
  )

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
        <List disablePadding>
          {[
            {
              primary: t('key-takeaways.li1'),
              secondary: t('key-takeaways.li2'),
            },
            {
              primary: t('key-takeaways.li3'),
              secondary: t('key-takeaways.li4'),
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

        <h2 id="overview" className="h2">
          {t('overview.heading')}
        </h2>
        <p>{t('overview.p')}</p>

        <h2 id="how-much" className="h2">
          {t('how-much.heading')}
        </h2>
        <p>
          <Trans
            ns="learn/planning-to-save-for-retirement"
            i18nKey="how-much.p1"
            components={{
              a1: <MuiLink href={t('how-much.a1')} />,
              a2: <MuiLink href={t('how-much.a2')} />,
            }}
          />
        </p>

        <p>
          <Trans
            ns="learn/planning-to-save-for-retirement"
            i18nKey="how-much.p2"
            components={{
              a3: <MuiLink href={t('how-much.a3')} />,
            }}
          />
        </p>
        <p>
          <Trans
            ns="learn/planning-to-save-for-retirement"
            i18nKey="how-much.p3"
            components={{
              a4: <MuiLink href={t('how-much.a4')} />,
            }}
          />
        </p>

        <h2 id="changes-with-age" className="h2">
          {t('changes-with-age.heading')}
        </h2>
        <p>{t('changes-with-age.p1')}</p>
        <p>{t('changes-with-age.p2')}</p>
        <AlertCard type="disclaimer">
          <Trans ns="learn/planning-to-save-for-retirement" i18nKey="changes-with-age.disclaimer" />
        </AlertCard>

        <h2 className="h2">
          {t('learn-more.heading')}
        </h2>
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
                  <NavigateNextIcon color="primary" />
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
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn/planning-to-save-for-retirement'], null, [
        'en',
        'fr',
      ])),
    },
  }
}

export default PlanningToSaveForRetirement
