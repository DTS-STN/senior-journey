import { FC, useId, useState } from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
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
  ListItemAvatar,
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
          <div className="w-full px-6 pb-4 text-center md:w-2/3 md:pl-14 md:text-left lg:w-4/5">
            <h3 className="mb-4 text-5xl font-bold text-primary-700">
              {t('banner.title')}
            </h3>
            <p className="m-0">{t('banner.text')}</p>
          </div>
        </div>
      </section>

      <section className="py-10 md:flex md:flex-col md:items-center">
        <TabContext value={value}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
            className="center text-button-background relative z-20 -mx-4 flex bg-white elevation-4 md:mx-4 md:w-fit md:rounded-2xl md:px-24"
            classes={{
              scrollableX: 'mx-4',
              flexContainer:
                'h4 box-border flex cursor-pointer capitalize appearance-none rounded-xl focus:outline-none ',
            }}
            visibleScrollbar={true}
          >
            {tabData.map(({ title }) => (
              <Tab
                className="h4 box-border flex cursor-pointer appearance-none rounded-xl px-12 pb-1 pt-4 text-base capitalize focus:outline-none"
                key={title}
                value={title}
                label={title}
              />
            ))}
          </TabList>
          <div className="relative -mx-4 -mt-4 bg-gray-surface px-4 py-6 md:relative md:-mt-6 md:h-full md:w-full md:rounded-2xl md:px-24 md:py-16 lg:px-24">
            {tabData.map(
              ({ title, heading, description, button, links, linksTitle }) => (
                <TabPanel className="px-1 py-4" key={title} value={title}>
                  <div className="flex flex-col rounded elevation-1 md:flex-row md:space-x-6">
                    <div className="rounded bg-white px-10  elevation-1 md:w-2/5 md:grow">
                      <h3 className="h5 flex items-center py-8 text-aqua-dark md:font-display md:text-4xl md:font-medium">
                        {heading}
                      </h3>
                      <div className="justify-center border-y-2 py-8">
                        {description.map(({ text, list, links }) => (
                          <p key={text}>
                            {text}
                            {list != null && list != undefined && (
                              <ul className="list-disc md:px-6">
                                {list.map((litem, d) => (
                                  <li key={litem} className="">
                                    {litem}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {links != null && links != undefined && (
                              <List>
                                {links.map(({ title, url }) => (
                                  <ListItem
                                    key={title}
                                    className="border-b-2 border-b-gray-surface py-3 "
                                  >
                                    <MuiLink
                                      component={Link}
                                      className="flex grow flex-row items-center font-display font-medium text-black no-underline"
                                      href={url}
                                    >
                                      <ListItemText primary={title} />
                                      &nbsp;
                                      <ListItemAvatar>
                                        <ArrowForwardIosIcon className="text-base text-aqua-light" />
                                      </ListItemAvatar>
                                    </MuiLink>
                                  </ListItem>
                                ))}
                              </List>
                            )}
                          </p>
                        ))}
                      </div>
                      {button != null && button != undefined && (
                        <div className="flex flex-row-reverse">
                          <MuiLink
                            component={Link}
                            className="my-8 rounded bg-aqua-dark px-3 py-2 font-display font-bold  text-white no-underline visited:text-white"
                            href={button.url}
                          >
                            {button.text}
                          </MuiLink>
                        </div>
                      )}
                    </div>
                    {linksTitle != null && linksTitle != undefined && (
                      <div className=" mt-4 rounded bg-white px-8 py-5 md:mt-0 md:w-3/5">
                        <h3 className="font-display text-2xl font-bold text-black md:font-light ">
                          {linksTitle}
                        </h3>
                        {links != null && links != undefined && (
                          <div className="px-3 py-11 ">
                            {links.map(({ title, url, description }) => (
                              <div
                                key={title}
                                className="border-b-2 border-b-gray-surface"
                              >
                                <div className="my-3 flex flex-row">
                                  <div>
                                    <div>
                                      <MuiLink
                                        component={Link}
                                        className="font-display text-xl font-medium text-black no-underline"
                                        href={url}
                                      >
                                        {title}
                                      </MuiLink>
                                    </div>
                                    <div className="text-[#797979]">
                                      {description}
                                    </div>
                                  </div>
                                  <div className="flex grow flex-row-reverse items-center">
                                    <ArrowForwardIosIcon className="text-base text-aqua-light md:pl-6 md:text-[40px]" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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
