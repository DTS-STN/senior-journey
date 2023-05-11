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
      <FormGroup className="mb-2" data-cy={t('questions.question-apply.question-marital-status.id')}>
        <FormControlLabel
          control={
            <Checkbox name="single" value="single" checked={values['single'] === 'single'} onChange={handleCheckbox} />
          }
          data-cy={t('questions.question-apply.question-marital-status.option-single.id')}
          label={t('questions.question-apply.question-marital-status.option-single.text')}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="marriedOrCommonLaw"
              value={t('questions.question-apply.question-marital-status.option-married-or-cl.value')}
              checked={
                values['marriedOrCommonLaw'] ===
                t('questions.question-apply.question-marital-status.option-married-or-cl.value')
              }
              onChange={handleCheckbox}
            />
          }
          data-cy={t('questions.question-apply.question-marital-status.option-married-or-cl.id')}
          label={t('questions.question-apply.question-marital-status.option-married-or-cl.text')}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="divorcedOrSeparated"
              value={t('questions.question-apply.question-marital-status.option-divorced-or-separated.value')}
              checked={
                values['divorcedOrSeparated'] ===
                t('questions.question-apply.question-marital-status.option-divorced-or-separated.value')
              }
              onChange={handleCheckbox}
            />
          }
          data-cy={t('questions.question-apply.question-marital-status.option-divorced-or-separated.id')}
          label={t('questions.question-apply.question-marital-status.option-divorced-or-separated.text')}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="widowed"
              value={t('questions.question-apply.question-marital-status.option-widowed.value')}
              checked={values['widowed'] === t('questions.question-apply.question-marital-status.option-widowed.value')}
              onChange={handleCheckbox}
            />
          }
          data-cy={t('questions.question-apply.question-marital-status.option-widowed.id')}
          label={t('questions.question-apply.question-marital-status.option-widowed.text')}
        />
      </FormGroup>
      <h5 className="h5 mb-2">{t('questions.question-apply.question-children.title')}</h5>
      <ToggleButtonGroup
        data-cy={t('questions.question-apply.question-children.id')}
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
          value={t('questions.question-apply.question-children.option-yes-kids.value')}
          aria-label={t('questions.question-apply.question-children.option-yes-kids.text')}
          data-cy={t('questions.question-apply.question-children.option-yes-kids.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasChildren'] === t('questions.question-apply.question-children.option-yes-kids.value')}
        >
          {t('questions.question-apply.question-children.option-yes-kids.text')}
        </ToggleButton>
        <ToggleButton
          value={t('questions.question-apply.question-children.option-no-kids.value')}
          aria-label={t('questions.question-apply.question-children.option-no-kids.text')}
          data-cy={t('questions.question-apply.question-children.option-no-kids.id')}
          className="my-4 font-display text-base font-bold normal-case"
          selected={values['hasChildren'] === t('questions.question-apply.question-children.option-no-kids.value')}
        >
          {t('questions.question-apply.question-children.option-no-kids.text')}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
