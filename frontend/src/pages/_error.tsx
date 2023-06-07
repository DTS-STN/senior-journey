import { NextPage } from 'next'

import Error404Page from '../components/error-pages/Error404Page'
import ErrorPage from '../components/error-pages/ErrorPage'
import { getLogger } from '../logging/log-util'

const logger = getLogger('pages/_error.tsx')

export interface ErrorProps {
  statusCode?: number
}

const CustomError: NextPage<ErrorProps> = ({ statusCode }) => {
  if (statusCode === 404) return <Error404Page />
  return <ErrorPage statusCode={statusCode} />
}

CustomError.getInitialProps = async ({ req, res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode

  // Client error responses (400 – 499)
  if (statusCode && statusCode >= 400 && statusCode < 500) {
    logger.warn({ statusCode, req, err }, `Error ${statusCode}`)
    return { statusCode }
  }

  // Other error responses
  logger.error({ statusCode, req, err }, statusCode ? `Error ${statusCode}` : 'An error occurred on client')
  return { statusCode }
}

export default CustomError
