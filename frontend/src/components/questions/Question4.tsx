import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const Question4 = ({ values, setFieldValue }: QuestionProps) => {
  let { t } = useTranslation('learn')
  const [value, setValue] = React.useState('')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    answerId: string
  ) => {
    setValue(answerId)
    setFieldValue(
      'retirementTimeframe',
      values['retirementTimeframe'] === answerId ? '' : answerId ?? ''
    )
  }

  return (
    <div>
      <h5 className="font-display text-2xl font-light">
        {t('quiz.questions.question-4.title')}
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
          value="CanadaFT"
          aria-label={t('quiz.questions.question-4.option-1')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === 'CanadaFT'}
        >
          {t('quiz.questions.question-4.option-1')}
        </ToggleButton>
        <ToggleButton
          value="CanadaPT6OrMore"
          aria-label={t('quiz.questions.question-4.option-2-label')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={
            values['retirementTimeframe'] === 'CanadaPT6OrMore'
          }
        >
          <Trans
            ns="learn"
            i18nKey="quiz.questions.question-4.option-2"
            components={{
              upper: <span className="px-1 underline"></span>,
            }}
          ></Trans>
        </ToggleButton>
        <ToggleButton
          value="CanadaPTLessThan6"
          aria-label={t('quiz.questions.question-4.option-3-label')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={
            values['retirementTimeframe'] === 'CanadaPTLessThan6'
          }
        >
          <Trans
            ns="learn"
            i18nKey="quiz.questions.question-4.option-3"
            components={{
              upper: <span className="px-1 underline"></span>,
            }}
          ></Trans>
        </ToggleButton>
        <ToggleButton
          value="OutsideCanada"
          aria-label={t('quiz.questions.question-4.option-4')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === 'OutsideCanada'}
        >
          {t('quiz.questions.question-4.option-4')}
        </ToggleButton>
        <ToggleButton
          value="UnsureRetirementLiving"
          aria-label={t('quiz.questions.question-4.option-5')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['retirementTimeframe'] === 'UnsureRetirementLiving'}
        >
          {t('quiz.questions.question-4.option-5')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default Question4
