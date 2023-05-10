import React from 'react'

import { Checkbox, FormControlLabel, FormGroup, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

type QuestionProps = {
  values: { [field: string]: any }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const Question2 = ({ values, setFieldValue }: QuestionProps) => {
  const { t } = useTranslation('quiz')
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.MouseEvent<HTMLElement>, answerId: string) => {
    setValue(answerId)
    setFieldValue('hasChildren', values['hasChildren'] === answerId ? '' : answerId ?? '')
  }

  function handleCheckbox(e: React.ChangeEvent<any>, field: string) {
    const answerId = e.target.value
    setFieldValue(field, values[field] ? '' : answerId ?? '')
  }

  return (
    <div>
      <h5 className="h5">{t('questions.question-2.question-1.title')}</h5>
      <FormGroup className="mb-2">
        <FormControlLabel
          control={
            <Checkbox
              value="single"
              checked={values['single'] === 'single'}
              onChange={(e) => handleCheckbox(e, 'single')}
            />
          }
          label={t('questions.question-2.question-1.option-1')}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="married-or-cl"
              checked={values['marriedOrCommonLaw'] === 'married-or-cl'}
              onChange={(e) => handleCheckbox(e, 'marriedOrCommonLaw')}
            />
          }
          label={t('questions.question-2.question-1.option-2')}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="divorced-or-separated"
              checked={values['divorcedOrSeparated'] === 'divorced-or-separated'}
              onChange={(e) => handleCheckbox(e, 'divorcedOrSeparated')}
            />
          }
          label={t('questions.question-2.question-1.option-3')}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="widowed"
              checked={values['widowed'] === 'widowed'}
              onChange={(e) => handleCheckbox(e, 'widowed')}
            />
          }
          label={t('questions.question-2.question-1.option-4')}
        />
      </FormGroup>
      <h5 className="h5 mb-2">{t('questions.question-2.question-2.title')}</h5>
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
          value="yes-kids"
          aria-label={t('questions.question-2.question-2.option-1')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasChildren'] === 'yes-kids'}
        >
          {t('questions.question-2.question-2.option-1')}
        </ToggleButton>
        <ToggleButton
          value="no-kids"
          aria-label={t('questions.question-2.question-2.option-2')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasChildren'] === 'no-kids'}
        >
          {t('questions.question-2.question-2.option-2')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}