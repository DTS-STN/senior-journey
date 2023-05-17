import { FC } from 'react'

import { Button, Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import { HeroBanner } from '../../components/HeroBanner'
import Layout from '../../components/Layout'
import { getDCTermsTitle } from '../../utils/seo-utils'

const Learn: FC = () => {
  const { t, i18n } = useTranslation('learn')
  const en = i18n.getFixedT('en', 'learn')
  const fr = i18n.getFixedT('fr', 'learn')

  const sections = t<string, { cards: any[] }[]>('sections', {
    returnObjects: true,
  })

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

        <HeroBanner
          imageProps={{
            alt: '',
            className: 'md:object-right-bottom',
            height: 427,
            src: '/assets/learn-banner.jpg',
            width: 640,
          }}
        >
          <h2 className="mb-2 font-display text-4xl font-bold text-primary-700 md:mb-4 md:text-6xl">
            {t('banner.title')}
          </h2>
          <p>{t('banner.text')}</p>
          <Button component={Link} id="quiz-dialog-link" size="large" href="/quiz">
            {t('banner.quiz')}
          </Button>
        </HeroBanner>

        {sections.map((section, index) => (
          <section key={index}>
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
                      <Image
                        src="/assets/bottom-top.svg"
                        width={34}
                        height={360}
                        className="absolute bottom-0 w-full"
                        alt=""
                      />
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
          </section>
        ))}
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn'], null, ['en', 'fr'])),
    },
  }
}

export default Learn
