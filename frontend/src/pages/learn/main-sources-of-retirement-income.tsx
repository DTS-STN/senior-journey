import { FC, Fragment, useMemo } from 'react'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { List, ListItem, ListItemButton, ListItemText, Link as MuiLink, useMediaQuery } from '@mui/material'
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

const MainSourcesOfRetirementIncome: FC = () => {
  const { locale } = useRouter()
  const { t, i18n } = useTranslation('learn/main-sources-of-retirement-income')
  const en = i18n.getFixedT('en', 'learn/main-sources-of-retirement-income')
  const fr = i18n.getFixedT('fr', 'learn/main-sources-of-retirement-income')

  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  function getImageSrc(imagePrefix: string, extension: string = 'png') {
    return `/assets/${imagePrefix}-${mobile ? 'mobile' : 'desktop'}-${locale ?? 'en'}.${extension}`
  }

  const learnMoreLinks = useMemo(
    () => [
      {
        href: '/learn/deciding-when-to-start-your-public-pensions',
        primary: t('learn-more.when-to-start.header'),
        secondary: t('learn-more.when-to-start.description'),
      },
      {
        href: '/learn/going-from-work-to-retirement',
        primary: t('learn-more.going-from-work-to-retirement.header'),
        secondary: t('learn-more.going-from-work-to-retirement.description'),
      },
      {
        href: t('learn-more.savings-and-pension.href'),
        primary: t('learn-more.savings-and-pension.header'),
        secondary: t('learn-more.savings-and-pension.description'),
      },
      {
        href: t('learn-more.income-calculator.href'),
        primary: t('learn-more.income-calculator.header'),
        secondary: t('learn-more.income-calculator.description'),
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
          {t('key-takeaways.header')}
        </h2>
        <List disablePadding>
          {[
            {
              primary: t('key-takeaways.cpp-oas.header'),
              secondary: t('key-takeaways.cpp-oas.description'),
            },
            {
              primary: t('key-takeaways.cpp-part-of-plan.header'),
              secondary: t('key-takeaways.cpp-part-of-plan.description'),
            },
            {
              primary: t('key-takeaways.cpp-oas-available.header'),
            },
            {
              primary: t('key-takeaways.cpp-oas-adjusted-for-inflation.header'),
              secondary: t('key-takeaways.cpp-oas-adjusted-for-inflation.description'),
            },
            {
              primary: t('key-takeaways.not-need-to-stop-working.header'),
              secondary: t('key-takeaways.not-need-to-stop-working.description'),
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
          {t('overview.header')}
        </h2>
        <p>{t('overview.overview')}</p>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          <li>{t('overview.list.oas-and-gis')}</li>
          <li>{t('overview.list.cpp')}</li>
          <li>{t('overview.list.earnings')}</li>
          <li>{t('overview.list.workplace')}</li>
          <li>{t('overview.list.savings-and-investments')}</li>
        </ul>
        <p>{t('overview.qpp')}</p>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="overview.learn-more.content"
            components={{ a: <MuiLink href={t('overview.learn-more.link')} /> }}
          />
        </p>

        <h3 id="canada-retirement-income-system" className="h3">
          {t('overview.canada-retirement-income-system.header')}
        </h3>
        <h3 className="mb-6 bg-primary-600 p-4 font-display text-2xl font-bold text-white">
          {t('overview.canada-retirement-income-system.three-pillar-system')}
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex h-full flex-col gap-6 md:col-span-2">
            <h4 className="bg-secondary-700 p-4 font-display text-xl font-light text-white">
              {t('overview.canada-retirement-income-system.public')}
            </h4>
            <div className="grid h-full gap-6 md:grid-cols-2">
              <div className="h-full bg-secondary-100 p-4">
                <h5 className="mb-2.5 font-display text-sm font-light tracking-widest">
                  {t('overview.canada-retirement-income-system.oas.pillar')}
                </h5>
                <p className="mb-2.5 font-bold">{t('overview.canada-retirement-income-system.oas.header')}</p>
                <p className="text-sm">{t('overview.canada-retirement-income-system.oas.content')}</p>
              </div>
              <div className="h-full bg-secondary-100 p-4">
                <h5 className="mb-2.5 font-display text-sm font-light tracking-widest">
                  {t('overview.canada-retirement-income-system.cpp-qpp.pillar')}
                </h5>
                <p className="mb-2.5 font-bold">{t('overview.canada-retirement-income-system.cpp-qpp.header')}</p>
                <p className="text-sm">{t('overview.canada-retirement-income-system.cpp-qpp.content')}</p>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col gap-6">
            <h4 className="bg-[#4A0056] p-4 font-display text-xl font-light text-white">
              {t('overview.canada-retirement-income-system.private')}
            </h4>
            <div className="h-full bg-[#F0D0FF] p-4">
              <h5 className="mb-2.5 font-display text-sm font-light tracking-widest">
                {t('overview.canada-retirement-income-system.workplace.pillar')}
              </h5>
              <p className="mb-2.5 font-bold">{t('overview.canada-retirement-income-system.workplace.header')}</p>
              <p className="text-sm">{t('overview.canada-retirement-income-system.workplace.content')}</p>
            </div>
          </div>
          <p className="md:col-span-3">
            <Trans
              ns="learn/main-sources-of-retirement-income"
              i18nKey="overview.canada-retirement-income-system.read-case-bonnie.content"
              components={{
                a: (
                  <MuiLink
                    component={Link}
                    href={t('overview.canada-retirement-income-system.read-case-bonnie.link')}
                  />
                ),
              }}
            />
          </p>
          <AlertCard className="md:col-span-3" type="important">
            <Trans
              ns="learn/main-sources-of-retirement-income"
              i18nKey="overview.canada-retirement-income-system.important-notice"
            />
          </AlertCard>
        </div>

        <h2 id="old-age-security-program" className="h2">
          {t('old-age-security-program.header')}
        </h2>
        <h3 className="h3">{t('old-age-security-program.qualify.header')}</h3>
        <p>{t('old-age-security-program.qualify.most-people')}</p>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="old-age-security-program.qualify.also-eligible.content"
            components={{ a: <MuiLink href={t('old-age-security-program.qualify.also-eligible.link')} /> }}
          />
        </p>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="old-age-security-program.qualify.more-details.content"
            components={{ a: <MuiLink href={t('old-age-security-program.qualify.more-details.link')} /> }}
          />
        </p>

        <h3 className="h3">{t('old-age-security-program.how-much.header')}</h3>
        <p>{t('old-age-security-program.how-much.eligible')}</p>
        <p>{t('old-age-security-program.how-much.smaller')}</p>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="old-age-security-program.how-much.start.content"
            components={{ a: <MuiLink component={Link} href={t('old-age-security-program.how-much.start.link')} /> }}
          />
        </p>

        <h4 className="h4 mb-4 text-xl">{t('old-age-security-program.helpful-resources.header')}</h4>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          {[
            {
              href: t('old-age-security-program.helpful-resources.overview.link'),
              primary: t('old-age-security-program.helpful-resources.overview.content'),
            },
            {
              href: t('old-age-security-program.helpful-resources.oas-how-much.link'),
              primary: t('old-age-security-program.helpful-resources.oas-how-much.content'),
            },
            {
              href: t('old-age-security-program.helpful-resources.oas-estimator.link'),
              primary: t('old-age-security-program.helpful-resources.oas-estimator.content'),
            },
          ].map(({ href, primary }) => (
            <li key={primary}>
              <MuiLink href={href}>{primary}</MuiLink>
            </li>
          ))}
        </ul>

        <h2 id="guaranteed-income-supplement" className="h2">
          {t('guaranteed-income-supplement.header')}
        </h2>
        <p>{t('guaranteed-income-supplement.overview')}</p>
        <p>{t('guaranteed-income-supplement.qualify')}</p>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          <li>{t('guaranteed-income-supplement.list.live-canada')}</li>
          <li>{t('guaranteed-income-supplement.list.receive-pension')}</li>
          <li>
            <Trans
              ns="learn/main-sources-of-retirement-income"
              i18nKey="guaranteed-income-supplement.list.income-below-maximum.content"
              components={{
                a: <MuiLink href={t('guaranteed-income-supplement.list.income-below-maximum.link')} />,
              }}
            />
          </li>
        </ul>
        <p>{t('guaranteed-income-supplement.monthly')}</p>
        <p>{t('guaranteed-income-supplement.collecting')}</p>

        <h4 className="h4 mb-4 text-xl">{t('guaranteed-income-supplement.helpful-resources.header')}</h4>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          {[
            {
              href: t('guaranteed-income-supplement.helpful-resources.overview.link'),
              primary: t('guaranteed-income-supplement.helpful-resources.overview.content'),
            },
            {
              href: t('guaranteed-income-supplement.helpful-resources.estimator.link'),
              primary: t('guaranteed-income-supplement.helpful-resources.estimator.content'),
            },
          ].map(({ href, primary }) => (
            <li key={primary}>
              <MuiLink href={href}>{primary}</MuiLink>
            </li>
          ))}
        </ul>

        <h2 id="canada-pension-plan-program" className="h2">
          {t('canada-pension-plan-program.header')}
        </h2>
        <p>{t('canada-pension-plan-program.overview')}</p>

        <h3 className="h3">{t('canada-pension-plan-program.qualify.header')}</h3>
        <p>{t('canada-pension-plan-program.qualify.worked-in-canada')}</p>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="canada-pension-plan-program.qualify.pension-credits.content"
            components={{ a: <MuiLink href={t('canada-pension-plan-program.qualify.pension-credits.link')} /> }}
          />
        </p>

        <h3 className="h3">{t('canada-pension-plan-program.how-much.header')}</h3>
        <p>{t('canada-pension-plan-program.how-much.amount')}</p>
        <p>{t('canada-pension-plan-program.how-much.inflation')}</p>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="canada-pension-plan-program.how-much.learn-more.content"
            components={{
              a: <MuiLink component={Link} href={t('canada-pension-plan-program.how-much.learn-more.link')} />,
            }}
          />
        </p>

        <h4 className="h4 mb-4 text-xl">{t('canada-pension-plan-program.helpful-resources.header')}</h4>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          {[
            {
              href: t('canada-pension-plan-program.helpful-resources.overview.link'),
              primary: t('canada-pension-plan-program.helpful-resources.overview.content'),
            },
            {
              href: t('canada-pension-plan-program.helpful-resources.cpp.link'),
              primary: t('canada-pension-plan-program.helpful-resources.cpp.content'),
            },
            {
              href: t('canada-pension-plan-program.helpful-resources.monthly.link'),
              primary: t('canada-pension-plan-program.helpful-resources.monthly.content'),
            },
          ].map(({ href, primary }) => (
            <li key={primary}>
              <MuiLink href={href}>{primary}</MuiLink>
            </li>
          ))}
        </ul>

        <h3 className="h3 py-3">{t('canada-pension-plan-program.cpp-post-retirement-benefit.header')}</h3>
        <p>{t('canada-pension-plan-program.cpp-post-retirement-benefit.overview')}</p>
        <p>{t('canada-pension-plan-program.cpp-post-retirement-benefit.adjustments')}</p>
        <Image
          alt={t('canada-pension-plan-program.cpp-post-retirement-benefit.chart.accessibility.description.content')}
          src={getImageSrc('cpp-prb')}
          width={842}
          height={519}
          className="w-full"
        />
        <p className="mt-4 rounded-lg bg-gray-surface p-4">
          {t('canada-pension-plan-program.cpp-post-retirement-benefit.chart.footer')}
        </p>
        <AccessibilityGraphContainer
          tableData={{
            caption: t('canada-pension-plan-program.cpp-post-retirement-benefit.chart.accessibility.caption'),
            header: t<string, Array<string>>(
              'canada-pension-plan-program.cpp-post-retirement-benefit.chart.accessibility.header',
              {
                returnObjects: true,
              }
            ),
            rows: t<string, Array<{ data: Array<string> }>>(
              'canada-pension-plan-program.cpp-post-retirement-benefit.chart.accessibility.rows',
              {
                returnObjects: true,
              }
            ),
          }}
          description={t(
            'canada-pension-plan-program.cpp-post-retirement-benefit.chart.accessibility.description.content'
          )}
          buttonLabel={t('canada-pension-plan-program.cpp-post-retirement-benefit.chart.accessibility.button-label')}
          descriptionHeading={t(
            'canada-pension-plan-program.cpp-post-retirement-benefit.chart.accessibility.description.header'
          )}
          valuesHeading={t(
            'canada-pension-plan-program.cpp-post-retirement-benefit.chart.accessibility.values-heading'
          )}
        />
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="canada-pension-plan-program.cpp-post-retirement-benefit.choices.content"
            components={{
              a: <MuiLink href={t('canada-pension-plan-program.cpp-post-retirement-benefit.choices.link')} />,
            }}
          />
        </p>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="canada-pension-plan-program.cpp-post-retirement-benefit.differences.content"
            components={{
              Link: (
                <MuiLink
                  component={Link}
                  href={t('canada-pension-plan-program.cpp-post-retirement-benefit.differences.link')}
                />
              ),
            }}
          />
        </p>

        <h4 className="h4 mb-4 text-xl">
          {t('canada-pension-plan-program.cpp-post-retirement-benefit.helpful-resources.header')}
        </h4>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          {[
            {
              href: t('canada-pension-plan-program.cpp-post-retirement-benefit.helpful-resources.cpp.link'),
              primary: t('canada-pension-plan-program.cpp-post-retirement-benefit.helpful-resources.cpp.content'),
            },
            {
              href: t(
                'canada-pension-plan-program.cpp-post-retirement-benefit.helpful-resources.stop-contributing.link'
              ),
              primary: t(
                'canada-pension-plan-program.cpp-post-retirement-benefit.helpful-resources.stop-contributing.content'
              ),
            },
          ].map(({ href, primary }) => (
            <li key={primary}>
              <MuiLink href={href}>{primary}</MuiLink>
            </li>
          ))}
        </ul>

        <h2 id="ongoing-earnings-from-your-job" className="h2">
          {t('ongoing-earnings-from-your-job.header')}
        </h2>
        <p>{t('ongoing-earnings-from-your-job.overview')}</p>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="ongoing-earnings-from-your-job.work-to-retirement.content"
            components={{
              a: <MuiLink component={Link} href={t('ongoing-earnings-from-your-job.work-to-retirement.link')} />,
            }}
          />
        </p>

        <h2 id="workplace-pension-plans" className="h2">
          {t('workplace-pension-plans.header')}
        </h2>
        <p>{t('workplace-pension-plans.overview')}</p>
        <ul className="mb-5 list-disc space-y-1 pl-7">
          <li>{t('workplace-pension-plans.list.rpp')}</li>
          <li>{t('workplace-pension-plans.list.group-rrsp')}</li>
          <li>{t('workplace-pension-plans.list.group-tfsa')}</li>
          <li>{t('workplace-pension-plans.list.prpp')}</li>
        </ul>

        <h2 id="personal-retirement-savings" className="h2">
          {t('personal-retirement-savings.header')}
        </h2>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="personal-retirement-savings.overview.content"
            components={{
              rrsp: <MuiLink href={t('personal-retirement-savings.overview.link.rrsp')} />,
              tfsa: <MuiLink href={t('personal-retirement-savings.overview.link.tfsa')} />,
              amount: <MuiLink href={t('personal-retirement-savings.overview.link.gis-amount')} />,
              gis: <MuiLink href={t('personal-retirement-savings.overview.link.gis')} />,
            }}
          />
        </p>
        <p>
          <Trans
            ns="learn/main-sources-of-retirement-income"
            i18nKey="personal-retirement-savings.learn-more.content"
            components={{ a: <MuiLink component={Link} href={t('personal-retirement-savings.learn-more.link')} /> }}
          />
        </p>
        <div className="items-center gap-6 space-y-6 xl:gap-10">
          <AlertCard type="important">
            <Trans
              ns="learn/main-sources-of-retirement-income"
              i18nKey="personal-retirement-savings.important-notice"
            />
          </AlertCard>
          <AlertCard type="disclaimer">
            <Trans
              ns="learn/main-sources-of-retirement-income"
              i18nKey="personal-retirement-savings.disclaimer-notice"
            />
          </AlertCard>
        </div>

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
                      className: 'font-display font-medium',
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn/main-sources-of-retirement-income'], null, [
      'en',
      'fr',
    ])),
  },
})

export default MainSourcesOfRetirementIncome
