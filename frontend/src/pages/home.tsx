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
import { QuizDialog } from '../components/quiz/QuizDialog'
import { getDCTermsTitle } from '../utils/seo-utils'

export interface SupportingSeniorsCardProps {
  src: string
  href: string
  linkText: string
  text: string
}

const Home: FC = () => {
  const { t, i18n } = useTranslation('home')
  const en = i18n.getFixedT('en', 'home')
  const fr = i18n.getFixedT('fr', 'home')

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  const [value, setValue] = useState(t('tabs.learn.id') ? t('tabs.learn.id') : '')
  const [quizDialogOpen, setQuizDialogOpen] = useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleOnQuizDialogTriggerClick = () => {
    setQuizDialogOpen(true)
  }

  const handleOnQuizDialogClose = () => {
    setQuizDialogOpen(false)
  }

  return (
    <Layout breadcrumbItems={[]} contained={false}>
      <NextSeo title={t('header')} additionalMetaTags={[getDCTermsTitle(en('header'), fr('header'))]} />
      <h1 className="sr-only">{t('header')}</h1>

      <Container className="">
        <section className="rounded-3xl bg-gray-surface ">
          <div className="flex flex-col items-center md:flex-row-reverse  md:max-h-[300px]">
            <div className="md:mb-0 md:w-2/3 lg:w-2/5 flex flex-col md:flex-row">
              <Image src="/assets/left.svg" width={34} height={302} className='hidden md:block w-[34px] h-[100%]' alt=''/>
              <div className='relative md:flex md:flex-row md:flex-end'>              
              <Image src="/assets/right.svg" width={34} height={302} className='hidden md:block absolute z-30 w-[34px] md:max-h-[300px]' alt=''/>
                <Image src="/assets/landing-page.jpg" width={460} height={302} sizes="100%" alt="" className='rounded-2xl w-[460px]  md:max-h-[300px]' />
                <Image src="/assets/bottom-top.svg" width={368} height={34} className='md:hidden absolute bottom-0 z-20 max-w-full' alt=''/>
              </div>
              <Image src="/assets/bottom-bottom.svg" width={468} height={34} className='md:hidden' alt=''/>
            </div>
            <div className="pt-12 md:pt-8 pb-6 px-6 md:w-2/3 md:pl-14 lg:w-4/5">
              <h2 className="font-display text-4xl font-medium text-primary-700 md:text-5xl md:font-bold">
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
              <Tab key={t('tabs.learn.id')} value={t('tabs.learn.id')} label={t('tabs.learn.title')} className="px-10 pt-4 text-lg md:text-2xl" />
              <Tab key={t('tabs.plan.id')} value={t('tabs.plan.id')} label={t('tabs.plan.title')} className="px-10 pt-4 text-lg md:text-2xl" />
              <Tab key={t('tabs.apply.id')} value={t('tabs.apply.id')} label={t('tabs.apply.title')} className="px-10 pt-4 text-lg md:text-2xl" />
              <Tab key={t('tabs.manage.id')} value={t('tabs.manage.id')} label={t('tabs.manage.title')} className="px-10 pt-4 text-lg md:text-2xl" />
            </TabList>
          </Paper>

          <div className="bg-gray-surface">
            <Container>
              <TabPanel value={t('tabs.learn.id')} className="px-0 py-8">
                <div className="flex flex-col gap-6 md:flex-row">
                  <Paper className="p-8 md:w-2/5 md:grow">
                    <h2 className="mb-8 font-display text-2xl font-medium text-primary-700 md:text-4xl">{t('tabs.learn.heading')}</h2>
                    <Divider className="mb-8" />
                    <p>{t('tabs.learn.description.0.text')}</p>
                    <p>{t('tabs.learn.description.1.text')}</p>
                    <Divider className="my-8" />
                    <div className="text-right">
                      <Button component={Link} href={t('tabs.learn.button.url')} size="large">
                        {t('tabs.learn.button.text')}
                      </Button>
                    </div>
                  </Paper>
                  <Paper className="p-8 md:w-3/5">
                    <h3 className="mb-8 font-display text-xl font-light md:mb-11 md:text-3xl">{t('tabs.learn.linksTitle')}</h3>
                    <List disablePadding>
                      <ListItem disablePadding className="border-b">
                        <ListItemButton href={t('tabs.learn.links.0.url')} component={Link}>
                          <ListItemText
                            primary={t('tabs.learn.links.0.title')}
                            primaryTypographyProps={{
                              className: 'font-display font-medium',
                            }}
                            secondary={t('tabs.learn.links.0.description')}
                            secondaryTypographyProps={{
                              className: 'text-sm',
                            }}
                          />
                          <NavigateNextIcon color="primary" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding className="border-b">
                        <ListItemButton href={t('tabs.learn.links.1.url')} component={Link}>
                          <ListItemText
                            primary={t('tabs.learn.links.1.title')}
                            primaryTypographyProps={{
                              className: 'font-display font-medium',
                            }}
                            secondary={t('tabs.learn.links.1.description')}
                            secondaryTypographyProps={{
                              className: 'text-sm',
                            }}
                          />
                          <NavigateNextIcon color="primary" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding className="border-b">
                        <ListItemButton href={t('tabs.learn.links.2.url')} component={Link}>
                          <ListItemText
                            primary={t('tabs.learn.links.2.title')}
                            primaryTypographyProps={{
                              className: 'font-display font-medium',
                            }}
                            secondary={t('tabs.learn.links.2.description')}
                            secondaryTypographyProps={{
                              className: 'text-sm',
                            }}
                          />
                          <NavigateNextIcon color="primary" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Paper>
                </div>
              </TabPanel>
              <TabPanel value={t('tabs.plan.id')} className="px-0 py-8">
                <div className="flex flex-col gap-6 md:flex-row">
                  <Paper className="p-8 md:w-2/5 md:grow">
                    <h2 className="mb-8 font-display text-2xl font-medium text-primary-700 md:text-4xl">{t('tabs.plan.heading')}</h2>
                    <Divider className="mb-8" />
                      <p>{t('tabs.plan.description.0.text')}</p>
                      <Divider className="my-8" />
                      <div className="text-right">
                        <Button id="quiz-dialog-trigger" size="large" onClick={handleOnQuizDialogTriggerClick}>
                          {t('tabs.plan.button.text')}
                        </Button>
                      </div>
                  </Paper>
                  <Paper className="p-8 md:w-3/5">
                    <h3 className="mb-8 font-display text-xl font-light md:mb-11 md:text-3xl">{t('tabs.plan.linksTitle')}</h3>
                    <List disablePadding>
                      <ListItem disablePadding className="border-b">
                        <ListItemButton href={t('tabs.plan.links.0.url')} component={Link}>
                          <ListItemText
                            primary={t('tabs.plan.links.0.title')}
                            primaryTypographyProps={{
                              className: 'font-display font-medium',
                            }}
                            secondary={t('tabs.plan.links.0.description')}
                            secondaryTypographyProps={{
                              className: 'text-sm',
                            }}
                          />
                          <NavigateNextIcon color="primary" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding className="border-b">
                        <ListItemButton href={t('tabs.plan.links.1.url')} component={Link}>
                          <ListItemText
                            primary={t('tabs.plan.links.1.title')}
                            primaryTypographyProps={{
                              className: 'font-display font-medium',
                            }}
                            secondary={t('tabs.plan.links.1.description')}
                            secondaryTypographyProps={{
                              className: 'text-sm',
                            }}
                          />
                          <NavigateNextIcon color="primary" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Paper>
                </div>
              </TabPanel>
              <TabPanel value={t('tabs.apply.id')} className="px-0 py-8">
                <div className="flex flex-col gap-6 md:flex-row">
                  <Paper className="p-8 md:w-2/5 md:grow">
                    <h2 className="mb-8 font-display text-2xl font-medium text-primary-700 md:text-4xl">{t('tabs.apply.heading')}</h2>
                    <Divider className="mb-8" />
                    <p>{t('tabs.apply.description.0.text')}</p>
                    <List disablePadding>
                      <ListItem disablePadding className="border-b">
                        <ListItemButton href={t('tabs.apply.description.0.links.0.url')} component={Link}>
                          <ListItemText
                            primary={t('tabs.apply.description.0.links.0.title')}
                            primaryTypographyProps={{
                              className: 'font-display font-medium',
                            }}
                          />
                          <NavigateNextIcon color="primary" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding className="border-b">
                        <ListItemButton href={t('tabs.apply.description.0.links.1.url')} component={Link}>
                          <ListItemText
                            primary={t('tabs.apply.description.0.links.1.title')}
                            primaryTypographyProps={{
                              className: 'font-display font-medium',
                            }}
                          />
                          <NavigateNextIcon color="primary" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Paper>  
                </div>
              </TabPanel>
              <TabPanel value={t('tabs.manage.id')} className="px-0 py-8">
                <div className="flex flex-col gap-6 md:flex-row">
                  <Paper className="p-8 md:w-2/5 md:grow">
                    <h2 className="mb-8 font-display text-2xl font-medium text-primary-700 md:text-4xl">{t('tabs.manage.heading')}</h2>
                    <Divider className="mb-8" />
                    <p>{t('tabs.manage.description.0.text')}</p>
                    <ul className="list-disc space-y-2 pl-7">
                      <li>{t('tabs.manage.description.0.list.0')}</li>
                      <li>{t('tabs.manage.description.0.list.1')}</li>
                      <li>{t('tabs.manage.description.0.list.2')}</li>
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

      <Container>
        <h2 className="h2 text-primary-700">{t('contact-us.title')}</h2>
        <p className="mb-8">{t('contact-us.description')}</p>
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
      <QuizDialog open={quizDialogOpen} onClose={handleOnQuizDialogClose} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'home', 'quiz'], null, ['en', 'fr'])),
  },
})

export default Home
