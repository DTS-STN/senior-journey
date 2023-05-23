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
        data-cy='question-where'
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
          value="canada-ft"
          aria-label={t('questions.question-where.option-canada-ft')}
          data-cy="canada-ft-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === "canada-ft"}
        >
          {t('questions.question-where.option-canada-ft')}
        </ToggleButton>
        <ToggleButton
          value="canada-pt-60-or-more"
          aria-label={t('questions.question-where.option-canada-pt-60-or-more')}
          data-cy="canada-pt-60-or-more-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === "canada-pt-60-or-more"}
        >
          {t('questions.question-where.option-canada-pt-60-or-more')}
        </ToggleButton>
        <ToggleButton
          value="canada-pt-less-than-60"
          aria-label={t('questions.question-where.option-canada-pt-less-than-60')}
          data-cy="canada-pt-less-than-60-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === "canada-pt-less-than-60"}
        >
          {t('questions.question-where.option-canada-pt-less-than-60')}
        </ToggleButton>
        <ToggleButton
          value="outside-canada"
          aria-label={t('questions.question-where.option-outside-canada')}
          data-cy="outside-canada-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === "outside-canada"}
        >
          {t('questions.question-where.option-outside-canada')}
        </ToggleButton>
        <ToggleButton
          value="unsure-retirement-living"
          aria-label={t('questions.question-where.option-unsure-retirement-living')}
          data-cy="unsure-retirement-living-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === "unsure-retirement-living"}
        >
          {t('questions.question-where.option-unsure-retirement-living')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
