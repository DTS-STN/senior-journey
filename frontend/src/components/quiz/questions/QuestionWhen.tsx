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
        data-cy={t('questions.question-when.id')}
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
          value={t('questions.question-when.option-pre-60.value')}
          aria-label={t('questions.question-when.option-pre-60.text')}
          data-cy={t('questions.question-when.option-pre-60.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === t('questions.question-when.option-pre-60.value')}
        >
          {t('questions.question-when.option-pre-60.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-when.option-between-60-and-65.value')}
          aria-label={t('questions.question-when.option-between-60-and-65.text')}
          data-cy={t('questions.question-when.option-between-60-and-65.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === t('questions.question-when.option-between-60-and-65.value')}
        >
          {t('questions.question-when.option-between-60-and-65.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-when.option-at-65.value')}
          aria-label={t('questions.question-when.option-at-65.text')}
          data-cy={t('questions.question-when.option-at-65.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === t('questions.question-when.option-at-65.value')}
        >
          {t('questions.question-when.option-at-65.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-when.option-between-65-and-70.value')}
          aria-label={t('questions.question-when.option-between-65-and-70.text')}
          data-cy={t('questions.question-when.option-between-65-and-70.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === t('questions.question-when.option-between-65-and-70.value')}
        >
          {t('questions.question-when.option-between-65-and-70.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-when.option-after-70.value')}
          aria-label={t('questions.question-when.option-after-70.text')}
          data-cy={t('questions.question-when.option-after-70.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === t('questions.question-when.option-after-70.valie')}
        >
          {t('questions.question-when.option-after-70.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-when.option-unsure-retirement-age.value')}
          aria-label={t('questions.question-when.option-unsure-retirement-age.text')}
          data-cy={t('questions.question-when.option-unsure-retirement-age.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === t('questions.question-when.option-unsure-retirement-age.value')}
        >
          {t('questions.question-when.option-unsure-retirement-age.text')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
