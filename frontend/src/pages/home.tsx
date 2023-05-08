import React, { FC, useState } from 'react'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link as MuiLink,
  Paper,
  Tab,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import Container from '../components/Container'
import Layout from '../components/Layout'

export interface SupportingSeniorsCardProps {
  src: string
  href: string
  linkText: string
  text: string
}

interface TabLinkData {
  title: string
  url: string
  description?: string
}

interface TabBlockText {
  text: string
  list?: Array<string>
  links?: Array<TabLinkData>
}

interface TabData {
  id: string
  title: string
  heading: string
  description: Array<TabBlockText>
  button?: {
    text: string
    url: string
  }
  linksTitle?: string
  links?: Array<TabLinkData>
}

const Home: FC = () => {
  const { t } = useTranslation('home')
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  const tabsData = t<string, ReadonlyArray<TabData>>('tabs', { returnObjects: true })
  const [value, setValue] = useState(tabsData?.length ? tabsData[0].id : '')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Layout
    breadcrumbItems={[]}
    contained={false}
    >
      <NextSeo title={t('header')} />
      <h1 className="sr-only">{t('header')}</h1>

      <Container className="mb-10">
        <section className="rounded-3xl bg-gray-surface ">
          <div className="flex flex-col items-center pt-10 md:flex-row-reverse">
            <div className="mb-4 w-2/3 md:mb-0 md:w-2/3 lg:w-3/5">
              <Image src="/assets/banner.svg" width={742} height={548} sizes="100%" alt="" priority />
            </div>
            <div className="px-6 pb-4 md:w-2/3 md:pl-14 lg:w-4/5">
              <h2 className="mb-4 font-display text-4xl font-medium text-primary-700 md:text-5xl md:font-bold">
                {t('banner.title')}
              </h2>
              <p className="m-0">{t('banner.text')}</p>
            </div>
          </div>
        </section>
      </Container>

      <section>
        <TabContext value={value}>
          <Paper elevation={4} square className="relative">
            <TabList
              variant={mobile ? 'scrollable' : 'standard'}
              onChange={handleChange}
              scrollButtons="auto"
              centered={!mobile}
            >
              {tabsData.map(({ id, title }) => (
                <Tab key={id} value={id} label={title} className="px-10 pt-4 text-lg md:text-2xl" />
              ))}
            </TabList>
          </Paper>

          <div className="bg-gray-surface">
            <Container>
              {tabsData.map(({ id, heading, description, button, links, linksTitle }) => (
                <TabPanel key={id} value={id} className="px-0 py-8">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <Paper className="p-8 md:w-2/5 md:grow">
                      <h2 className="mb-8 font-display text-2xl font-medium text-primary-700 md:text-4xl">{heading}</h2>
                      <Divider className="mb-8" />
                      {description.map(({ text, list, links }) => (
                        <React.Fragment key={text}>
                          <p>{text}</p>
                          {list && list.length > 0 && (
                            <ul className="list-disc space-y-2 pl-7">
                              {list.map((litem) => (
                                <li key={litem}>{litem}</li>
                              ))}
                            </ul>
                          )}
                          {links && links.length > 0 && (
                            <List disablePadding>
                              {links.map(({ title, url }) => (
                                <React.Fragment key={title}>
                                  <ListItem disablePadding className="border-b">
                                    <ListItemButton href={url} component={Link}>
                                      <ListItemText
                                        primary={title}
                                        primaryTypographyProps={{
                                          className: 'font-display font-medium',
                                        }}
                                      />
                                      <NavigateNextIcon color="primary" />
                                    </ListItemButton>
                                  </ListItem>
                                </React.Fragment>
                              ))}
                            </List>
                          )}
                        </React.Fragment>
                      ))}
                      {button && (
                        <>
                          <Divider className="my-8" />
                          <div className="text-right">
                            <Button component={Link} href={button.url} size="large">
                              {button.text}
                            </Button>
                          </div>
                        </>
                      )}
                    </Paper>
                    {linksTitle && (
                      <Paper className="p-8 md:w-3/5">
                        <h3 className="mb-8 font-display text-xl font-light md:mb-11 md:text-3xl">{linksTitle}</h3>
                        {links && links.length > 0 && (
                          <List disablePadding>
                            {links.map(({ title, url, description }) => (
                              <React.Fragment key={title}>
                                <ListItem disablePadding className="border-b">
                                  <ListItemButton href={url} component={Link}>
                                    <ListItemText
                                      primary={title}
                                      primaryTypographyProps={{
                                        className: 'font-display font-medium',
                                      }}
                                      secondary={description}
                                      secondaryTypographyProps={{
                                        className: 'text-sm',
                                      }}
                                    />
                                    <NavigateNextIcon color="primary" />
                                  </ListItemButton>
                                </ListItem>
                              </React.Fragment>
                            ))}
                          </List>
                        )}
                      </Paper>
                    )}
                  </div>
                </TabPanel>
              ))}
            </Container>
          </div>
        </TabContext>
      </section>

      <Container>
        <h2 className="h2 text-primary-700">{t('contact-us.title')}</h2>
        <p className="mb-8">{t('contact-us.description')}</p>
        <Paper variant="outlined" className="mb-6 p-6">
          <h3 className="mb-4 font-display font-medium md:text-xl">{t('contact-us.cards.request-call.title')}</h3>
          <Divider className="my-4" />
          <p className="mt-3">{t('contact-us.cards.request-call.description')}</p>
          <Button component={Link} variant="outlined" href={t('contact-us.cards.request-call.href')}>
            {t('contact-us.cards.request-call.title')}
          </Button>
        </Paper>
        <Paper variant="outlined" className="mb-6 p-6">
          <h3 className="mb-4 font-display font-medium md:text-xl">{t('contact-us.cards.call-us.title')}</h3>
          <Divider className="my-4" />
          <p>{t('contact-us.cards.call-us.description')}</p>
          <div className="grid lg:grid-cols-2">
            <p>
              <strong>{t('contact-us.cards.call-us.toll-free')}</strong>{' '}
              <MuiLink
                component={Link}
                className="whitespace-nowrap"
                href={t('contact-us.cards.call-us.toll-number-href')}
              >
                {t('contact-us.cards.call-us.toll-number')}
              </MuiLink>
            </p>
            <p>
              <strong>{t('contact-us.cards.call-us.tty')}</strong>{' '}
              <MuiLink
                component={Link}
                className="whitespace-nowrap"
                href={t('contact-us.cards.call-us.tty-number-href')}
              >
                {t('contact-us.cards.call-us.tty-number')}
              </MuiLink>
            </p>
          </div>
          <p>{t('contact-us.cards.call-us.toll-free-description')}</p>
          <Divider className="my-4" />
          <p>
            <strong>{t('contact-us.cards.call-us.outside')}</strong>{' '}
            <MuiLink
              component={Link}
              className="whitespace-nowrap"
              href={t('contact-us.cards.call-us.outside-number-href')}
            >
              {t('contact-us.cards.call-us.outside-number')}
            </MuiLink>
          </p>
          <p className="m-0">{t('contact-us.cards.call-us.outside-description')}</p>
        </Paper>
        <Paper variant="outlined" className="p-6">
          <h3 className="mb-4 font-display font-medium md:text-xl">{t('contact-us.cards.find-office.title')}</h3>
          <Divider className="my-4" />
          <Button component={Link} variant="outlined" href={t('contact-us.cards.find-office.href')}>
            {t('contact-us.cards.find-office.link-text')}
          </Button>
        </Paper>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'home'])),
  },
})

export default Home
