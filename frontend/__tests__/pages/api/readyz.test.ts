import type { NextApiRequest, NextApiResponse } from 'next'
import type { RequestOptions } from 'node-mocks-http'
import { createRequest, createResponse } from 'node-mocks-http'

import type { ReadyzApiResponse } from '../../../src/pages/api/readyz'
import handler from '../../../src/pages/api/readyz'

/**
 * NextApiRequest, NextApiResponse and node-mocks-http createResponse, createResponse types union
 * @see: https://github.com/howardabrams/node-mocks-http/issues/255#issuecomment-1136674043
 */
type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type ApiResponse = NextApiResponse<ReadyzApiResponse> & ReturnType<typeof createResponse>

describe('api/readyz', () => {
  it('returns UP with current uptime', () => {
    const requestOptions: RequestOptions = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      url: '/api/readyz',
    }

    const res = createResponse<ApiResponse>()
    const req = createRequest<ApiRequest>(requestOptions)

    handler(req, res)

    const data = res._getJSONData()
    expect(res._getStatusCode()).toBe(200)
    expect(res._isJSON()).toBe(true)
    expect(res._isUTF8()).toBe(true)
    expect(data.status).toBe('UP')
    expect(data.uptime).toBeDefined()
  })
})
