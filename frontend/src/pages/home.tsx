import React, { FC, useId, useState } from 'react'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link as MuiLink,
  Paper,
  Tab,
} from '@mui/material'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

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

const SupportingSeniorsCard: FC<SupportingSeniorsCardProps> = ({
  src,
  href,
  linkText,
  text,
}) => {
  const id = useId()
  return (
    <Card>
      <CardActionArea
        component={Link}
        href={href}
        aria-describedby={`${id}-title`}
      >
        <CardMedia
          component="img"
          alt=""
          image={src}
          className="h-72 bg-secondary-50 object-contain"
        />
        <CardContent>
          <h3
            className="mb-2 font-display text-xl font-bold"
            id={`${id}-title`}
          >
            {linkText}
          </h3>
          <p className="m-0 text-black/60">{text}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const Home: FC = () => {
  const { t } = useTranslation('home')
  const tabData: Array<TabData> = t('tabs', { returnObjects: true })
  const [value, setValue] = useState(tabData[0].title)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Layout>
      <NextSeo title={t('header')} />
      <h1 className="sr-only">{t('header')}</h1>

      <section className="rounded-3xl bg-gray-surface ">
        <div className="flex flex-col items-center pt-10 md:flex-row-reverse">
          <div className="mb-4 w-2/3 md:mb-0 md:w-2/3 lg:w-3/5">
            <Image
              src="/assets/banner.svg"
              width={742}
              height={548}
              sizes="100%"
              alt=""
              priority
            />
          </div>
          <div className="px-6 pb-4 md:w-2/3 md:pl-14 lg:w-4/5">
            <h2 className="mb-4 font-display text-4xl font-medium text-primary-700 md:text-5xl md:font-bold">
              {t('banner.title')}
            </h2>
            <p className="m-0">{t('banner.text')}</p>
          </div>
        </div>
      </section>

      <section className="-mx-4 py-10 md:flex md:flex-col md:items-center">
        <TabContext value={value}>
          <TabList
            component={Paper}
            elevation={4}
            variant="scrollable"
            onChange={handleChange}
            className="relative z-20 rounded-none md:rounded-2xl md:px-24"
            scrollButtons={true}
          >
            {tabData.map(({ title }) => (
              <Tab
                className="px-10 pt-4 text-base"
                key={title}
                value={title}
                label={title}
              />
            ))}
          </TabList>
          <div className="relative -mt-4 bg-gray-surface px-4 py-6 md:relative md:-mt-6 md:h-full md:w-full md:rounded-2xl md:px-24 md:py-16 lg:px-24">
            {tabData.map(
              ({ title, heading, description, button, links, linksTitle }) => (
                <TabPanel className="px-1 py-4" key={title} value={title}>
                  <div className="flex flex-col gap-6 rounded md:flex-row">
                    <Paper className="p-8 md:w-2/5 md:grow">
                      <h2 className="h5 mb-8 flex items-center text-primary-700 md:text-4xl md:font-medium">
                        {heading}
                      </h2>
                      <Divider className="mb-8" />
                      {description.map(({ text, list, links }) => (
                        <React.Fragment key={text}>
                          <p>{text}</p>
                          {list != null && list != undefined && (
                            <ul className="list-disc space-y-2 pl-7">
                              {list.map((litem) => (
                                <li key={litem}>{litem}</li>
                              ))}
                            </ul>
                          )}
                          {links != null && links != undefined && (
                            <List disablePadding>
                              {links.map(({ title, url }) => (
                                <React.Fragment key={title}>
                                  <ListItem disablePadding>
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
                                  <Divider component="li" />
                                </React.Fragment>
                              ))}
                            </List>
                          )}
                        </React.Fragment>
                      ))}
                      {button != null && button != undefined && (
                        <>
                          <Divider className="my-8" />
                          <div className="text-right">
                            <Button
                              component={Link}
                              href={button.url}
                              size="large"
                            >
                              {button.text}
                            </Button>
                          </div>
                        </>
                      )}
                    </Paper>
                    {linksTitle != null && linksTitle != undefined && (
                      <Paper className="p-8 md:w-3/5">
                        <h3 className="mb-8 font-display text-xl font-bold md:mb-11 md:text-2xl md:font-light">
                          {linksTitle}
                        </h3>
                        {links != null && links != undefined && (
                          <List disablePadding>
                            {links.map(({ title, url, description }) => (
                              <React.Fragment key={title}>
                                <ListItem disablePadding>
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
                                <Divider component="li" />
                              </React.Fragment>
                            ))}
                          </List>
                        )}
                      </Paper>
                    )}
                  </div>
                </TabPanel>
              )
            )}
          </div>
        </TabContext>
      </section>

      <h2 className="h2">{t('supporting-seniors.title')}</h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <SupportingSeniorsCard
          src="/assets/supporting-seniors-family-and-friends.svg"
          href={t('supporting-seniors.cards.family-and-friends.href')}
          linkText={t('supporting-seniors.cards.family-and-friends.link-text')}
          text={t('supporting-seniors.cards.family-and-friends.text')}
        />
        <SupportingSeniorsCard
          src="/assets/supporting-seniors-representatives.svg"
          href={t('supporting-seniors.cards.representatives.href')}
          linkText={t('supporting-seniors.cards.representatives.link-text')}
          text={t('supporting-seniors.cards.representatives.text')}
        />
        <SupportingSeniorsCard
          src="/assets/supporting-seniors-organizations.svg"
          href={t('supporting-seniors.cards.organizations.href')}
          linkText={t('supporting-seniors.cards.organizations.link-text')}
          text={t('supporting-seniors.cards.organizations.text')}
        />
      </div>

      <h2 className="h2">{t('contact-us.title')}</h2>
      <p>{t('contact-us.description')}</p>
      <Paper variant="outlined" className="mb-6 p-6">
        <h3 className="mb-4 font-display font-medium">
          {t('contact-us.cards.request-call.title')}
        </h3>
        <Divider className="my-4" />
        <p className="mt-3 text-sm">
          {t('contact-us.cards.request-call.description')}
        </p>
        <Button
          component={Link}
          variant="outlined"
          href={t('contact-us.cards.request-call.href')}
        >
          {t('contact-us.cards.request-call.title')}
        </Button>
      </Paper>
      <Paper variant="outlined" className="mb-6 p-6">
        <h3 className="mb-4 font-display font-medium">
          {t('contact-us.cards.call-us.title')}
        </h3>
        <Divider className="my-4" />
        <div className="text-sm">
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
          <p className="m-0">
            {t('contact-us.cards.call-us.outside-description')}
          </p>
        </div>
      </Paper>
      <Paper variant="outlined" className="p-6">
        <h3 className="mb-4 font-display font-medium">
          {t('contact-us.cards.find-office.title')}
        </h3>
        <Divider className="my-4" />
        <Button
          component={Link}
          variant="outlined"
          href={t('contact-us.cards.find-office.href')}
        >
          {t('contact-us.cards.find-office.link-text')}
        </Button>
      </Paper>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'home'])),
  },
})

export default Home
