import { FC, useEffect } from 'react'

import { FormikErrors } from 'formik'
import { TFunction, useTranslation } from 'next-i18next'

export interface ErrorSummaryItem {
  feildId: string
  errorMessage: string
}

export interface ErrorSummaryProps {
  id: string
  errors: ErrorSummaryItem[]
}

export const getErrorSummaryItem = (feildId: string, errorMessage: string): ErrorSummaryItem => ({
  feildId,
  errorMessage,
})

export const getErrorSummaryItems = <T extends unknown>(formErrors: FormikErrors<T>, t: TFunction) => {
  return Object.keys(formErrors)
    .filter((key) => !!formErrors[key as keyof typeof formErrors])
    .map((key) => getErrorSummaryItem(key, t(formErrors[key as keyof typeof formErrors] as string)))
}

export const goToErrorSummary = (errorSummaryId: string) => {
  const errorSummaryEl = document.querySelector<HTMLElement>(`#${errorSummaryId}`)
  errorSummaryEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  errorSummaryEl?.focus()
}

const ErrorSummary: FC<ErrorSummaryProps> = ({ id, errors }) => {
  useEffect(() => {
    goToErrorSummary(id)
  }, [id])
  const { t } = useTranslation('common')
  return (
    <section id={id} className="mb-5 border-l-6 border-accent-error p-5" tabIndex={-1}>
      <h2 className="mb-3 text-2xl font-bold">{t('found-errors', { count: errors.length })}</h2>
      <ul className="list-disc space-y-1 pl-7">
        {errors.map(({ feildId, errorMessage }) => (
          <li key={feildId}>
            <a className="visited:text-link-default" href={`#${feildId}`}>
              {errorMessage}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ErrorSummary
