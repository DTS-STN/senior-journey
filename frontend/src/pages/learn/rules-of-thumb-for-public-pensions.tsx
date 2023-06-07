import { FC, Fragment, useMemo } from 'react'

import { NavigateNext } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemText, Link as MuiLink } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import AlertCard from '../../components/AlertCard'
import { LearnPageLayout } from '../../components/LearnPageLayout'
import { getDCTermsTitle } from '../../utils/seo-utils'

const RulesOfThumbForPublicPensions: FC = () => {
  const { t, i18n } = useTranslation('learn/rules-of-thumb-for-public-pensions')
  const en = i18n.getFixedT('en', 'learn/rules-of-thumb-for-public-pensions')
  const fr = i18n.getFixedT('fr', 'learn/rules-of-thumb-for-public-pensions')

  const learnMoreLinks = useMemo(
    () => [
      {
        href: '/learn/main-sources-of-retirement-income',
        primary: t('learn-more.main-sources-of-retirement-income.header'),
        secondary: t('learn-more.main-sources-of-retirement-income.description'),
      },
      {
        href: '/learn/planning-to-save-for-retirement',
        primary: t('learn-more.planning-to-save-for-retirement.header'),
        secondary: t('learn-more.planning-to-save-for-retirement.description'),
      },
      {
        href: '/learn/going-from-work-to-retirement',
        primary: t('learn-more.going-from-work-to-retirement.header'),
        secondary: t('learn-more.going-from-work-to-retirement.description'),
      },
      {
        href: '/learn/deciding-when-to-start-your-public-pensions',
        primary: t('learn-more.deciding-when-to-start.header'),
        secondary: t('learn-more.deciding-when-to-start.description'),
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
            {
              primary: t('key-takeaways.li5'),
              secondary: (
                <Trans
                  ns="learn/rules-of-thumb-for-public-pensions"
                  i18nKey="key-takeaways.li6"
                  components={{
                    a1: <MuiLink href={t('key-takeaways.li6-a1')} />,
                    a2: <MuiLink href={t('key-takeaways.li6-a2')} />,
                  }}
                />
              ),
            },
            {
              primary: t('key-takeaways.li7'),
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
        <AlertCard type="tip" className="mb-5">
          <Trans
            ns="learn/rules-of-thumb-for-public-pensions"
            i18nKey="overview.smart-tip"
            components={{
              a1: <MuiLink href={t('overview.a1')} />,
              a2: <MuiLink href={t('overview.a2')} />,
            }}
          />
        </AlertCard>
        <p>{t('overview.p1')}</p>
        <p>{t('overview.p2')}</p>
        <p>{t('overview.p3')}</p>

        <h2 id="cpp" className="h2">
          {t('cpp.heading')}
        </h2>
        <p>{t('cpp.p1')}</p>
        <p>{t('cpp.p2')}</p>
        <h3 className="h3">{t('cpp.sub-heading-one')}</h3>
        <ul className="list-disc space-y-1 pl-7">
          <li>
            <Trans
              ns="learn/rules-of-thumb-for-public-pensions"
              i18nKey="cpp.li1"
              components={{ a1: <MuiLink href={t('cpp.a1')} /> }}
            />
          </li>
          <li>{t('cpp.li2')}</li>
          <li>{t('cpp.li3')}</li>
          <li>{t('cpp.li4')}</li>
          <li>{t('cpp.li5')}</li>
          <li>{t('cpp.li6')}</li>
          <li>{t('cpp.li7')}</li>
          <li>{t('cpp.li8')}</li>
        </ul>
        <AlertCard type="tip" className="mt-5">
          <Trans ns="learn/rules-of-thumb-for-public-pensions" i18nKey="cpp.smart-tip" />
        </AlertCard>
        <h3 className="h3">{t('cpp.sub-heading-two')}</h3>
        <ul className="list-disc space-y-1 pl-7">
          <li>{t('cpp.li9')}</li>
          <li>{t('cpp.li10')}</li>
          <li>{t('cpp.li11')}</li>
          <li>{t('cpp.li12')}</li>
          <li>{t('cpp.li13')}</li>
          <li>{t('cpp.li14')}</li>
          <li>{t('cpp.li15')}</li>
          <li>{t('cpp.li16')}</li>
        </ul>

        <h2 id="oas" className="h2">
          {t('oas.heading')}
        </h2>
        <p>{t('oas.p1')}</p>
        <h3 className="h3">{t('oas.sub-heading-one')}</h3>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          <li>
            <Trans
              ns="learn/rules-of-thumb-for-public-pensions"
              i18nKey="oas.li1"
              components={{ a1: <MuiLink href={t('oas.a1')} /> }}
            />
          </li>
          <li>{t('oas.li2')}</li>
          <li>{t('oas.li3')}</li>
        </ul>
        <AlertCard type="tip">
          <p>
            <Trans ns="learn/rules-of-thumb-for-public-pensions" i18nKey="oas.smart-tip-p1" />
          </p>
          <p>
            <Trans
              ns="learn/rules-of-thumb-for-public-pensions"
              i18nKey="oas.smart-tip-p2"
              components={{ a2: <MuiLink href={t('oas.a2')} /> }}
            />
          </p>
        </AlertCard>
        <h3 className="h3">{t('oas.sub-heading-two')}</h3>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          <li>{t('oas.li4')}</li>
          <li>{t('oas.li5')}</li>
          <li>{t('oas.li6')}</li>
          <li>{t('oas.li7')}</li>
        </ul>

        <AlertCard type="disclaimer">
          <Trans ns="learn/rules-of-thumb-for-public-pensions" i18nKey="oas.disclaimer" />
        </AlertCard>

        <h2 className="h2">
          {t('learn-more.header')}
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
                      className: 'font-display font-medium',
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
      ...(await serverSideTranslations(
        locale ?? 'default',
        ['common', 'learn/rules-of-thumb-for-public-pensions'],
        null,
        ['en', 'fr']
      )),
    },
  }
}

export default RulesOfThumbForPublicPensions
