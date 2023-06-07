import React, { FC } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormikProps, FormikValues } from 'formik'
import { useTranslation } from 'react-i18next'

import { QuizFormState } from '../../../lib/types'

export interface QuestionFeelPreparedProps extends FormikProps<FormikValues | QuizFormState> {
  currentStepIndex: number
}

export const QuestionFeelPrepared: FC<QuestionFeelPreparedProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslation('quiz')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string | null) => {
    setFieldValue('financialPreparedness', answerId ?? '')
  }

  return (
    <div>
      <h5 className="h5 mb-4">{t('questions.question-feel.title')}</h5>
      <p className="text-sm">{t('questions.question-feel.subtitle')}</p>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy="question-feel"
        fullWidth={true}
        className="gap-4"
        value={values.financialPreparedness}
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
          value="very-unprepared"
          aria-label={t('questions.question-feel.option-very-unprepared')}
          data-cy="very-unprepared-button"
        >
          {t('questions.question-feel.option-very-unprepared')}
        </ToggleButton>
        <ToggleButton
          value="unprepared"
          aria-label={t('questions.question-feel.option-unprepared')}
          data-cy="unprepared-button"
        >
          {t('questions.question-feel.option-unprepared')}
        </ToggleButton>
        <ToggleButton
          value="unsure-preparedness"
          aria-label={t('questions.question-feel.option-unsure-preparedness')}
          data-cy="unsure-preparedness-button"
        >
          {t('questions.question-feel.option-unsure-preparedness')}
        </ToggleButton>
        <ToggleButton
          value="prepared"
          aria-label={t('questions.question-feel.option-prepared')}
          data-cy="prepared-button"
        >
          {t('questions.question-feel.option-prepared')}
        </ToggleButton>
        <ToggleButton
          value="very-prepared"
          aria-label={t('questions.question-feel.option-very-prepared')}
          data-cy="very-prepared-button"
        >
          {t('questions.question-feel.option-very-prepared')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
