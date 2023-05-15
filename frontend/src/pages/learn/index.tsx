import { FC, useState } from 'react'

import { Button, Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '../../components/Layout'
import { QuizDialog } from '../../components/quiz/QuizDialog'
import { getDCTermsTitle } from '../../utils/seo-utils'

const Learn: FC = () => {
  const { t, i18n } = useTranslation('learn')
  const en = i18n.getFixedT('en', 'learn')
  const fr = i18n.getFixedT('fr', 'learn')

  const [quizDialogOpen, setQuizDialogOpen] = useState(false)

  const sections = t<string, { cards: any[] }[]>('sections', {
    returnObjects: true,
  })

  const handleOnQuizDialogTriggerClick = () => {
    setQuizDialogOpen(true)
  }

  const handleOnQuizDialogClose = () => {
    setQuizDialogOpen(false)
  }

  return (
    <>
      <NextSeo title={t('header')} additionalMetaTags={[getDCTermsTitle(en('header'), fr('header'))]} />
      <Layout
        breadcrumbItems={[
          {
            link: t('breadcrumbs.home.link'),
            text: t('breadcrumbs.home.text'),
          },
        ]}
      >
        <h1 className="sr-only">{t('header')}</h1>
        <section className="rounded-3xl bg-[#f5f5f5] ">
          <div className="flex flex-col items-center md:flex-row-reverse">
            <div className="md:w-1/3 flex flex-col  md:flex-row">
              <Image src="/assets/left.svg" width={34} height={302} className='hidden md:block w-[34px] h-[100%]' alt=''/>
              <div className='relative md:flex md:flex-row md:flex-end'>
                <Image src="/assets/right.svg" width={34} height={302} className='hidden md:block absolute z-30 w-[34px] md:max-h-full' alt=''/>
                <Image src="/assets/learn-banner.jpg" width={460} height={302} sizes="100%" alt="" className='rounded-2xl w-[460px]  md:max-h-full' />
                <Image src="/assets/bottom-top.svg" width={368} height={34} className='md:hidden absolute bottom-0 z-20 max-w-full' alt=''/>
              </div>
              <Image src="/assets/bottom-bottom.svg" width={468} height={34} className='md:hidden' alt=''/>
            </div>
            <div className="pt-12 px-6 pb-10 text-center md:w-2/3 md:pb-0 md:pl-12 md:pt-0 md:text-left lg:w-4/5 lg:pb-4">
              <h2 className="mb-4 text-left font-display text-5xl font-bold text-primary-700">{t('banner.title')}</h2>
              <p className="pb-4 text-left text-lg font-normal md:w-4/5">{t('banner.text')}</p>
              <Button id="quiz-dialog-trigger" size="large" onClick={handleOnQuizDialogTriggerClick}>
                {t('banner.quiz')}
              </Button>
            </div>
          </div>
        </section>
        <section>
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="h2 text-primary-700">{t(`sections.${index}.title`)}</h2>
              <p className="mb-8">{t(`sections.${index}.body`)}</p>
              <div className="grid gap-6 md:grid-cols-2 xl:md:grid-cols-3">
                {section.cards.map((_, cardIndex) => (
                  <Card key={cardIndex} className="h-full">
                    <CardActionArea
                      component={Link}
                      href={t(`sections.${index}.cards.${cardIndex}.link`)}
                      className="h-full"
                      aria-describedby={`section-${index}-card-${cardIndex}`}
                    >
                      <div className="relative">

                        <CardMedia
                          component="img"
                          alt={t(`sections.${index}.cards.${cardIndex}.title`)}
                          image={t(`sections.${index}.cards.${cardIndex}.image`)}
                          className="h-64 w-full object-cover"
                          />
                        <Image src="/assets/bottom-top.svg" width={2000} height={50} className='absolute z-30 w-full md:max-h-[300px]' alt=''/>
                      </div>
                      <CardContent>
                        <p className="mb-2 font-display text-sm font-bold">
                          {t(`sections.${index}.cards.${cardIndex}.read`)}
                        </p>
                        <h3 className="mb-2 font-display text-xl font-bold" id={`section-${index}-card-${cardIndex}`}>
                          {t(`sections.${index}.cards.${cardIndex}.title`)}
                        </h3>
                        <p className="m-0 text-black/60">{t(`sections.${index}.cards.${cardIndex}.body`)}</p>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>
        <QuizDialog open={quizDialogOpen} onClose={handleOnQuizDialogClose} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn', 'quiz'], null, ['en', 'fr'])),
    },
  }
}

export default Learn
