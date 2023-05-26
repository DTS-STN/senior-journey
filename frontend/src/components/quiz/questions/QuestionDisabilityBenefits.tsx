import React, { FC } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormikProps, FormikValues } from 'formik'
import { useTranslation } from 'react-i18next'

import { QuizFormState } from '../../../lib/types'

export interface QuestionDisabilityBenefitsProps extends FormikProps<FormikValues | QuizFormState> {
  currentStepIndex: number
}

export const QuestionDisabilityBenefits: FC<QuestionDisabilityBenefitsProps> = ({
  isSubmitting,
  setFieldValue,
  values,
}) => {
  const { t } = useTranslation('quiz')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string | null) => {
    if (!isSubmitting) {
      setFieldValue('hasCppDisabilityBenefits', answerId ?? '')
    }
  }

  return (
    <div>
      <h5 className="h5 mb-4">{t('questions.question-disability-benefits.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy="question-disability-benefits"
        fullWidth={true}
        className="gap-4"
        value={values.hasCppDisabilityBenefits}
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
        <ToggleButton
          value="cppd-yes"
          aria-label={t('questions.question-disability-benefits.option-cppd-yes')}
          data-cy="cppd-yes-button"
        >
          {t('questions.question-disability-benefits.option-cppd-yes')}
        </ToggleButton>
        <ToggleButton
          value="cppd-no"
          aria-label={t('questions.question-disability-benefits.option-cppd-no')}
          data-cy="cppd-no-button"
        >
          {t('questions.question-disability-benefits.option-cppd-no')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
