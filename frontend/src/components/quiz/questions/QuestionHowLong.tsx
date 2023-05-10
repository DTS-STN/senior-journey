import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const QuestionHowLong = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('yearsInCanada', values['yearsInCanada'] === answerId ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">{t('questions.question-how-long.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy={t('questions.question-how-long.id')}
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
          value={t('questions.question-how-long.option-in-canada-40-plus.value')}
          aria-label={t('questions.question-how-long.option-in-canada-40-plus.text')}
          data-cy={t('questions.question-how-long.option-in-canada-40-plus.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === t('questions.question-how-long.option-in-canada-40-plus.value')}
        >
          {t('questions.question-how-long.option-in-canada-40-plus.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-how-long.option-in-canada-10-to-39.value')}
          aria-label={t('questions.question-how-long.option-in-canada-10-to-39.text')}
          data-cy={t('questions.question-how-long.option-in-canada-10-to-39.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === t('questions.question-how-long.option-in-canada-10-to-39.value')}
        >
          {t('questions.question-how-long.option-in-canada-10-to-39.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-how-long.option-in-canada-less-than-10.value')}
          aria-label={t('questions.question-how-long.option-in-canada-less-than-10.text')}
          data-cy={t('questions.question-how-long.option-in-canada-less-than-10.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === t('questions.question-how-long.option-in-canada-less-than-10.value')}
        >
          {t('questions.question-how-long.option-in-canada-less-than-10.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-how-long.option-unsure-in-canada.value')}
          aria-label={t('questions.question-how-long.option-unsure-in-canada.text')}
          data-cy={t('questions.question-how-long.option-unsure-in-canada.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === t('questions.question-how-long.option-unsure-in-canada.value')}
        >
          {t('questions.question-how-long.option-unsure-in-canada.text')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
