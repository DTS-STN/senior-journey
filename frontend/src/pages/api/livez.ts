import type { NextApiRequest, NextApiResponse } from 'next'

export interface LivezApiResponse {
  status: 'UP',
  uptime: string
}

/**
 * An API endpoint to be used in kubernetes liveness checks.
 */
export default function handler(_req: NextApiRequest, res: NextApiResponse<LivezApiResponse>) {
  res.status(200).json({
    status: 'UP',
    uptime: `${process.uptime()}s`
  })
}
