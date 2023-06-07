import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import { getLogger } from '../logging/log-util'
import schema from './tasks-schema.json'
import data from './tasks.json'

const logger = getLogger('/data/tasks-validation.ts')

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
const validate = ajv.compile(schema)

if (validate(data)) {
  logger.info('Valid tasks JSON dataset')
} else {
  logger.error(validate.errors, 'Invalid tasks JSON dataset')
  process.exit(1)
}
