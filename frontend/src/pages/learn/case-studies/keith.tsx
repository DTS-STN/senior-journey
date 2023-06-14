import { FC, Fragment, useMemo } from 'react'

import { NavigateNext } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemText, Link as MuiLink, useMediaQuery } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import AccessibilityGraphContainer from '../../../components/AccessibilityGraphContainer'
import AlertCard from '../../../components/AlertCard'
import { LearnPageLayout } from '../../../components/LearnPageLayout'
import theme from '../../../theme'
import { getDCTermsTitle } from '../../../utils/seo-utils'

const Keith: FC = () => {
  const { locale } = useRouter()
  const { t } = useTranslation('learn/case-studies/keith')

  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  function getImageSrc(imagePrefix: string, extension: string = 'png') {
    return `/assets/${imagePrefix}-${mobile ? 'mobile' : 'desktop'}-${locale ?? 'en'}.${extension}`
  }

  const learnMoreLinks = useMemo(
    () => [
      {
        href: '/learn/going-from-work-to-retirement',
        primary: t('learn-more.going-from-work-to-retirement.header'),
        secondary: t('learn-more.going-from-work-to-retirement.description'),
      },
      {
        href: '/learn/rules-of-thumb-for-public-pensions',
        primary: t('learn-more.rules-of-thumb-for-public-pensions.header'),
        secondary: t('learn-more.rules-of-thumb-for-public-pensions.description'),
      },
      {
        href: t('learn-more.cpp-prb.href'),
        primary: t('learn-more.cpp-prb.header'),
        secondary: t('learn-more.cpp-prb.description'),
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
            },
            {
              primary: t('key-takeaways.li4'),
              secondary: t('key-takeaways.li5'),
            },
            {
              primary: t('key-takeaways.li6'),
              secondary: t('key-takeaways.li7'),
            },
            {
              primary: t('key-takeaways.li8'),
              secondary: t('key-takeaways.li9'),
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
            ns="learn/case-studies/keith"
            i18nKey="key-takeaways.smart-tip"
            components={{ a1: <MuiLink href={t('key-takeaways.a1')} />, a2: <MuiLink href={t('key-takeaways.a2')} /> }}
          />
        </AlertCard>

        <h2 id="overview" className="h2">
          {t('overview.heading')}
        </h2>
        <p>{t('overview.p1')}</p>

        <h2 id="how-did-keith" className="h2">
          {t('cpp-oas.heading')}
        </h2>
        <p>{t('cpp-oas.p1')}</p>
        <p>
          <Trans
            ns="learn/case-studies/keith"
            i18nKey="cpp-oas.p2"
            components={{ a1: <MuiLink href={t('cpp-oas.a1')} /> }}
          />
        </p>

        <h2 id="prb" className="h2">
          {t('cpp.prb.heading')}
        </h2>
        <p>
          <Trans
            ns="learn/case-studies/keith"
            i18nKey="cpp.prb.p1"
            components={{ a1: <MuiLink href={t('cpp.prb.a1')} /> }}
          />
        </p>

        <h2 id="prb-choices" className="h2">
          {t('cpp.prb-choices.heading')}
        </h2>
        <p>
          <Trans ns="learn/case-studies/fred" i18nKey={t(`cpp.prb-choices.list.li1`)} />
        </p>
        <p>
          <Trans ns="learn/case-studies/fred" i18nKey={t(`cpp.prb-choices.list.li2`)} />
        </p>
        <p>
          <Trans ns="learn/case-studies/fred" i18nKey={t(`cpp.prb-choices.list.li3`)} />
        </p>
        <p>
          <Trans ns="learn/case-studies/fred" i18nKey={t(`cpp.prb-choices.list.li4`)} />
        </p>

        <h2 id="cpp-choices" className="h2">
          {t('cpp.cpp-choices.heading')}
        </h2>
        <Image
          alt={t('cpp.cpp-choices.description')}
          src={getImageSrc('keith-cpp-70')}
          width={842}
          height={519}
          className="w-full"
        />
        <div className="grid grid-cols-1 py-4 md:grid-cols-2 md:text-center">
          <div>
            <p>{t('cpp.cpp-choices.choices.li1')}</p>
            <p>{t('cpp.cpp-choices.choices.li2')}</p>
          </div>
          <div>
            <p>{t('cpp.cpp-choices.choices.li3')}</p>
            <p>{t('cpp.cpp-choices.choices.li4')}</p>
          </div>
        </div>
        <AccessibilityGraphContainer
          tableData={{
            caption: t('cpp.cpp-choices.accessibility.caption'),
            header: t<string, Array<string>>('cpp.cpp-choices.accessibility.header', {
              returnObjects: true,
            }),
            rows: t<string, Array<{ data: Array<string> }>>('cpp.cpp-choices.accessibility.rows', {
              returnObjects: true,
            }),
          }}
          description={t('cpp.cpp-choices.description')}
          buttonLabel={t('cpp.cpp-choices.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />
        <p>{t('cpp.cpp-choices.p1')}</p>
        <p>{t('cpp.cpp-choices.p2')}</p>

        <h2 id="what-else" className="h2">
          {t('cpp.what-else.heading')}
        </h2>
        <p>{t('cpp.what-else.p1')}</p>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          {[t('cpp.what-else.list.li1'), t('cpp.what-else.list.li2')].map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>

        <p>{t('cpp.what-else.p2')}</p>
        <AlertCard type="tip">
          <Trans
            ns="learn/case-studies/keith"
            i18nKey="cpp.what-else.smart-tip.content"
            components={{
              a1: <MuiLink href={t('cpp.what-else.smart-tip.link-one')} />,
              a2: <MuiLink href={t('cpp.what-else.smart-tip.link-two')} />,
            }}
          />
        </AlertCard>

        <h2 id="keith-pension-87" className="h2">
          {t('cpp.keith-pension-87.heading')}
        </h2>
        <p>{t('cpp.keith-pension-87.p1')}</p>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          {[t('cpp.keith-pension-87.li1'), t('cpp.keith-pension-87.li2')].map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>

        <Image
          alt={t('cpp.keith-pension-87.description')}
          src={getImageSrc('keith-cpp-87')}
          width={842}
          height={519}
          className="w-full"
        />
        <div className="grid grid-cols-1 py-4 md:grid-cols-2 md:text-center">
          <div>
            <p>{t('cpp.keith-pension-87.choices.li1')}</p>
            <p>{t('cpp.keith-pension-87.choices.li2')}</p>
          </div>
          <div>
            <p>{t('cpp.keith-pension-87.choices.li3')}</p>
            <p>{t('cpp.keith-pension-87.choices.li4')}</p>
          </div>
        </div>
        <AccessibilityGraphContainer
          tableData={{
            caption: t('cpp.keith-pension-87.accessibility.caption'),
            header: t<string, Array<string>>('cpp.keith-pension-87.accessibility.header', {
              returnObjects: true,
            }),
            rows: t<string, Array<{ data: Array<string> }>>('cpp.keith-pension-87.accessibility.rows', {
              returnObjects: true,
            }),
          }}
          description={t('cpp.keith-pension-87.description')}
          buttonLabel={t('cpp.keith-pension-87.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />
        <p>{t('cpp.keith-pension-87.p2')}</p>

        <h2 id="keith-pension-90" className="h2">
          {t('cpp.keith-pension-90.heading')}
        </h2>
        <p>{t('cpp.keith-pension-90.p1')}</p>
        <Image
          alt={t('cpp.keith-pension-90.description')}
          src={getImageSrc('keith-cpp-90')}
          width={842}
          height={519}
          className="w-full"
        />
        <div className="grid grid-cols-1 py-4 md:grid-cols-2 md:text-center">
          <div>
            <p>{t('cpp.keith-pension-90.choices.li1')}</p>
            <p>{t('cpp.keith-pension-90.choices.li2')}</p>
          </div>
          <div>
            <p>{t('cpp.keith-pension-90.choices.li3')}</p>
            <p>{t('cpp.keith-pension-90.choices.li4')}</p>
          </div>
        </div>
        <AccessibilityGraphContainer
          tableData={{
            caption: t('cpp.keith-pension-90.accessibility.caption'),
            header: t<string, Array<string>>('cpp.keith-pension-90.accessibility.header', {
              returnObjects: true,
            }),
            rows: t<string, Array<{ data: Array<string> }>>('cpp.keith-pension-90.accessibility.rows', {
              returnObjects: true,
            }),
          }}
          description={t('cpp.keith-pension-90.description')}
          buttonLabel={t('cpp.keith-pension-90.accessibility.button-label')}
          descriptionHeading={t('description-heading')}
          valuesHeading={t('values-heading')}
        />
        <p>{t('cpp.keith-pension-90.p4')}</p>

        <h2 id="oas" className="h2">
          {t('oas.heading')}
        </h2>
        <p>
          <Trans
            ns="learn/case-studies/keith"
            i18nKey="oas.p1"
            components={{
              a1: <MuiLink href={t('oas.gis-link')} />,
              a2: <MuiLink href={t('oas.low-income-link')} />,
            }}
          />
        </p>
        <p>
          <Trans ns="learn/case-studies/keith" i18nKey="oas.p2" />
        </p>
        <p>
          <Trans
            ns="learn/case-studies/keith"
            i18nKey="oas.p3"
            components={{
              a3: <MuiLink component={Link} href="/learn/case-studies/fred" />,
            }}
          />
        </p>

        <h2 id="conclusion" className="h2">
          {t('conclusion.heading')}
        </h2>
        <p>{t('conclusion.p1')}</p>
        <p>{t('conclusion.p2')}</p>
        <p>{t('conclusion.p3')}</p>
        <AlertCard type="disclaimer">
          <Trans ns="learn/case-studies/keith" i18nKey="conclusion.disclaimer" />
        </AlertCard>

        <h2 className="h2">{t('learn-more.header')}</h2>
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
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn/case-studies/keith'])),
    },
  }
}

export default Keith
