import { FC } from 'react'

export interface DateSelectOption {
  value: string
  label: string
}
export type DateSelectOptions = DateSelectOption[]
export type DateSelectType = 'year' | 'month' | 'day'

export type DateSelectOnChangeEvent = (
  e: React.ChangeEvent<HTMLSelectElement>,
  type: DateSelectType
) => void

export interface DateSelectProps {
  ariaDescribedby?: string
  dateSelectLabelId: string
  error?: boolean
  id: string
  label: string
  onChange: DateSelectOnChangeEvent
  options: DateSelectOptions
  required?: boolean
  type: DateSelectType
  value: string
}

const DateSelect: FC<DateSelectProps> = ({
  ariaDescribedby,
  dateSelectLabelId,
  error,
  id,
  label,
  onChange,
  options,
  required,
  type,
  value,
}) => {
  const handleOnSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => onChange(e, type)

  return (
    <div className="flex flex-col space-y-2">
      <label
        id={`date-select-${id}-${type}-label`}
        htmlFor={id}
        className="font-bold"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={handleOnSelectChange}
        aria-describedby={ariaDescribedby}
        aria-invalid={error ? true : undefined}
        aria-labelledby={`${dateSelectLabelId} date-select-${id}-${type}-label`}
        aria-required={required ? true : undefined}
        className={`w-40 rounded border py-1 px-3 ${
          error ? 'border-accent-error' : 'border-neutral-400'
        } bg-white focus:border-sky-500 focus:outline-none focus:ring-sky-500`}
      >
        <option value="" disabled></option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DateSelect
