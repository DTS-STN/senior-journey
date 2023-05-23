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
        data-cy="question-how-long"
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
          value="in-canada-40-plus"
          aria-label={t('questions.question-how-long.option-in-canada-40-plus')}
          data-cy="in-canada-40-plus"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === "in-canada-40-plus"}
        >
          {t('questions.question-how-long.option-in-canada-40-plus')}
        </ToggleButton>
        <ToggleButton
          value="in-canada-10-to-39"
          aria-label={t('questions.question-how-long.option-in-canada-10-to-39')}
          data-cy="in-canada-10-to-39"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === "in-canada-10-to-39"}
        >
          {t('questions.question-how-long.option-in-canada-10-to-39')}
        </ToggleButton>
        <ToggleButton
          value="in-canada-less-than-10"
          aria-label={t('questions.question-how-long.option-in-canada-less-than-10')}
          data-cy="in-canada-less-than-10"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === "in-canada-less-than-10"}
        >
          {t('questions.question-how-long.option-in-canada-less-than-10')}
        </ToggleButton>
        <ToggleButton
          value="unsure-in-canada"
          aria-label={t('questions.question-how-long.option-unsure-in-canada')}
          data-cy="unsure-in-canada"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === "unsure-in-canada"}
        >
          {t('questions.question-how-long.option-unsure-in-canada')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
