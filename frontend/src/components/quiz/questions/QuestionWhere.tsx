import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormikProps, FormikValues } from 'formik'
import { useTranslation } from 'react-i18next'

import { QuizFormState } from '../../../lib/types'

export interface QuestionWhereProps extends FormikProps<FormikValues | QuizFormState> {
  currentStepIndex: number
}

export const QuestionWhere = ({ values, setFieldValue }: QuestionWhereProps) => {
  const { t } = useTranslation('quiz')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string | null) => {
    setFieldValue('retirementTimeframe', answerId ?? '')
  }

  return (
    <div>
      <h5 className="h5 mb-4">{t('questions.question-where.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy="question-where"
        fullWidth={true}
        className="gap-4"
        value={values.retirementTimeframe}
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
          value="canada-ft"
          aria-label={t('questions.question-where.option-canada-ft')}
          data-cy="canada-ft-button"
        >
          {t('questions.question-where.option-canada-ft')}
        </ToggleButton>
        <ToggleButton
          value="canada-pt-60-or-more"
          aria-label={t('questions.question-where.option-canada-pt-60-or-more')}
          data-cy="canada-pt-60-or-more-button"
        >
          {t('questions.question-where.option-canada-pt-60-or-more')}
        </ToggleButton>
        <ToggleButton
          value="canada-pt-less-than-60"
          aria-label={t('questions.question-where.option-canada-pt-less-than-60')}
          data-cy="canada-pt-less-than-60-button"
        >
          {t('questions.question-where.option-canada-pt-less-than-60')}
        </ToggleButton>
        <ToggleButton
          value="outside-canada"
          aria-label={t('questions.question-where.option-outside-canada')}
          data-cy="outside-canada-button"
        >
          {t('questions.question-where.option-outside-canada')}
        </ToggleButton>
        <ToggleButton
          value="unsure-retirement-living"
          aria-label={t('questions.question-where.option-unsure-retirement-living')}
          data-cy="unsure-retirement-living-button"
        >
          {t('questions.question-where.option-unsure-retirement-living')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
