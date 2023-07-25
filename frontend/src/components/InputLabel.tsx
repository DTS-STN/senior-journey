import { useTranslation } from 'next-i18next'

export interface InputLabelProps {
  htmlFor: string
  id: string
  label: string
  required?: boolean
}

const InputLabel = ({ htmlFor, id, label, required }: InputLabelProps) => {
  const { t } = useTranslation('common')
  return (
    <label id={id} htmlFor={htmlFor} className="mb-2 block font-bold">
      {required && (
        <span className="text-accent-error" aria-hidden="true">
          {'* '}
        </span>
      )}
      {label}
      {required && <strong className="text-accent-error">&nbsp;{t('required')}</strong>}
    </label>
  )
}

export default InputLabel
