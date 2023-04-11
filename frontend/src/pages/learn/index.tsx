import { FC } from 'react'

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '../../components/Layout'

const Learn: FC = () => {
  const { t } = useTranslation('learn')
  const sections = t<string, { cards: any[] }[]>('sections', {
    returnObjects: true,
  })

  return (
    <Layout>
      <NextSeo title={t('header')} />
      <h1 className="sr-only">{t('header')}</h1>
      <section className="rounded-3xl bg-[#f5f5f5] ">
        <div className="flex flex-col items-center md:flex-row-reverse">
          <div className="m-12 w-1/2 md:w-1/3 lg:w-1/5">
            <Image
              src="/assets/learn-banner.svg"
              width={742}
              height={548}
              sizes="100%"
              alt=""
              priority
            />
          </div>
          <div className="w-full px-6 pb-10 text-center md:w-2/3 md:pb-10 md:pl-12 md:text-left lg:w-4/5 lg:pb-4">
            <h2 className="h3 text-left text-5xl font-bold text-primary-700 xl:text-5xl">
              {t('banner.title')}
            </h2>
            <p className="pb-4 text-left text-lg font-normal md:w-4/5">
              {t('banner.text')}
            </p>
            <Link
              href="#"
              className="rounded bg-primary-700 px-6 py-4 text-center
            font-display text-sm font-bold uppercase text-white no-underline decoration-white
            shadow-xl visited:text-white visited:decoration-white hover:bg-primary-800 hover:text-white lg:text-base"
            >
              {t('banner.quiz')}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <Typography
          variant="h2"
          className="mb-7 mt-12 font-display text-3xl font-semibold text-primary-700"
        >
          {t('explore')}
        </Typography>
        {sections.map((section, index) => (
          <div key={index}>
            <Typography
              variant="h3"
              className="mb-3.5 mt-8 font-display text-2xl font-light"
            >
              {t(`sections.${index}.title`)}
            </Typography>
            <Typography variant="paragraph" className="font-body font-normal">
              {t(`sections.${index}.body`)}
            </Typography>
            <div className="grid gap-6 md:grid-cols-2 xl:md:grid-cols-3">
              {section.cards.map((_, cardIndex) => (
                <Card
                  key={cardIndex}
                  className="h-full rounded elevation-1 focus-within:elevation-8 hover:elevation-8"
                  shadow={false}
                >
                  <Link
                    href={t(`sections.${index}.cards.${cardIndex}.link`)}
                    className="h-full no-underline visited:text-inherit hover:text-inherit focus:text-inherit"
                    aria-describedby={`section-${index}-card-${cardIndex}`}
                  >
                    <CardHeader
                      shadow={false}
                      className="relative m-0 h-64 w-full rounded-b-none rounded-t bg-secondary-50 pt-6"
                    >
                      <Image
                        src={t(`sections.${index}.cards.${cardIndex}.image`)}
                        alt={t(`sections.${index}.cards.${cardIndex}.title`)}
                        className="h-full w-full"
                        width={380}
                        height={250}
                      />
                    </CardHeader>
                    <CardBody className="text-left">
                      <Typography className="mb-2 font-display text-xs font-semibold text-black">
                        {t(`sections.${index}.cards.${cardIndex}.read`)}
                      </Typography>
                      <Typography
                        variant="h4"
                        className="mb-2 font-display text-xl font-bold text-black"
                        id={`section-${index}-card-${cardIndex}`}
                      >
                        {t(`sections.${index}.cards.${cardIndex}.title`)}
                      </Typography>
                      <Typography className="text-gray-surface font-body">
                        {t(`sections.${index}.cards.${cardIndex}.body`)}
                      </Typography>
                    </CardBody>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'learn',
      ])),
    },
  }
}

export default Learn
