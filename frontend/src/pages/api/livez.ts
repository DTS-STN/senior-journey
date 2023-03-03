import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * An API endpoint to be used in kubernetes liveness checks.
 */
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    status: 'UP',
    uptime: `${process.uptime()}s`
  })
}
