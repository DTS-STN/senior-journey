import pino, { stdTimeFunctions } from 'pino'

import { logLevelData } from './log-level'

export const getLogLevel = (logger: string) => {
  const logLevels = new Map(Object.entries(logLevelData))
  return logLevels.get(logger) ?? logLevels.get('*') ?? 'info'
}

export const getLogger = (name: string) => {
  return pino({
    name,
    level: getLogLevel(name),
    timestamp: stdTimeFunctions.isoTime,
  })
}
