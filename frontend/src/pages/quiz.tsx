import { FC, useState } from 'react'

import WatchLaterIcon from '@mui/icons-material/WatchLater'
import { Button } from '@mui/material'
import { GetServerSideProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import Layout from '../components/Layout'
import { QuizDialog } from '../components/quiz/QuizDialog'
import { getDCTermsTitle } from '../utils/seo-utils'

const Quiz: FC = () => {
  const { t, i18n } = useTranslation('quiz')
  const en = i18n.getFixedT('en', 'quiz')
  const fr = i18n.getFixedT('fr', 'quiz')
  const [quizDialogOpen, setQuizDialogOpen] = useState(false)

  const handleOnQuizDialogTriggerClick = () => {
    setQuizDialogOpen(true)
  }

  const handleOnQuizDialogClose = () => {
    setQuizDialogOpen(false)
  }

  return (
    <>
      <NextSeo
        title={t('landing.header')}
        additionalMetaTags={[getDCTermsTitle(en('landing.header'), fr('landing.header'))]}
      />
      <Layout
        hideChecklist={true}
        breadcrumbItems={[
          {
            link: t('breadcrumbs.home.link'),
            text: t('breadcrumbs.home.text'),
          },
        ]}
        hideFooter="print"
        hideHeader="print"
      >
        <h1 className="mb-8 font-display text-2xl font-medium md:mb-12 md:rounded-3xl md:bg-gray-surface md:p-6 md:text-4xl md:text-primary-700">
          {t('landing.header')}
        </h1>
        <h2 id="take-this-quiz" className="my-4 font-display text-xl font-medium">
          {t('landing.p1')}
        </h2>
        <p>{t('landing.p2')}</p>
        <h2 id="what-you-ll-need" className="my-4 font-display text-xl font-medium">
          {t('landing.whatyouneed')}
        </h2>
        <p>{t('landing.p3')}</p>
        <ul className="list-disc space-y-2 pl-10">
          <li>
            <Trans ns="quiz" i18nKey="landing.legal" />
          </li>
          <li>
            <Trans ns="quiz" i18nKey="landing.residence" />
          </li>
          <li>
            <Trans ns="quiz" i18nKey="landing.marital" />
          </li>
          <li>
            <Trans ns="quiz" i18nKey="landing.retirement" />
          </li>
        </ul>
        <h2 id="time-to-complete-survey" className="my-4 font-display text-xl font-medium">
          {t('landing.timetocomplete')}
        </h2>
        <p>
          <WatchLaterIcon className="mr-4 inline text-2xl" />
          {t('landing.minutes')}
        </p>
        <Button
          onClick={handleOnQuizDialogTriggerClick}
          data-cy="button-start-the-quiz"
          size="large"
          className="w-full md:w-1/2"
        >
          {t('landing.start-the-quiz')}
        </Button>
        <QuizDialog open={quizDialogOpen} onClose={handleOnQuizDialogClose} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'quiz'], null, ['en', 'fr'])),
    },
  }
}

export default Quiz
