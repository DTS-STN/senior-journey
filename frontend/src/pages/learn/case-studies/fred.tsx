import { FC, Fragment, useMemo } from 'react'

import { NavigateNext } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemText, useMediaQuery } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import AccessibilityGraphContainer from '../../../components/AccessibilityGraphContainer'
import AlertCard from '../../../components/AlertCard'
import { LearnPageLayout } from '../../../components/LearnPageLayout'
import theme from '../../../theme'
import { getDCTermsTitle } from '../../../utils/seo-utils'

const Fred: FC = () => {
  const { t, i18n } = useTranslation('learn/case-studies/fred')
  const en = i18n.getFixedT('en', 'learn/case-studies/fred')
  const fr = i18n.getFixedT('fr', 'learn/case-studies/fred')

  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const learnMoreLinks = useMemo(
    () => [
      {
        href: '/learn/deciding-when-to-collect-public-pensions',
        primary: t('learn-more.deciding-when-to-take-your-pensions.header'),
        secondary: t('learn-more.deciding-when-to-take-your-pensions.description'),
      },
      {
        href: '/learn/rules-of-thumb-for-public-pensions',
        primary: t('learn-more.rules-of-thumb-for-public-pensions.header'),
        secondary: t('learn-more.rules-of-thumb-for-public-pensions.description'),
      },
      {
        href: t('learn-more.oas.href'),
        primary: t('learn-more.oas.header'),
        secondary: t('learn-more.oas.description'),
      },
      {
        href: t('learn-more.cpp.href'),
        primary: t('learn-more.cpp.header'),
        secondary: t('learn-more.cpp.description'),
      },
    ],
    [t]
  )

  const Img = ({ pension, classes }: { pension: string; classes?: string }) => (
    <Image
      alt={t(`${pension}.description`)}
      src={t(`${pension}.img-url.${mobile ? 'mobile' : 'desktop'}`)}
      width={842}
      height={519}
      className={`w-full ${classes}`}
    />
  )

  return (
    <>
      <NextSeo title={t('header')} additionalMetaTags={[getDCTermsTitle(en('header'), fr('header'))]} />
      <LearnPageLayout
        header={t('header')}
        breadcrumbItems={[
          {
            link: t('breadcrumbs.home.link'),
            text: t('breadcrumbs.home.text'),
          },
          {
            link: t('breadcrumbs.learn.link'),
            text: t('breadcrumbs.learn.text'),
          },
        ]}
      >
        <NextSeo title={t('header')} />

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
              secondary: t('key-takeaways.li6'),
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
        <p>{t('overview.p1')}</p>
        <p>{t('overview.p2')}</p>

        <h2 id="fred-cpp" className="h2">
          {t('cpp.heading')}
        </h2>
        <Img pension="cpp.monthly-pension" />
        <p>{t('cpp.monthly-pension.p')}</p>
        <AccessibilityGraphContainer
          tableData={t('cpp.monthly-pension.accessibility', { returnObjects: true })}
          description={t('cpp.monthly-pension.description')}
          buttonLabel={t('cpp.monthly-pension.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />
        <AlertCard type="tip">
          <Trans ns="learn/case-studies/fred" i18nKey="cpp.smart-tip" />
        </AlertCard>
        <Img pension="cpp.lifetime-pension" classes="mt-10 mb-5" />
        <p>{t('cpp.lifetime-pension.p')}</p>
        <AccessibilityGraphContainer
          tableData={t('cpp.lifetime-pension.accessibility', { returnObjects: true })}
          description={t('cpp.lifetime-pension.description')}
          buttonLabel={t('cpp.lifetime-pension.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />
        <p>{t('cpp.p1')}</p>
        <p>{t('cpp.p2')}</p>
        <p>{t('cpp.p3')}</p>

        <h2 id="fred-oas" className="h2">
          {t('oas.heading')}
        </h2>
        <p>{t('oas.p')}</p>
        <Img pension="oas.monthly-pension" />
        <p>{t('oas.monthly-pension.p')}</p>
        <AccessibilityGraphContainer
          tableData={t('oas.monthly-pension.accessibility', { returnObjects: true })}
          description={t('oas.monthly-pension.description')}
          buttonLabel={t('oas.monthly-pension.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />
        <p>{t('oas.lifetime-pension.p1')}</p>
        <Img pension="oas.lifetime-pension" classes="mb-5" />
        <p>{t('oas.lifetime-pension.p2')}</p>
        <AccessibilityGraphContainer
          tableData={t('oas.lifetime-pension.accessibility', { returnObjects: true })}
          description={t('oas.lifetime-pension.description')}
          buttonLabel={t('oas.lifetime-pension.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />
        <p>{t('oas.p1')}</p>
        <p>{t('oas.p2')}</p>

        <AlertCard type="disclaimer">
          <Trans ns="learn/case-studies/fred" i18nKey="disclaimer" />
        </AlertCard>

        <h2 id="learn-more" className="h2">
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
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn/case-studies/fred'], null, ['en', 'fr'])),
    },
  }
}

export default Fred
