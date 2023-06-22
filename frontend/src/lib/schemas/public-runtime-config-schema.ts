import * as yup from 'yup'

export const publicRuntimeConfigSchema = yup.object({
  NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC: yup
    .string()
    .url('Environment variable NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC must be a valid URL'),
  NEXT_PUBLIC_ANALYTICS_BEACON_DELAY: yup
    .number()
    .integer('Environment variable NEXT_PUBLIC_ANALYTICS_BEACON_DELAY must be an integer')
    .min(0, 'Environment variable NEXT_PUBLIC_ANALYTICS_BEACON_DELAY must be greater than or equal to 0')
    .default(() => 250),
  NEXT_PUBLIC_APP_BASE_URI: yup
    .string()
    .required('Environment variable NEXT_PUBLIC_APP_BASE_URI is required')
    .url('Environment variable NEXT_PUBLIC_APP_BASE_URI must be a valid URL'),
  NEXT_PUBLIC_ENVIRONMENT: yup.string(),
})
