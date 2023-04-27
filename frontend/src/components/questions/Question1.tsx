import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const Question1 = ({ values, setFieldValue }: QuestionProps) => {
  let { t } = useTranslation('learn')
  const [value, setValue] = React.useState('')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    answerId: string
  ) => {
    setValue(answerId)
    setFieldValue(
      'retirementAge',
      values['retirementAge'] === answerId ? '' : answerId
    )
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">
        {t('quiz.questions.question-1.title')}
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
          value="Pre60"
          aria-label={t('quiz.questions.question-1.option-1')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'Pre60'}
        >
          {t('quiz.questions.question-1.option-1')}
        </ToggleButton>
        <ToggleButton
          value="Between60and65"
          aria-label={t('quiz.questions.question-1.option-2')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'Between60and65'}
        >
          {t('quiz.questions.question-1.option-2')}
        </ToggleButton>
        <ToggleButton
          value="At65"
          aria-label={t('quiz.questions.question-1.option-3')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'At65'}
        >
          {t('quiz.questions.question-1.option-3')}
        </ToggleButton>
        <ToggleButton
          value="Between65and70"
          aria-label={t('quiz.questions.question-1.option-4')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'Between65and70'}
        >
          {t('quiz.questions.question-1.option-4')}
        </ToggleButton>
        <ToggleButton
          value="After70"
          aria-label={t('quiz.questions.question-1.option-5')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'After70'}
        >
          {t('quiz.questions.question-1.option-5')}
        </ToggleButton>
        <ToggleButton
          value="UnsureRetirementAge"
          aria-label={t('quiz.questions.question-1.option-6')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementAge'] === 'UnsureRetirementAge'}
        >
          {t('quiz.questions.question-1.option-6')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default Question1
