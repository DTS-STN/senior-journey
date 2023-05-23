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
        data-cy="question-status"
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
          aria-label={t('questions.question-status.option-status-citizen')}
          data-cy="status-citizen-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === "status-citizen"}
        >
          {t('questions.question-status.option-status-citizen')}
        </ToggleButton>
        <ToggleButton
          value="status-first-nation"
          aria-label={t('questions.question-status.option-status-first-nation')}
          data-cy="status-first-nation-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === "status-first-nation"}
        >
          {t('questions.question-status.option-status-first-nation')}
        </ToggleButton>
        <ToggleButton
          value="status-sponsored"
          aria-label={t('questions.question-status.option-status-sponsored')}
          data-cy="status-sponsored-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === "status-sponsored"}
        >
          {t('questions.question-status.option-status-sponsored')}
        </ToggleButton>
        <ToggleButton
          value="status-other"
          aria-label={t('questions.question-status.option-status-other')}
          data-cy="status-other-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['legalStatus'] === "status-other"}
        >
          {t('questions.question-status.option-status-other')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
