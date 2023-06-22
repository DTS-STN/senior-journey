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
  const { t } = useTranslation(['quiz', 'common'])
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
        description={t('landing.meta.description')}
        additionalMetaTags={[getDCTermsTitle(t('landing.header'))]}
      />
      <Layout
        hideChecklist={true}
        breadcrumbItems={[
          {
            link: '/',
            text: t('common:application-name'),
          },
        ]}
        hideFooter="print"
        hideHeader="print"
      >
        <h1 className="h1 mb-8 text-primary-700 md:mb-12 md:rounded-3xl md:bg-gray-surface md:p-6">
          {t('landing.header')}
        </h1>
        <h2 id="take-this-quiz" className="h4 mb-4 mt-8">
          {t('landing.p1')}
        </h2>
        <p>{t('landing.p2')}</p>
        <h2 id="what-you-ll-need" className="h4 mb-4 mt-8">
          {t('landing.whatyouneed')}
        </h2>
        <p>{t('landing.p3')}</p>
        <ul className="list-inside list-disc space-y-1 pl-1">
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
        <h2 id="time-to-complete-survey" className="h4 mb-4 mt-8">
          {t('landing.timetocomplete')}
        </h2>
        <p className="mb-12">
          <WatchLaterIcon className="mr-4 inline text-2xl" />
          {t('landing.minutes')}
        </p>
        <Button
          onClick={handleOnQuizDialogTriggerClick}
          data-cy="button-start-the-quiz"
          size="large"
          className="w-full"
          data-gc-analytics-customclick={`ESDC-EDSC:${t('landing.header')}:${t('landing.start-the-quiz')}`}
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
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'quiz'])),
    },
  }
}

export default Quiz
