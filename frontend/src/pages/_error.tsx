import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

import Error404Page from '../components/error-pages/Error404Page'
import ErrorPage from '../components/error-pages/ErrorPage'

export interface ErrorProps {
  statusCode?: number
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  if (statusCode === 404) return <Error404Page />
  return <ErrorPage statusCode={statusCode} />
}

export const getServerSideProps: GetServerSideProps = async ({ res, locale }) => ({
  props: {
    statusCode: res?.statusCode ?? 404,
    ...(await serverSideTranslations(locale ?? 'default', ['common', 'home'])),
  },
})

export default Error