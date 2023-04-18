import { FC } from 'react'

import { Trans, useTranslation } from 'next-i18next'
import { MdWatchLater } from 'react-icons/md'

const QuizLandingPage: FC = () => {
  const { t } = useTranslation('learn')
  return (
    <div className="">
      <p>{t('quiz.landing.p1')}</p>
      <p>{t('quiz.landing.p2')}</p>
      <h6 className="mb-4 font-display text-xl font-bold">
        {t('quiz.landing.whatyouneed')}
      </h6>
      <p>{t('quiz.landing.p3')}</p>
      <ul className="ml-6 list-disc">
        <li>
          <Trans ns="learn" i18nKey="quiz.landing.legal" />
        </li>
        <li>
          <Trans ns="learn" i18nKey="quiz.landing.residence" />
        </li>
        <li>
          <Trans ns="learn" i18nKey="quiz.landing.marital" />
        </li>
        <li>
          <Trans ns="learn" i18nKey="quiz.landing.retirement" />
        </li>
      </ul>
      <h6 className="mb-2 mt-4 font-display text-xl font-bold">
        {t('quiz.landing.timetocomplete')}
      </h6>
      <p className="mb-32">
        <MdWatchLater className="mr-4 inline text-2xl" />
        {t('quiz.landing.minutes')}
      </p>
    </div>
  )
}

export default QuizLandingPage
