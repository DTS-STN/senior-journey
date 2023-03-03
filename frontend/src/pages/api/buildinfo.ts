import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    buildInfo: {
      date: process.env.NEXT_PUBLIC_BUILD_TIMESTAMP,
      id: process.env.NEXT_PUBLIC_BUILD_ID,
      revision: process.env.NEXT_PUBLIC_BUILD_REVISION,
      version: process.env.NEXT_PUBLIC_BUILD_VERSION,
    }
  })
}
