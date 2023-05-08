import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const Question1 = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('retirementAge', values['retirementAge'] === answerId ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">{t('questions.question-1.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
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
          aria-label={t('questions.question-1.option-1')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'pre-60'}
        >
          {t('questions.question-1.option-1')}
        </ToggleButton>
        <ToggleButton
          value="between-60-and-65"
          aria-label={t('questions.question-1.option-2')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'between-60-and-65'}
        >
          {t('questions.question-1.option-2')}
        </ToggleButton>
        <ToggleButton
          value="at-65"
          aria-label={t('questions.question-1.option-3')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'at-65'}
        >
          {t('questions.question-1.option-3')}
        </ToggleButton>
        <ToggleButton
          value="between-65-and-70"
          aria-label={t('questions.question-1.option-4')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'between-65-and-70'}
        >
          {t('questions.question-1.option-4')}
        </ToggleButton>
        <ToggleButton
          value="after-70"
          aria-label={t('questions.question-1.option-5')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'after-70'}
        >
          {t('questions.question-1.option-5')}
        </ToggleButton>
        <ToggleButton
          value="unsure-retirement-age"
          aria-label={t('questions.question-1.option-6')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'unsure-retirement-age'}
        >
          {t('questions.question-1.option-6')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
