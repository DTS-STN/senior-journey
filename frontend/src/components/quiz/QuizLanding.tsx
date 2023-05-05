import { FC } from 'react'

import WatchLaterIcon from '@mui/icons-material/WatchLater'
import { Trans, useTranslation } from 'next-i18next'

export const QuizLanding: FC = () => {
  const { t } = useTranslation('quiz')
  return (
    <div>
      <p>{t('landing.p1')}</p>
      <p>{t('landing.p2')}</p>
      <h6 className="mb-4 font-display text-xl font-bold">{t('landing.whatyouneed')}</h6>
      <p>{t('landing.p3')}</p>
      <ul className="ml-6 list-disc">
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
      <h6 className="mb-2 mt-4 font-display text-xl font-bold">{t('landing.timetocomplete')}</h6>
      <p>
        <WatchLaterIcon className="mr-4 inline text-2xl" />
        {t('landing.minutes')}
      </p>
    </div>
  )
}
