import { FC, useId } from 'react'

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

interface LearnCardProps {
  desciption: string
  href: string
  id: string
  imageUrl: string
  minRead: number
  title: string
}

const LearnCard: FC<LearnCardProps> = ({ desciption, href, id, imageUrl, minRead, title }) => {
  const { t } = useTranslation('learn')
  const uniqueId = useId()
  return (
    <Card id={`${uniqueId}-card-${id}`} className="h-full">
      <CardActionArea component={Link} href={href} className="h-full" aria-describedby={`${uniqueId}-card-${id}-title`}>
        <div className="relative">
          <CardMedia component="img" alt="" image={imageUrl} className="h-64 w-full object-cover" />
          <Image src="/assets/bottom-top.svg" width={34} height={360} className="absolute bottom-0 w-full" alt="" />
        </div>
        <CardContent className="mt-4 p-8">
          <p className="mb-4 font-display text-sm font-light tracking-widest">{t('min-read', { minRead })}</p>
          <h3 className="my-4 font-display text-lg font-bold md:text-2xl" id={`${uniqueId}-card-${id}-title`}>
            {title}
          </h3>
          <p className="m-0 text-black/60">{desciption}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

interface LearnSectionProps {
  cards: ReadonlyArray<LearnCardProps>
  desciption: string
  id: string
  title: string
}

const LearnSection: FC<LearnSectionProps> = ({ cards, desciption, id, title }) => {
  const uniqueId = useId()
  return (
    <section id={`${uniqueId}-section-${id}`}>
      <h2 className="h2 text-primary-700">{title}</h2>
      <p className="mb-8">{desciption}</p>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((cardProps) => (
          <LearnCard key={cardProps.id} {...cardProps} />
        ))}
      </div>
    </section>
  )
}

const Learn: FC = () => {
  const { t } = useTranslation('learn')

  const sections: ReadonlyArray<LearnSectionProps> = [
    {
      id: 'learn-about',
      title: t('sections.learn-about.title'),
      desciption: t('sections.learn-about.body'),
      cards: [
        {
          desciption: t(`sections.learn-about.cards.sources-of-income.body`),
          href: '/learn/main-sources-of-retirement-income',
          id: 'sources-of-income',
          imageUrl: '/assets/main-sources-of-retirement-income-sm.jpg',
          minRead: 15,
          title: t(`sections.learn-about.cards.sources-of-income.title`),
        },
        {
          desciption: t(`sections.learn-about.cards.planning-to-save.body`),
          href: '/learn/planning-to-save-for-retirement',
          id: 'planning-to-save',
          imageUrl: '/assets/planning-to-save-for-retirement-sm.jpg',
          minRead: 5,
          title: t(`sections.learn-about.cards.planning-to-save.title`),
        },
      ],
    },
    {
      id: 'making-decisions',
      title: t('sections.making-decisions.title'),
      desciption: t('sections.making-decisions.body'),
      cards: [
        {
          desciption: t(`sections.making-decisions.cards.when-to-start.body`),
          href: '/learn/deciding-when-to-start-your-public-pensions',
          id: 'when-to-start',
          imageUrl: '/assets/deciding-when-to-start-your-public-pensions-sm.jpg',
          minRead: 15,
          title: t(`sections.making-decisions.cards.when-to-start.title`),
        },
        {
          desciption: t(`sections.making-decisions.cards.from-work-to-retirement.body`),
          href: '/learn/going-from-work-to-retirement',
          id: 'from-work-to-retirement',
          imageUrl: '/assets/going-from-work-to-retirement-sm.jpg',
          minRead: 10,
          title: t(`sections.making-decisions.cards.from-work-to-retirement.title`),
        },
        {
          desciption: t(`sections.making-decisions.cards.rules-of-thumb.body`),
          href: '/learn/rules-of-thumb-for-public-pensions',
          id: 'rules-of-thumb',
          imageUrl: '/assets/rules-of-thumb-for-public-pensions-sm.jpg',
          minRead: 9,
          title: t(`sections.making-decisions.cards.rules-of-thumb.title`),
        },
      ],
    },
    {
      id: 'stories',
      title: t('sections.stories.title'),
      desciption: t('sections.stories.body'),
      cards: [
        {
          desciption: t(`sections.stories.cards.fred.body`),
          href: '/learn/case-studies/fred',
          id: 'fred',
          imageUrl: '/assets/fred-decides-when-to-take-his-pensions-sm.jpg',
          minRead: 17,
          title: t(`sections.stories.cards.fred.title`),
        },
        {
          desciption: t(`sections.stories.cards.bonnie.body`),
          href: '/learn/case-studies/bonnie',
          id: 'bonnie',
          imageUrl: '/assets/bonnie-delays-to-reduce-the-savings-she-needs-sm.jpg',
          minRead: 20,
          title: t(`sections.stories.cards.bonnie.title`),
        },
        {
          desciption: t(`sections.stories.cards.keith.body`),
          href: '/learn/case-studies/keith',
          id: 'keith',
          imageUrl: '/assets/keith-combines-his-work-with-his-public-pensions-sm.jpg',
          minRead: 17,
          title: t(`sections.stories.cards.keith.title`),
        },
      ],
    },
  ]

  return (
    <>
      <NextSeo
        title={t('header')}
        description={t('meta.description')}
        additionalMetaTags={[getDCTermsTitle(t('header'))]}
      />
      <Layout
        breadcrumbItems={[
          {
            link: '/',
            text: t('common:application-name'),
          },
        ]}
      >
        <HeroBanner
          imageProps={{
            alt: '',
            className: 'md:object-right-bottom',
            height: 427,
            src: '/assets/learn-banner.jpg',
            width: 640,
          }}
        >
          <h1 className="mb-2 font-display text-4xl font-bold text-primary-700 md:mb-4 md:text-6xl">
            {t('banner.title')}
          </h1>
          <p>{t('banner.text')}</p>
          <Button component={Link} id="quiz-dialog-link" size="large" href="/quiz">
            {t('banner.quiz')}
          </Button>
        </HeroBanner>
        {sections.map((sectionProps, index) => (
          <LearnSection key={sectionProps.id} {...sectionProps} />
        ))}
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'learn'])),
    },
  }
}

export default Learn
