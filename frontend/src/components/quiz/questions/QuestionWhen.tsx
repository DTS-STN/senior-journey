import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const QuestionWhen = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('retirementAge', values['retirementAge'] === answerId ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">{t('questions.question-when.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        data-cy="question-when"
        exclusive
        fullWidth={true}
        className="my-4"
        value={value}
        onChange={handleChange}
        sx={{
          '& .MuiToggleButton-root:not(:first-of-type)': {
            borderTop: '1px solid #e1e4e7',
            borderRadius: '4px',
          },
          '.MuiToggleButton-root.Mui-selected': {
            'backgroundColor': '#004f56',
            'color': '#f1f1f1',
            '&.Mui-selected:hover': {
              backgroundColor: '#004f56',
            },
          },
        }}
      >
        <ToggleButton
          value="pre-60"
          aria-label={t('questions.question-when.option-pre-60')}
          data-cy="pre-60-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'pre-60'}
        >
          {t('questions.question-when.option-pre-60')}
        </ToggleButton>
        <ToggleButton
          value="between-60-and-65"
          aria-label={t('questions.question-when.option-between-60-and-65')}
          data-cy="between-60-and-65-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'between-60-and-65'}
        >
          {t('questions.question-when.option-between-60-and-65')}
        </ToggleButton>
        <ToggleButton
          value="at-65"
          aria-label={t('questions.question-when.option-at-65')}
          data-cy="at-65-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'at-65'}
        >
          {t('questions.question-when.option-at-65')}
        </ToggleButton>
        <ToggleButton
          value="between-65-and-70"
          aria-label={t('questions.question-when.option-between-65-and-70')}
          data-cy="between-65-and-70-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'between-65-and-70'}
        >
          {t('questions.question-when.option-between-65-and-70')}
        </ToggleButton>
        <ToggleButton
          value="after-70"
          aria-label={t('questions.question-when.option-after-70')}
          data-cy="after-70-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'after-70'}
        >
          {t('questions.question-when.option-after-70')}
        </ToggleButton>
        <ToggleButton
          value="unsure-retirement-age"
          aria-label={t('questions.question-when.option-unsure-retirement-age')}
          data-cy="unsure-retirement-age-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'unsure-retirement-age'}
        >
          {t('questions.question-when.option-unsure-retirement-age')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
