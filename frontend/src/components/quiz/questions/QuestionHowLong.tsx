import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormikProps, FormikValues } from 'formik'
import { useTranslation } from 'react-i18next'

import { QuizFormState } from '../../../lib/types'

export interface QuestionHowLongProps extends FormikProps<FormikValues | QuizFormState> {
  currentStepIndex: number
}

export const QuestionHowLong = ({ values, setFieldValue }: QuestionHowLongProps) => {
  const { t } = useTranslation('quiz')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string | null) => {
    setFieldValue('yearsInCanada', answerId ?? '')
  }

  return (
    <div>
      <h5 className="h5 mb-4">{t('questions.question-how-long.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy="question-how-long"
        fullWidth={true}
        className="gap-4"
        value={values.yearsInCanada}
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
          value="in-canada-40-plus"
          aria-label={t('questions.question-how-long.option-in-canada-40-plus')}
          data-cy="in-canada-40-plus"
        >
          {t('questions.question-how-long.option-in-canada-40-plus')}
        </ToggleButton>
        <ToggleButton
          value="in-canada-10-to-39"
          aria-label={t('questions.question-how-long.option-in-canada-10-to-39')}
          data-cy="in-canada-10-to-39"
        >
          {t('questions.question-how-long.option-in-canada-10-to-39')}
        </ToggleButton>
        <ToggleButton
          value="in-canada-less-than-10"
          aria-label={t('questions.question-how-long.option-in-canada-less-than-10')}
          data-cy="in-canada-less-than-10"
        >
          {t('questions.question-how-long.option-in-canada-less-than-10')}
        </ToggleButton>
        <ToggleButton
          value="unsure-in-canada"
          aria-label={t('questions.question-how-long.option-unsure-in-canada')}
          data-cy="unsure-in-canada"
        >
          {t('questions.question-how-long.option-unsure-in-canada')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
