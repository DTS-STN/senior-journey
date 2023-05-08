import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const Question6 = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('legalStatus', values['legalStatus'] === answerId ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">{t('questions.question-6.title')}</h5>
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
          value="status-citizen"
          aria-label={t('questions.question-6.option-1')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === 'status-citizen'}
        >
          {t('questions.question-6.option-1')}
        </ToggleButton>
        <ToggleButton
          value="status-first-nation"
          aria-label={t('questions.question-6.option-2')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === 'status-first-nation'}
        >
          {t('questions.question-6.option-2')}
        </ToggleButton>
        <ToggleButton
          value="status-sponsored"
          aria-label={t('questions.question-6.option-3')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === 'status-sponsored'}
        >
          {t('questions.question-6.option-3')}
        </ToggleButton>
        <ToggleButton
          value="status-other"
          aria-label={t('questions.question-6.option-4')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === 'status-other'}
        >
          {t('questions.question-6.option-4')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
