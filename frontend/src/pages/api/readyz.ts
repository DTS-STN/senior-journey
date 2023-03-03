import type { NextApiRequest, NextApiResponse } from 'next'

export interface ReadyzApiResponse {
  status: 'UP',
  uptime: string
}

/**
 * An API endpoint to be used in kubernetes readyness checks.
 */
export default function handler(_req: NextApiRequest, res: NextApiResponse<ReadyzApiResponse>) {
  res.status(200).json({
    status: 'UP',
    uptime: `${process.uptime()}s`
  })
}
