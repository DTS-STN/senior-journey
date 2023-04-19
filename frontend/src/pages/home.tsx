import { FC, useState, useId } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Link as MuiLink,
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Paper,
  Tab, 
} from '@mui/material'
import { 
  TabContext,
  TabList, 
  TabPanel, 
} from '@mui/lab';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
  const tabData:Array<TabData> = t('tabs', { returnObjects: true })
  const [value, setValue] = useState(tabData[0].title);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


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

      <section className='py-10 md:flex md:flex-col md:items-center'>

        <TabContext value={value}>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            className='z-20 flex elevation-4 center -mx-4 md:w-fit md:rounded-2xl bg-white text-button-background md:mx-4 md:px-24'
            classes={{
              scrollableX: "mx-4",
              flexContainer: "h4 box-border flex cursor-pointer capitalize appearance-none rounded-xl focus:outline-none "
            }}
            visibleScrollbar={true}
            >
              {tabData.map((item, i) => (
                <Tab
                className='h4 text-base box-border flex cursor-pointer capitalize appearance-none pt-4 pb-1 px-12 rounded-xl focus:outline-none' 
                key={item.title} value={item.title} label={item.title} />
                ))}
          </TabList>
          <div className="relative md:w-full md:h-full -z-10 -mx-4 md:rounded-2xl px-4 py-6 md:relative -mt-4 md:-mt-6 bg-gray-surface md:px-24 md:py-16 lg:px-24">
            {tabData.map((item, i) => (
              <TabPanel className='py-4 px-1' key={item.title} value={item.title}>
                <div className='flex flex-col md:flex-row md:space-x-6 elevation-1 rounded'>
                <div className="rounded bg-white px-10  elevation-1 md:w-2/5 md:grow" >
                    <h3 className="h5 md:font-medium md:font-display md:text-4xl text-aqua-dark flex items-center py-8">
                      {item.heading}
                    </h3>
                    <div className="justify-center border-y-2 py-8">
                      {item.description.map((desc, i) => (
                        <p key={i}>
                          {desc.text}
                          {desc.list != null && desc.list != undefined && (
                            <ul className='list-disc md:px-6'>
                              {desc.list.map((litem, d) =>(
                                <li 
                                  key={d}
                                  className=''
                                >
                                  {litem}
                                </li>
                              ))}
                            </ul>
                          )}
                          {desc.links != null && desc.links != undefined && (
                            <List >
                              {desc.links.map((litem, d) =>(
                                <ListItem key={d} className='border-b-2 border-b-gray-surface py-3 '>
                                  <MuiLink
                                  component={Link} 
                                  className='flex grow flex-row items-center no-underline text-black font-display font-medium'
                                  href={litem.url} 
                                  >
                                  <ListItemText primary={litem.title}/>&nbsp;
                                  <ListItemAvatar>
                                      <ArrowForwardIosIcon className='text-base text-aqua-light' />
                                  </ListItemAvatar>
                                  </MuiLink>
                              </ListItem>
                              ))}
                            </List>
                          )}
                        </p>
                      ))}
                    </div>
                    {item.button != null && item.button != undefined && (
                      <div className='flex flex-row-reverse'>
                        <MuiLink
                        component={Link} 
                        className='font-display font-bold rounded no-underline bg-aqua-dark text-white visited:text-white  py-2 px-3 my-8'
                        href={item.button.url}>
                        {item.button.text}
                        </MuiLink>
                      </div>
                    )}
                  </div>
                  {item.linksTitle != null && item.linksTitle != undefined  && (
                  <div className=" bg-white py-5 px-8 rounded md:w-3/5">
                    <h3 className="text-2xl font-bold md:font-light font-display text-black ">{item.linksTitle}</h3>
                    {item.links != null && item.links != undefined && (
                    <div className="py-11 px-3 ">
                      {item.links.map((link, b) => (
                        <div
                          key={link.title}
                          className="border-b-2 border-b-gray-surface"
                        >
                          <div className='my-3 flex flex-row'>
                            <div>
                              <div>
                                <MuiLink
                                  component={Link}
                                  className="font-display font-medium text-xl no-underline text-black"
                                  href={link.url}
                                  >
                                  {link.title}
                                </MuiLink>
                              </div>
                              <div className='text-[#797979]'>{link.description}</div>
                            </div>
                            <div className='flex grow flex-row-reverse items-center'>
                              <ArrowForwardIosIcon className='text-base md:text-[40px] text-aqua-light md:pl-6' />
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
            ))}
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
                href={t('contact-us.cards.call-us.toll-number-href')}
              >
                {t('contact-us.cards.call-us.toll-number')}
              </MuiLink>
            </p>
            <p>
              <strong>{t('contact-us.cards.call-us.tty')}</strong>{' '}
              <MuiLink
                component={Link}
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
      <p className="">{t('contact-us.description')}</p>
      
      <Paper variant="outlined" className="mb-6 p-4">
        <h3 className="mb-2 text-xl font-bold">
          {t('contact-us.cards.request-call.title')}
        </h3>
        <Divider />
        <p className="mt-3 text-lg">
          {t('contact-us.cards.request-call.description')}
        </p>
        <Paper variant='outlined' className='w-fit p-3 border-2 border-gray-surface'>
          <MuiLink
            component={Link}
            className="text-base font-display  font-bold text-aqua-dark text-center capitalize no-underline"
            href={t('contact-us.cards.request-call.href')}
          >
            {t('contact-us.cards.request-call.title')}
          </MuiLink>
        </Paper>
      </Paper>

      <Paper variant="outlined" className="mb-6 p-4">
        <h3 className="mb-2 text-xl font-bold">
          {t('contact-us.cards.call-us.title')}
        </h3>
        <Divider />
        <p className="mt-3 text-lg">
          {t('contact-us.cards.call-us.description')}
        </p>
        <p className="text-lg md:inline">
          <span className="font-bold">
            {t('contact-us.cards.call-us.toll-free')}
          </span>{' '}
          <MuiLink
          component={Link}
          href={t('contact-us.cards.call-us.toll-number-href')}
          >
            {t('contact-us.cards.call-us.toll-number')}
          </MuiLink>
        </p>
        <p className="text-lg md:ml-10 md:inline">
          <span className="font-bold">
            {t('contact-us.cards.call-us.tty')}
          </span>{' '}
          <MuiLink
          component={Link}
          href={t('contact-us.cards.call-us.tty-number-href')}
          >
          {t('contact-us.cards.call-us.tty-number')}
          </MuiLink>
        </p>
        <p className="mt-3 text-lg">
          {t('contact-us.cards.call-us.toll-free-description')}
        </p>
        <Divider className='my-4'/>
        <p className="text-lg md:inline">
          <span className="font-bold">
            {t('contact-us.cards.call-us.outside')}
          </span>{' '}
          <MuiLink
          component={Link}
          href={t('contact-us.cards.call-us.outside-number-href')}
          >
          {t('contact-us.cards.call-us.outside-number')}
          </MuiLink>
        </p>
        <p className="mt-3 text-lg">
          {t('contact-us.cards.call-us.outside-description')}
        </p>
      </Paper>
      <Paper variant="outlined" className="p-4">
        <h3 className="mb-2 text-xl font-bold">
          {t('contact-us.cards.find-office.title')}
        </h3>
        <Divider />
        
        <Paper variant='outlined' className='w-fit p-3 my-4 border-2 border-gray-surface text-center'>
          <MuiLink
            component={Link}
            className="text-base font-display font-bold text-aqua-dark text-center capitalize no-underline"
            href={t('contact-us.cards.find-office.href')}
            >
            {t('contact-us.cards.find-office.link-text')}
          </MuiLink>
        </Paper>
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
