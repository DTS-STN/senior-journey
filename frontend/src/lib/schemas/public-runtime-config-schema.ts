import { LevelWithSilent } from 'pino'
import * as yup from 'yup'

export const levelsWithSilent: ReadonlyArray<LevelWithSilent> = [
  'debug',
  'error',
  'fatal',
  'info',
  'silent',
  'trace',
  'warn',
]

export const publicRuntimeConfigSchema = yup.object({
  ADOBE_ANALYTICS_SCRIPT_SRC: yup.string().url('Env. variable ${path} must be a valid URL'),
  ANALYTICS_BEACON_DELAY: yup
    .number()
    .integer('Env. variable ${path} must be an integer')
    .min(0, 'Env. variable ${path} must be greater than or equal to ${min}')
    .default(() => 250),
  APP_BASE_URI: yup
    .string()
    .required('Env. variable ${path} is required')
    .url('Env. variable ${path} must be a valid URL'),
  ENVIRONMENT: yup.string(),
  LOGGING_LEVEL: yup
    .string()
    .oneOf(levelsWithSilent, 'Env. variable ${path} must be one of the following values: ${values}'),
})
