import { NextPage } from 'next'

import Error404Page from '../components/error-pages/Error404Page'
import ErrorPage from '../components/error-pages/ErrorPage'

export interface ErrorProps {
  statusCode?: number
}

const CustomError: NextPage<ErrorProps> = ({ statusCode }) => {
  if (statusCode === 404) return <Error404Page />
  return <ErrorPage statusCode={statusCode} />
}

CustomError.getInitialProps = async ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404
  return { statusCode }
}

export default CustomError
