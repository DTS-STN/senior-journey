import type { NextApiRequest, NextApiResponse } from 'next'
import type { RequestOptions } from 'node-mocks-http'
import { createRequest, createResponse } from 'node-mocks-http'

import type { BuildInfoApiResponse } from '../../../src/pages/api/buildinfo'
import handler from '../../../src/pages/api/buildinfo'

/**
 * NextApiRequest, NextApiResponse and node-mocks-http createResponse, createResponse types union
 * @see: https://github.com/howardabrams/node-mocks-http/issues/255#issuecomment-1136674043
 */
type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type ApiResponse = NextApiResponse<BuildInfoApiResponse> & ReturnType<typeof createResponse>

describe('api/buildinfo', () => {
  const processEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...processEnv }
  })

  afterAll(() => {
    process.env = processEnv
  })

  it('returns the current build info', async () => {
    const requestOptions: RequestOptions = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      url: '/api/buildinfo',
    }

    const res = createResponse<ApiResponse>()
    const req = createRequest<ApiRequest>(requestOptions)

    process.env.NEXT_PUBLIC_BUILD_TIMESTAMP = '2000-01-01T00:00:00Z'
    process.env.NEXT_PUBLIC_BUILD_ID = '9999'
    process.env.NEXT_PUBLIC_BUILD_REVISION = 'deadbeef'
    process.env.NEXT_PUBLIC_BUILD_VERSION = '20000101-9999-deadbeef'

    handler(req, res)

    const data = res._getJSONData()
    expect(res._getStatusCode()).toBe(200)
    expect(res._isJSON()).toBe(true)
    expect(res._isUTF8()).toBe(true)
    expect(data.buildInfo.date).toBe('2000-01-01T00:00:00Z')
    expect(data.buildInfo.id).toBe('9999')
    expect(data.buildInfo.revision).toBe('deadbeef')
    expect(data.buildInfo.version).toBe('20000101-9999-deadbeef')
  })

  it('returns sane defaults', async () => {
    const requestOptions: RequestOptions = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      url: '/api/buildinfo',
    }

    const res = createResponse<ApiResponse>()
    const req = createRequest<ApiRequest>(requestOptions)

    handler(req, res)

    const data = res._getJSONData()
    expect(res._getStatusCode()).toBe(200)
    expect(res._isJSON()).toBe(true)
    expect(res._isUTF8()).toBe(true)
    expect(data.buildInfo.date).toBe('0000-00-00T00:00:00Z')
    expect(data.buildInfo.id).toBe('0000')
    expect(data.buildInfo.revision).toBe('00000000')
    expect(data.buildInfo.version).toBe('00000000-0000-00000000')
  })
})
