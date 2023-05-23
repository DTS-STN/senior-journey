import React from 'react'

import { Checkbox, FormControlLabel, FormGroup, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const QuestionApply = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('hasChildren', values['hasChildren'] === answerId ? '' : answerId ?? '')
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const field = e.target.name
    const value = e.target.value
    setFieldValue(field, values[field] ? '' : value)
  }

  return (
    <div>
      <h5 className="h5">{t('questions.question-apply.question-marital-status.title')}</h5>
      <FormGroup className="mb-2" data-cy="apply-subquestion-marital-status">
        <FormControlLabel
          control={
            <Checkbox name="single" value="single" checked={values['single'] === 'single'} onChange={handleCheckbox} />
          }
          data-cy="single-button"
          label={t('questions.question-apply.question-marital-status.option-single')}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="marriedOrCommonLaw"
              value="married-or-cl"
              checked={values['marriedOrCommonLaw'] === 'married-or-cl'}
              onChange={handleCheckbox}
            />
          }
          data-cy="married-or-cl-button"
          label={t('questions.question-apply.question-marital-status.option-married-or-cl')}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="divorcedOrSeparated"
              value="divorced-or-separated"
              checked={values['divorcedOrSeparated'] === 'divorced-or-separated'}
              onChange={handleCheckbox}
            />
          }
          data-cy="divorced-or-separated-button"
          label={t('questions.question-apply.question-marital-status.option-divorced-or-separated')}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="widowed"
              value="widowed"
              checked={values['widowed'] === 'widowed'}
              onChange={handleCheckbox}
            />
          }
          data-cy="widowed-button"
          label={t('questions.question-apply.question-marital-status.option-widowed')}
        />
      </FormGroup>
      <h5 className="h5 mb-2">{t('questions.question-apply.question-children.title')}</h5>
      <ToggleButtonGroup
        data-cy="apply-subquestion-children"
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
          value="yes-kids"
          aria-label={t('questions.question-apply.question-children.option-yes-kids')}
          data-cy="yes-kids-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasChildren'] === 'yes-kids'}
        >
          {t('questions.question-apply.question-children.option-yes-kids')}
        </ToggleButton>
        <ToggleButton
          value="no-kids"
          aria-label={t('questions.question-apply.question-children.option-no-kids')}
          data-cy="no-kids-button"
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasChildren'] === 'no-kids'}
        >
          {t('questions.question-apply.question-children.option-no-kids')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
