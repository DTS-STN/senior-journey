import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const QuestionWhere = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('retirementTimeframe', values['retirementTimeframe'] === answerId ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">{t('questions.question-where.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy={t('questions.question-where.id')}
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
          value={t('questions.question-where.option-canada-ft.value')}
          aria-label={t('questions.question-where.option-canada-ft.text')}
          data-cy={t('questions.question-where.option-canada-ft.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === t('questions.question-where.option-canada-ft.value')}
        >
          {t('questions.question-where.option-canada-ft.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-where.option-canada-pt-60-or-more.value')}
          aria-label={t('questions.question-where.option-canada-pt-60-or-more.text')}
          data-cy={t('questions.question-where.option-canada-pt-60-or-more.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === t('questions.question-where.option-canada-pt-60-or-more.value')}
        >
          {t('questions.question-where.option-canada-pt-60-or-more.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-where.option-canada-pt-less-than-60.value')}
          aria-label={t('questions.question-where.option-canada-pt-less-than-60.text')}
          data-cy={t('questions.question-where.option-canada-pt-less-than-60.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === t('questions.question-where.option-canada-pt-less-than-60.value')}
        >
          {t('questions.question-where.option-canada-pt-less-than-60.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-where.option-outside-canada.value')}
          aria-label={t('questions.question-where.option-outside-canada.text')}
          data-cy={t('questions.question-where.option-outside-canada.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === t('questions.question-where.option-outside-canada.value')}
        >
          {t('questions.question-where.option-outside-canada.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-where.option-unsure-retirement-living.value')}
          aria-label={t('questions.question-where.option-unsure-retirement-living.text')}
          data-cy={t('questions.question-where.option-unsure-retirement-living.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === t('questions.question-where.option-unsure-retirement-living.value')}
        >
          {t('questions.question-where.option-unsure-retirement-living.text')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
