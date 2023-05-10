import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const QuestionDisabilityBenefits = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('hasCppDisabilityBenefits', values['hasCppDisabilityBenefits'] === answerId ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">{t('questions.question-disability-benefits.title')}</h5>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        data-cy={t('questions.question-disability-benefits.id')}
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
          value={t('questions.question-disability-benefits.option-cppd-yes.value')}
          aria-label={t('questions.question-disability-benefits.option-cppd-yes.text')}
          data-cy={t('questions.question-disability-benefits.option-cppd-yes.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasCppDisabilityBenefits'] === t('questions.question-disability-benefits.option-cppd-yes.value')}
        >
          {t('questions.question-disability-benefits.option-cppd-yes.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-disability-benefits.option-cppd-no.value')}
          aria-label={t('questions.question-disability-benefits.option-cppd-no.text')}
          data-cy={t('questions.question-disability-benefits.option-cppd-no.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasCppDisabilityBenefits'] === t('questions.question-disability-benefits.option-cppd-no.value')}
        >
          {t('questions.question-disability-benefits.option-cppd-no.text')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
