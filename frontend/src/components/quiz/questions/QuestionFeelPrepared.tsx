import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const QuestionFeelPrepared = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('financialPreparedness', values['financialPreparedness'] === answerId ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">{t('questions.question-feel.title')}</h5>
      <p className="mt-5 font-display text-sm font-light">{t('questions.question-feel.subtitle')}</p>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy="question-feel"
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
          value="very-unprepared"
          aria-label={t('questions.question-feel.option-very-unprepared')}
          data-cy="very-unprepared-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === 'very-unprepared'}
        >
          {t('questions.question-feel.option-very-unprepared')}
        </ToggleButton>
        <ToggleButton
          value="unprepared"
          aria-label={t('questions.question-feel.option-unprepared')}
          data-cy="unprepared-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === 'unprepared'}
        >
          {t('questions.question-feel.option-unprepared')}
        </ToggleButton>
        <ToggleButton
          value="unsure-preparedness"
          aria-label={t('questions.question-feel.option-unsure-preparedness')}
          data-cy="unsure-preparedness-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === 'unsure-preparedness'}
        >
          {t('questions.question-feel.option-unsure-preparedness')}
        </ToggleButton>
        <ToggleButton
          value="prepared"
          aria-label={t('questions.question-feel.option-prepared')}
          data-cy="prepared-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === 'prepared'}
        >
          {t('questions.question-feel.option-prepared')}
        </ToggleButton>
        <ToggleButton
          value="very-prepared"
          aria-label={t('questions.question-feel.option-very-prepared')}
          data-cy="very-prepared-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === 'very-prepared'}
        >
          {t('questions.question-feel.option-very-prepared')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
