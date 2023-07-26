import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormikProps, FormikValues } from 'formik'
import { useTranslation } from 'react-i18next'

import { QuizFormState } from '../../../lib/types'

export interface QuestionEarnProps extends FormikProps<FormikValues | QuizFormState> {
  currentStepIndex: number
}

export const QuestionEarn = ({ values, setFieldValue }: QuestionEarnProps) => {
  const { t } = useTranslation('quiz')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string | null) => {
    setFieldValue('hasExtraIncome', answerId ?? '')
  }

  return (
    <div>
      <h5 className="h5 mb-4">{t('questions.question-earn.title')}</h5>
      <p className="text-sm">{t('questions.question-earn.subtitle')}</p>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy="question-earn"
        fullWidth={true}
        className="gap-4"
        value={values.hasExtraIncome}
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
          value="no-income"
          aria-label={t('questions.question-earn.option-no-income')}
          data-cy="no-income-button"
        >
          {t('questions.question-earn.option-no-income')}
        </ToggleButton>
        <ToggleButton value="yes-income" aria-label={t('questions.question-earn.option-yes-income')}>
          {t('questions.question-earn.option-yes-income')}
        </ToggleButton>
        <ToggleButton
          value="unsure-income"
          aria-label={t('questions.question-earn.option-unsure-income')}
          data-cy="unsure-income-button"
        >
          {t('questions.question-earn.option-unsure-income')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
