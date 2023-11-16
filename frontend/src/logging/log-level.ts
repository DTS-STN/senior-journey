import getConfig from 'next/config'

export const getLoggingLevelConfig = (): string | undefined => {
  // middleware can only read from process.env
  if (process.env.LOGGING_LEVEL) return process.env.LOGGING_LEVEL
  return getConfig()?.publicRuntimeConfig?.LOGGING_LEVEL
}

export const logLevelData = {
  '*': getLoggingLevelConfig(),
  //   'middleware': ''
  //   'home': 'info',
  //   'app': 'debug',
}
