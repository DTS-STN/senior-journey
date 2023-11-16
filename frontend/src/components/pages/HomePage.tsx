import React, { useMemo, useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Tab,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import urlcat from 'urlcat'

import landingPageImage from '../../../public/assets/landing-page.jpg'
import { usePublicRuntimeConfig } from '../../lib/hooks/usePublicRuntimeConfig'
import { getDCTermsTitle } from '../../utils/seo-utils'
import Container from '../Container'
import { HeroBanner } from '../HeroBanner'
import Layout from '../Layout'

export interface SupportingSeniorsCardProps {
  src: string
  href: string
  linkText: string
  text: string
}

type TabValue = 'learn' | 'plan' | 'apply' | 'manage'

export const HomePage = () => {
  const { locale } = useRouter()
  const { t } = useTranslation(['home', 'common'])

  const publicRuntimeConfig = usePublicRuntimeConfig()

  const theme = useTheme()
  const extraSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const [tabValue, setTabValue] = useState<TabValue>('learn')
  const [open, setOpen] = useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: TabValue) => {
    setTabValue(newValue)
  }

  const schemaOrgWebSite = useMemo(
    () => ({
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': t('common:application-name'),
        'url': urlcat(publicRuntimeConfig.APP_BASE_URI, `/${locale ?? 'en'}`),
      }),
    }),
    [publicRuntimeConfig.APP_BASE_URI, locale, t],
  )

  return (
    <>
      <Head>
        <script
          key={`structured-data-webSite-${locale}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaOrgWebSite}
        />
      </Head>
      <NextSeo
        title={t('header')}
        description={t('meta.description')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <Layout contained={false}>
        <Container className="mb-8 md:mb-12">
          <HeroBanner imageProps={{ className: 'md:object-right-bottom', src: landingPageImage }}>
            <h1 className="h1 mb-2 text-primary-700 md:mb-4">{t('banner.title')}</h1>
            <p className="m-0">{t('banner.text')}</p>
          </HeroBanner>
        </Container>

        <section>
          <TabContext value={tabValue}>
            <Paper elevation={4} square className="relative">
              {!extraSmall && (
                <TabList onChange={handleChange} scrollButtons="auto" centered>
                  <Tab value="learn" label={t('tabs.learn.title')} className="px-10 pt-4 text-lg md:text-2xl" />
                  <Tab value="plan" label={t('tabs.plan.title')} className="px-10 pt-4 text-lg md:text-2xl" />
                  <Tab value="apply" label={t('tabs.apply.title')} className="px-10 pt-4 text-lg md:text-2xl" />
                  <Tab value="manage" label={t('tabs.manage.title')} className="px-10 pt-4 text-lg md:text-2xl" />
                </TabList>
              )}
              {extraSmall && (
                <>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="border-b-2 border-primary-700 p-2">
                      <Button variant="text" className="grow text-lg font-bold" fullWidth>
                        {t(`tabs.${tabValue}.title`)}
                      </Button>
                    </div>
                    <Button
                      variant="text"
                      onClick={() => setOpen(!open)}
                      endIcon={open ? <ExpandLess /> : <ExpandMore />}
                      className="text-lg font-bold text-black text-opacity-60"
                      fullWidth
                    >
                      {t('tabs.more')}
                    </Button>
                  </div>
                  <Collapse in={open}>
                    <TabList
                      variant="fullWidth"
                      orientation="vertical"
                      onChange={handleChange}
                      className="px-10 pt-4 text-lg md:text-2xl"
                      TabIndicatorProps={{
                        style: {
                          display: 'none',
                        },
                      }}
                    >
                      <Tab value="learn" label={t('tabs.learn.title')} />
                      <Tab value="plan" label={t('tabs.plan.title')} />
                      ,
                      <Tab value="apply" label={t('tabs.apply.title')} />
                      ,
                      <Tab value="manage" label={t('tabs.manage.title')} />,
                    </TabList>
                  </Collapse>
                </>
              )}
            </Paper>

            <div className="bg-gray-surface">
              <Container>
                <TabPanel value="learn" className="px-0 py-8">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <Paper className="p-8 md:w-2/6 md:grow">
                      <h2 className="h2 mb-8 text-primary-700">{t('tabs.learn.heading')}</h2>
                      <Divider className="mb-8" />
                      <p>{t('tabs.learn.description.options-and-tips')}</p>
                      <p>{t('tabs.learn.description.stories')}</p>
                      <Divider className="my-8" />
                      <div className="text-right">
                        <Button component={Link} href="/learn" size="large" className="text-center">
                          {t('tabs.learn.button-text')}
                        </Button>
                      </div>
                    </Paper>
                    <Paper className="p-8 md:w-4/6">
                      <h3 className="h3 h3-gutter-bottom">{t('tabs.learn.linksTitle')}</h3>
                      <List disablePadding>
                        <ListItem disablePadding className="border-b">
                          <ListItemButton href="/learn/deciding-when-to-start-your-public-pensions" component={Link}>
                            <ListItemText
                              primary={t('tabs.learn.links.when-to-start.title')}
                              primaryTypographyProps={{
                                className: 'font-display font-medium text-xl',
                              }}
                              secondary={t('tabs.learn.links.when-to-start.description')}
                              secondaryTypographyProps={{
                                className: 'text-base font-regular',
                              }}
                            />
                            <NavigateNextIcon color="primary" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding className="border-b">
                          <ListItemButton href="/learn/rules-of-thumb-for-public-pensions" component={Link}>
                            <ListItemText
                              primary={t('tabs.learn.links.rules-of-thumb.title')}
                              primaryTypographyProps={{
                                className: 'font-display font-medium text-xl',
                              }}
                              secondary={t('tabs.learn.links.rules-of-thumb.description')}
                              secondaryTypographyProps={{
                                className: 'text-base font-regular',
                              }}
                            />
                            <NavigateNextIcon color="primary" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding className="border-b">
                          <ListItemButton href="/learn/case-studies/bonnie" component={Link}>
                            <ListItemText
                              primary={t('tabs.learn.links.case-study-bonnie.title')}
                              primaryTypographyProps={{
                                className: 'font-display font-medium text-xl',
                              }}
                              secondary={t('tabs.learn.links.case-study-bonnie.description')}
                              secondaryTypographyProps={{
                                className: 'text-base font-regular',
                              }}
                            />
                            <NavigateNextIcon color="primary" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Paper>
                  </div>
                </TabPanel>
                <TabPanel value="plan" className="px-0 py-8">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <Paper className="p-8 md:w-2/6 md:grow">
                      <h2 className="h2 mb-8 text-primary-700">{t('tabs.plan.heading')}</h2>
                      <Divider className="mb-8" />
                      <p>{t('tabs.plan.description')}</p>
                      <Divider className="my-8" />
                      <div className="text-right">
                        <Button component={Link} id="quiz-dialog-link" size="large" href="/quiz">
                          {t('tabs.plan.button.text')}
                        </Button>
                      </div>
                    </Paper>
                    <Paper className="p-8 md:w-4/6">
                      <h3 className="h3 h3-gutter-bottom">{t('tabs.plan.linksTitle')}</h3>
                      <List disablePadding className="ml-4">
                        <ListItem disablePadding className="border-b">
                          <ListItemButton
                            className="pl-0"
                            href={t('tabs.plan.links.retirement-income-calculator.url')}
                            component={Link}
                          >
                            <ListItemText
                              primary={t('tabs.plan.links.retirement-income-calculator.title')}
                              primaryTypographyProps={{
                                className: 'font-display font-medium text-xl',
                              }}
                              secondary={t('tabs.plan.links.retirement-income-calculator.description')}
                              secondaryTypographyProps={{
                                className: 'text-base font-regular',
                              }}
                            />
                            <NavigateNextIcon color="primary" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding className="border-b">
                          <ListItemButton
                            className="pl-0"
                            href={t('tabs.plan.links.oas-eligibility-estimator.url')}
                            component={Link}
                          >
                            <ListItemText
                              primary={t('tabs.plan.links.oas-eligibility-estimator.title')}
                              primaryTypographyProps={{
                                className: 'font-display font-medium text-xl',
                              }}
                              secondary={t('tabs.plan.links.oas-eligibility-estimator.description')}
                              secondaryTypographyProps={{
                                className: 'text-base font-regular',
                              }}
                            />
                            <NavigateNextIcon color="primary" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Paper>
                  </div>
                </TabPanel>
                <TabPanel value="apply" className="px-0 py-8">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <Paper className="p-8 md:w-2/6 md:grow">
                      <h2 className="h2 mb-8 text-primary-700">{t('tabs.apply.heading')}</h2>
                      <Divider className="mb-8" />
                      <p className="mb-8">{t('tabs.apply.description.text')}</p>
                      <List disablePadding className="ml-4">
                        <ListItem disablePadding className="border-b">
                          <ListItemButton
                            className="pl-0 underline underline-offset-4"
                            href={t('tabs.apply.description.links.how-to-apply.url')}
                            component={Link}
                          >
                            <ListItemText
                              primary={t('tabs.apply.description.links.how-to-apply.title')}
                              primaryTypographyProps={{
                                className: 'font-display font-medium text-xl',
                              }}
                            />
                            <NavigateNextIcon color="primary" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding className="border-b">
                          <ListItemButton
                            className="pl-0 underline underline-offset-4"
                            href={t('tabs.apply.description.links.oas-apply.url')}
                            component={Link}
                          >
                            <ListItemText
                              primary={t('tabs.apply.description.links.oas-apply.title')}
                              primaryTypographyProps={{
                                className: 'font-display font-medium text-xl',
                              }}
                            />
                            <NavigateNextIcon color="primary" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Paper>
                  </div>
                </TabPanel>
                <TabPanel value="manage" className="px-0 py-8">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <Paper className="p-8 md:w-2/6 md:grow">
                      <h2 className="h2 mb-8 text-primary-700">{t('tabs.manage.heading')}</h2>
                      <Divider className="mb-8" />
                      <p>{t('tabs.manage.description.text')}</p>
                      <ul className="list-disc space-y-1 pl-7">
                        <li>{t('tabs.manage.description.list.create-and-submit-application')}</li>
                        <li>{t('tabs.manage.description.list.check-status-payment-dates-and-amounts')}</li>
                        <li>{t('tabs.manage.description.list.update-mailing-address-and-banking-information')}</li>
                      </ul>
                      <Divider className="my-8" />
                      <div className="text-right">
                        <Button component={Link} href={t('tabs.manage.button.url')} size="large">
                          {t('tabs.manage.button.text')}
                        </Button>
                      </div>
                    </Paper>
                  </div>
                </TabPanel>
              </Container>
            </div>
          </TabContext>
        </section>
      </Layout>
    </>
  )
}
