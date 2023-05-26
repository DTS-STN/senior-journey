import React, { FC } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormikProps, FormikValues } from 'formik'
import { useTranslation } from 'react-i18next'

import { QuizFormState } from '../../../lib/types'

export interface QuestionWhenProps extends FormikProps<FormikValues | QuizFormState> {
  currentStepIndex: number
}

export const QuestionWhen: FC<QuestionWhenProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslation('quiz')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string | null) => {
    setFieldValue('retirementAge', answerId ?? '')
  }

  return (
    <div>
      <h5 className="h5 mb-4">{t('questions.question-when.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        data-cy="question-when"
        exclusive
        fullWidth={true}
        className="gap-4"
        value={values.retirementAge}
        onChange={handleChange}
        color="primary"
        size="large"
        sx={{
          '& .MuiToggleButton-root': {
            'borderRadius': '4px',
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
        <ToggleButton value="pre-60" aria-label={t('questions.question-when.option-pre-60')} data-cy="pre-60-button">
          {t('questions.question-when.option-pre-60')}
        </ToggleButton>
        <ToggleButton
          value="between-60-and-65"
          aria-label={t('questions.question-when.option-between-60-and-65')}
          data-cy="between-60-and-65-button"
        >
          {t('questions.question-when.option-between-60-and-65')}
        </ToggleButton>
        <ToggleButton value="at-65" aria-label={t('questions.question-when.option-at-65')} data-cy="at-65-button">
          {t('questions.question-when.option-at-65')}
        </ToggleButton>
        <ToggleButton
          value="between-65-and-70"
          aria-label={t('questions.question-when.option-between-65-and-70')}
          data-cy="between-65-and-70-button"
        >
          {t('questions.question-when.option-between-65-and-70')}
        </ToggleButton>
        <ToggleButton
          value="after-70"
          aria-label={t('questions.question-when.option-after-70')}
          data-cy="after-70-button"
        >
          {t('questions.question-when.option-after-70')}
        </ToggleButton>
        <ToggleButton
          value="unsure-retirement-age"
          aria-label={t('questions.question-when.option-unsure-retirement-age')}
          data-cy="unsure-retirement-age-button"
        >
          {t('questions.question-when.option-unsure-retirement-age')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
