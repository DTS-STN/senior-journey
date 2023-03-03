import type { NextApiRequest, NextApiResponse } from 'next'

export interface BuildInfoApiResponse {
  buildInfo: {
    date: string
    id: string
    revision: string
    version: string
  }
}

export default function handler(_req: NextApiRequest, res: NextApiResponse<BuildInfoApiResponse>) {
  res.status(200).json({
    buildInfo: {
      date: process.env.NEXT_PUBLIC_BUILD_TIMESTAMP ?? '0000-00-00T00:00:00Z',
      id: process.env.NEXT_PUBLIC_BUILD_ID ?? '0000',
      revision: process.env.NEXT_PUBLIC_BUILD_REVISION ?? '00000000',
      version: process.env.NEXT_PUBLIC_BUILD_VERSION ?? '00000000-0000-00000000',
    }
  })
}
