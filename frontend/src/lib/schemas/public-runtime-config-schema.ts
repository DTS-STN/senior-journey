import * as yup from 'yup'

export const publicRuntimeConfigSchema = yup.object({
  NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC: yup
    .string()
    .url('Environment variable NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC must be a valid URL'),
  NEXT_PUBLIC_APP_BASE_URI: yup
    .string()
    .required('Environment variable NEXT_PUBLIC_APP_BASE_URI is required')
    .url('Environment variable NEXT_PUBLIC_APP_BASE_URI must be a valid URL'),
  NEXT_PUBLIC_ENVIRONMENT: yup.string(),
})
