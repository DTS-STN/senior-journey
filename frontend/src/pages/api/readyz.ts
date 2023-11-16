import type { NextApiRequest, NextApiResponse } from 'next'
import { ValidationError } from 'yup'

import { publicRuntimeConfigSchema } from '../../lib/schemas/public-runtime-config-schema'
import { PublicRuntimeConfig } from '../../lib/types'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('api/readyz')

export interface ReadyzApiResponse {
  errors?: Array<string>
  message?: string
  publicRuntimeConfig?: PublicRuntimeConfig
  status: 'UNHANDLED ERROR' | 'INVALID CONFIGURATION' | 'UP'
  uptime?: string
}

/**
 * An API endpoint to be used in kubernetes readyness checks.
 */
export default function handler(_req: NextApiRequest, res: NextApiResponse<ReadyzApiResponse>) {
  try {
    // validate public runtime configuration
    const publicRuntimeConfig = publicRuntimeConfigSchema.validateSync(process.env, { stripUnknown: true })
    res.status(200).json({
      publicRuntimeConfig,
      status: 'UP',
      uptime: `${process.uptime()}s`,
    })
  } catch (err) {
    logger.error(err)

    if (err instanceof ValidationError) {
      res.status(500).json({
        status: 'INVALID CONFIGURATION',
        errors: err.errors,
      })
      return
    }

    res.status(500).json({
      status: 'UNHANDLED ERROR',
      message: (err as Error).message,
    })
  }
}
