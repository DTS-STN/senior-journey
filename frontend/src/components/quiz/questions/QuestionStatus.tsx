import React, { FC } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormikProps, FormikValues } from 'formik'
import { useTranslation } from 'react-i18next'

import { QuizFormState } from '../../../lib/types'

export interface QuestionStatusProps extends FormikProps<FormikValues | QuizFormState> {
  currentStepIndex: number
}

export const QuestionStatus: FC<QuestionStatusProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslation('quiz')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string | null) => {
    setFieldValue('legalStatus', answerId ?? '')
  }

  return (
    <div>
      <h5 className="h5 mb-4">{t('questions.question-status.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy="question-status"
        fullWidth={true}
        className="gap-4"
        value={values.legalStatus}
        onChange={handleChange}
        color="primary"
        sx={{
          '& .MuiToggleButton-root': {
            'borderRadius': '4px',
            'fontWeight': '700',
            'fontSize': '1rem',
            '&:not(:first-of-type)': {
              border: '1px solid rgba(0, 0, 0, 0.12)',
            },
          },
          '& .MuiToggleButtonGroup-grouped': {
            '&:not(:last-of-type)': {
              borderRadius: '4px',
            },
            '&:not(:first-of-type)': {
              borderRadius: '4px',
            },
          },
        }}
      >
        <ToggleButton
          value="status-citizen"
          aria-label={t('questions.question-status.option-status-citizen')}
          data-cy="status-citizen-button"
        >
          {t('questions.question-status.option-status-citizen')}
        </ToggleButton>
        <ToggleButton
          value="status-first-nation"
          aria-label={t('questions.question-status.option-status-first-nation')}
          data-cy="status-first-nation-button"
        >
          {t('questions.question-status.option-status-first-nation')}
        </ToggleButton>
        <ToggleButton
          value="status-sponsored"
          aria-label={t('questions.question-status.option-status-sponsored')}
          data-cy="status-sponsored-button"
        >
          {t('questions.question-status.option-status-sponsored')}
        </ToggleButton>
        <ToggleButton
          value="status-other"
          aria-label={t('questions.question-status.option-status-other')}
          data-cy="status-other-button"
        >
          {t('questions.question-status.option-status-other')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
