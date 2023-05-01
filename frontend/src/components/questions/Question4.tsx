import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const Question4 = ({ values, setFieldValue }: QuestionProps) => {
  let { t } = useTranslation('learn')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('retirementTimeframe', values['retirementTimeframe'] === answerId ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">{t('quiz.questions.question-4.title')}</h5>
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
          value="canada-ft"
          aria-label={t('quiz.questions.question-4.option-1')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === 'canada-ft'}
        >
          {t('quiz.questions.question-4.option-1')}
        </ToggleButton>
        <ToggleButton
          value="canada-pt-60-or-more"
          aria-label={t('quiz.questions.question-4.option-2')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === 'canada-pt-60-or-more'}
        >
          {t('quiz.questions.question-4.option-2')}
        </ToggleButton>
        <ToggleButton
          value="canada-pt-less-than-60"
          aria-label={t('quiz.questions.question-4.option-3')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === 'canada-pt-less-than-60'}
        >
          {t('quiz.questions.question-4.option-3')}
        </ToggleButton>
        <ToggleButton
          value="outside-canada"
          aria-label={t('quiz.questions.question-4.option-4')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === 'outside-canada'}
        >
          {t('quiz.questions.question-4.option-4')}
        </ToggleButton>
        <ToggleButton
          value="unsure-retirement-living"
          aria-label={t('quiz.questions.question-4.option-5')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === 'unsure-retirement-living'}
        >
          {t('quiz.questions.question-4.option-5')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default Question4
