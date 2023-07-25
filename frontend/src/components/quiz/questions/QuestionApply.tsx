import React from 'react'

import { Checkbox, FormControlLabel, FormGroup, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormikProps, FormikValues } from 'formik'
import { useTranslation } from 'react-i18next'

import { QuizFormState } from '../../../lib/types'

export interface QuestionApplyProps extends FormikProps<FormikValues | QuizFormState> {
  currentStepIndex: number
}

export const QuestionApply = ({ values, setFieldValue }: QuestionApplyProps) => {
  const { t } = useTranslation('quiz')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string | null) => {
    setFieldValue('hasChildren', answerId ?? '')
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const field = e.target.name
    const value = e.target.value
    setFieldValue(field, values[field] ? '' : value)
  }

  return (
    <div>
      <h5 className="h5 mb-4">{t('questions.question-apply.question-marital-status.title')}</h5>
      <FormGroup className="mb-4" data-cy="apply-subquestion-marital-status">
        <FormControlLabel
          control={
            <Checkbox name="single" value="single" checked={values.single === 'single'} onChange={handleCheckbox} />
          }
          data-cy="single-button"
          label={t('questions.question-apply.question-marital-status.option-single')}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="marriedOrCommonLaw"
              value="married-or-cl"
              checked={values.marriedOrCommonLaw === 'married-or-cl'}
              onChange={handleCheckbox}
            />
          }
          data-cy="married-or-cl-button"
          label={t('questions.question-apply.question-marital-status.option-married-or-cl')}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="divorcedOrSeparated"
              value="divorced-or-separated"
              checked={values.divorcedOrSeparated === 'divorced-or-separated'}
              onChange={handleCheckbox}
            />
          }
          data-cy="divorced-or-separated-button"
          label={t('questions.question-apply.question-marital-status.option-divorced-or-separated')}
        />
        <FormControlLabel
          control={
            <Checkbox name="widowed" value="widowed" checked={values.widowed === 'widowed'} onChange={handleCheckbox} />
          }
          data-cy="widowed-button"
          label={t('questions.question-apply.question-marital-status.option-widowed')}
        />
      </FormGroup>
      <h5 className="h5 mb-4">{t('questions.question-apply.question-children.title')}</h5>
      <ToggleButtonGroup
        data-cy="apply-subquestion-children"
        orientation="vertical"
        exclusive
        fullWidth={true}
        className="gap-4"
        value={values.hasChildren}
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
          value="no-kids"
          aria-label={t('questions.question-apply.question-children.option-no-kids')}
          data-cy="no-kids-button"
        >
          {t('questions.question-apply.question-children.option-no-kids')}
        </ToggleButton>
        <ToggleButton
          value="yes-kids"
          aria-label={t('questions.question-apply.question-children.option-yes-kids')}
          data-cy="yes-kids-button"
        >
          {t('questions.question-apply.question-children.option-yes-kids')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
