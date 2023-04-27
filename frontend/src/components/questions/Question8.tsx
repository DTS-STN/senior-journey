import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const Question8 = ({ values, setFieldValue }: QuestionProps) => {
  let { t } = useTranslation('learn')
  const [value, setValue] = React.useState('')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    answerId: string
  ) => {
    setValue(answerId)
    setFieldValue(
      'hasCppDisabilityBenefits',
      values['hasCppDisabilityBenefits'] === answerId ? '' : (answerId ?? '')
    )
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">
        {t('quiz.questions.question-8.title')}
      </h5>
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
          value="CPPDYes"
          aria-label={t('quiz.questions.question-8.option-1')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasCppDisabilityBenefits'] === 'CPPDYes'}
        >
          {t('quiz.questions.question-8.option-1')}
        </ToggleButton>
        <ToggleButton
          value="CPPDNo"
          aria-label={t('quiz.questions.question-8.option-2')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasCppDisabilityBenefits'] === 'CPPDNo'}
        >
          {t('quiz.questions.question-8.option-2')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default Question8
