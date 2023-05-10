import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const QuestionStatus = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('legalStatus', values['legalStatus'] === answerId ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">{t('questions.question-status.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy={t('questions.question-status.id')}
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
          value={t('questions.question-status.option-status-citizen.value')}
          aria-label={t('questions.question-status.option-status-citizen.text')}
          data-cy={t('questions.question-status.option-status-citizen.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === t('questions.question-status.option-status-citizen.value')}
        >
          {t('questions.question-status.option-status-citizen.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-status.option-status-first-nation.value')}
          aria-label={t('questions.question-status.option-status-first-nation.text')}
          data-cy={t('questions.question-status.option-status-first-nation.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === t('questions.question-status.option-status-first-nation.value')}
        >
          {t('questions.question-status.option-status-first-nation.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-status.option-status-sponsored.value')}
          aria-label={t('questions.question-status.option-status-sponsored.text')}
          data-cy={t('questions.question-status.option-status-sponsored.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === t('questions.question-status.option-status-sponsored.value')}
        >
          {t('questions.question-status.option-status-sponsored.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-status.option-status-other.value')}
          aria-label={t('questions.question-status.option-status-other.text')}
          data-cy={t('questions.question-status.option-status-other.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === t('questions.question-status.option-status-other.value')}
        >
          {t('questions.question-status.option-status-other.text')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
