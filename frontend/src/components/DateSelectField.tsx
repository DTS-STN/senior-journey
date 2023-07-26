import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { getDaysInMonth, isExists } from 'date-fns'
import { useTranslation } from 'next-i18next'

import DateSelect, { DateSelectOnChangeEvent, DateSelectOption } from './DateSelect'
import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel'

export type DateSelectFieldOnChangeEvent = (dateString: string) => void

export interface DateSelectFieldProps {
  errorMessage?: string
  firstYear?: number
  helpMessage?: string
  id: string
  label: string
  lastYear?: number
  onChange: DateSelectFieldOnChangeEvent
  required?: boolean
  value: string
}

interface DateSelectState {
  dateString: string
  dayValue: string
  monthValue: string
  yearValue: string
}

const DateSelectField = ({
  errorMessage,
  firstYear,
  helpMessage,
  id,
  label,
  lastYear,
  onChange,
  required,
  value,
}: DateSelectFieldProps) => {
  const { t } = useTranslation()

  const [state, setState] = useState<DateSelectState & { changeCount: number }>({
    dateString: '',
    dayValue: '',
    monthValue: '',
    yearValue: '',
    changeCount: 0, // HACK: Use this state as a dependency of the `useEffect` below so that `onChange` is called only when it should be.
  })

  const dateSelectErrorMessageId = `date-select-${id}-error`
  const dateSelectHelpMessageId = `date-select-${id}-help`
  const dateSelectWrapperId = `date-select-${id}`
  const dateSelectLabelId = `date-select-${id}-label`

  const getAriaDescribedby = () => {
    const ariaDescribedby: string[] = []
    if (errorMessage) ariaDescribedby.push(dateSelectErrorMessageId)
    if (helpMessage) ariaDescribedby.push(dateSelectHelpMessageId)
    return ariaDescribedby.length > 0 ? ariaDescribedby.join(' ') : undefined
  }

  const yearOptions = useMemo(() => {
    const first = firstYear ?? 1900
    const last = Math.max(first, lastYear ?? new Date().getFullYear())
    const years = last - first + 1
    return [...Array(years).keys()].reverse().map<DateSelectOption>((i) => {
      const value = padZero(i + first, 4)
      return { label: value, value }
    })
  }, [firstYear, lastYear])

  const monthOptions = useMemo(() => {
    return [...Array(12).keys()].map<DateSelectOption>((i) => {
      const value = padZero(i + 1, 2)
      return { label: value, value }
    })
  }, [])

  const dayOptions = useMemo(() => {
    const year = parseInt(state.yearValue)
    const month = parseInt(state.monthValue)
    const days = isExists(year, month - 1, 1) ? getDaysInMonth(new Date(year, month - 1)) : 31
    return [...Array(days).keys()].map<DateSelectOption>((i) => {
      const value = padZero(i + 1, 2)
      return { label: value, value }
    })
  }, [state.monthValue, state.yearValue])

  const handleOnDateSelectChange: DateSelectOnChangeEvent = useCallback((event, type) => {
    const newValue = event.target.value
    setState((curState) => {
      const yearValue = type === 'year' ? newValue : curState.yearValue
      const yearNumber = parseInt(yearValue)

      const monthValue = type === 'month' ? newValue : curState.monthValue
      const monthNumber = parseInt(monthValue)

      // dayValue can be set if year or month is NaN OR if the year-month-day convert to an existing date
      const day = type === 'day' ? newValue : curState.dayValue
      const isDayExists =
        isNaN(yearNumber) || isNaN(monthNumber) ? true : isExists(yearNumber, monthNumber - 1, parseInt(day))
      const dayValue = isDayExists ? day : ''

      const dateString = toDateStringOrEmpty(yearValue, monthValue, dayValue)
      return {
        ...curState,
        yearValue,
        monthValue,
        dayValue,
        dateString,
        changeCount: curState.changeCount + 1, // `updateDate` changes `state.changeCount` so that `onChange` is triggered.
      }
    })
  }, [])

  // Sync from the state to the upper component through onChange when necessary.
  const mountedRef = useRef(false)

  useEffect(() => {
    if (!mountedRef.current) {
      return
    }
    onChange(state.dateString)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.changeCount])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  // Sync from the passed value to the state when necessary.
  useEffect(() => {
    if (state.dateString === value) {
      return
    }
    const { year, month, day } = parseDateString(value)
    setState((curState) => ({
      yearValue: year,
      monthValue: month,
      dayValue: day,
      dateString: value,
      changeCount: curState.changeCount, // This method does not update `state.changeCount` so that `onChange` is not triggered.
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className="mb-4" id={dateSelectWrapperId} data-testid={id}>
      <InputLabel id={dateSelectLabelId} htmlFor={`${id}-year`} required={required} label={label} />
      {errorMessage && <InputErrorMessage id={dateSelectErrorMessageId} message={errorMessage} />}
      <fieldset className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <DateSelect
          ariaDescribedby={getAriaDescribedby()}
          dateSelectLabelId={dateSelectLabelId}
          error={!!errorMessage}
          id={`${id}-year`}
          label={t('common:date-select-field.year')}
          onChange={handleOnDateSelectChange}
          options={yearOptions}
          required={required}
          type="year"
          value={state.yearValue}
        />
        <DateSelect
          ariaDescribedby={getAriaDescribedby()}
          dateSelectLabelId={dateSelectLabelId}
          error={!!errorMessage}
          id={`${id}-month`}
          label={t('common:date-select-field.month')}
          onChange={handleOnDateSelectChange}
          options={monthOptions}
          required={required}
          type="month"
          value={state.monthValue}
        />
        <DateSelect
          ariaDescribedby={getAriaDescribedby()}
          dateSelectLabelId={dateSelectLabelId}
          error={!!errorMessage}
          id={`${id}-day`}
          label={t('common:date-select-field.day')}
          onChange={handleOnDateSelectChange}
          options={dayOptions}
          required={required}
          type="day"
          value={state.dayValue}
        />
      </fieldset>
      {helpMessage && (
        <div className="mt-1.5 max-w-prose text-base text-gray-600" id={dateSelectHelpMessageId}>
          {helpMessage}
        </div>
      )}
    </div>
  )
}

const toDateStringOrEmpty = (year: string, month: string, day: string) =>
  year && month && day ? `${year}-${month}-${day}` : ''

const padZero = (value: number, maxLength: number): string => {
  return value.toString().padStart(maxLength, '0')
}

const parseDateString = (
  dateString: string,
): {
  year: string
  month: string
  day: string
} => {
  //  ONE DAY OFF depending on YOUR timezone and current time.
  // ref.: https://stackoverflow.com/a/31732581
  const date = new Date(dateString.replace(/-/g, '/').replace(/T.+/, ''))
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return { year: '', month: '', day: '' }
  }

  return {
    year: padZero(year, 4),
    month: padZero(month, 2),
    day: padZero(day, 2),
  }
}

export default DateSelectField
