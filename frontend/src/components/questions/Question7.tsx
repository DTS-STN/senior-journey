import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const Question7 = ({ values, setFieldValue }: QuestionProps) => {
  let { t } = useTranslation('learn')
  const [value, setValue] = React.useState('')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    answerId: string
  ) => {
    setValue(answerId)
    setFieldValue(
      'yearsInCanada',
      values['yearsInCanada'] === answerId ? '' : answerId ?? ''
    )
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">
        {t('quiz.questions.question-7.title')}
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
          value="InCanada40Plus"
          aria-label={t('quiz.questions.question-7.option-1')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === 'InCanada40Plus'}
        >
          {t('quiz.questions.question-7.option-1')}
        </ToggleButton>
        <ToggleButton
          value="InCanada10To39"
          aria-label={t('quiz.questions.question-7.option-2')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === 'InCanada10To39'}
        >
          {t('quiz.questions.question-7.option-2')}
        </ToggleButton>
        <ToggleButton
          value="InCanadaLessThan10"
          aria-label={t('quiz.questions.question-7.option-3')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === 'InCanadaLessThan10'}
        >
          {t('quiz.questions.question-7.option-3')}
        </ToggleButton>
        <ToggleButton
          value="UnsureInCanada"
          aria-label={t('quiz.questions.question-7.option-3')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['yearsInCanada'] === 'UnsureInCanada'}
        >
          {t('quiz.questions.question-7.option-3')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default Question7
