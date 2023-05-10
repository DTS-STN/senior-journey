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
        data-cy={t('questions.question-feel.id')}
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
          aria-label={t('questions.question-feel.option-very-unprepared.text')}
          data-cy={t('questions.question-feel.option-very-unprepared.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === 'very-unprepared'}
        >
          {t('questions.question-feel.option-very-unprepared.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-feel.option-unprepared.value')}
          aria-label={t('questions.question-feel.option-unprepared.text')}
          data-cy={t('questions.question-feel.option-unprepared.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === t('questions.question-feel.option-unprepared.value')}
        >
          {t('questions.question-feel.option-unprepared.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-feel.option-unsure-preparedness.value')}
          aria-label={t('questions.question-feel.option-unsure-preparedness.text')}
          data-cy={t('questions.question-feel.option-unsure-preparedness.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === t('questions.question-feel.option-unsure-preparedness.value')}
        >
          {t('questions.question-feel.option-unsure-preparedness.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-feel.option-prepared.value')}
          aria-label={t('questions.question-feel.option-prepared.text')}
          data-cy={t('questions.question-feel.option-prepared.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === t('questions.question-feel.option-prepared.value')}
        >
          {t('questions.question-feel.option-prepared.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-feel.option-very-prepared.value')}
          aria-label={t('questions.question-feel.option-very-prepared.text')}
          data-cy={t('questions.question-feel.option-very-prepared.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['financialPreparedness'] === t('questions.question-feel.option-very-prepared.value')}
        >
          {t('questions.question-feel.option-very-prepared.text')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
