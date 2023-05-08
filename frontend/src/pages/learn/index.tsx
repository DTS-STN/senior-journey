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

const Learn: FC = () => {
  const { t } = useTranslation('learn')
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
    <Layout
      breadcrumbItems={[
        {
          link: t("breadcrumbs.home.link"), 
          text: t("breadcrumbs.home.text")
        }
      ]}
      >
      <NextSeo title={t('header')} />
      <h1 className="sr-only">{t('header')}</h1>
      <section className="rounded-3xl bg-[#f5f5f5] ">
        <div className="flex flex-col items-center md:flex-row-reverse">
          <div className="m-12 w-1/2 md:w-1/3 lg:w-1/5">
            <Image src="/assets/learn-banner.svg" width={742} height={548} sizes="100%" alt="" priority />
          </div>
          <div className="my-2 px-6 pb-10 text-center md:w-2/3 md:pb-10 md:pl-12 md:pt-10 md:text-left lg:w-4/5 lg:pb-4">
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
                    <CardMedia
                      component="img"
                      alt={t(`sections.${index}.cards.${cardIndex}.title`)}
                      image={t(`sections.${index}.cards.${cardIndex}.image`)}
                      className="h-72 bg-secondary-50 object-contain"
                    />
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
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn', 'quiz'])),
    },
  }
}

export default Learn
