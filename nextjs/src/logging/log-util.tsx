import pino, { Logger, stdTimeFunctions } from 'pino'

import logLevelData from './log-level'

const logLevels = new Map<string, string | undefined>(
  Object.entries(logLevelData)
)

export function getLogLevel(logger: string): string {
  return logLevels.get(logger) || logLevels.get('*') || 'info'
}

export function getLogger(name: string): Logger {
  return pino({
    name,
    level: getLogLevel(name),
    timestamp: stdTimeFunctions.isoTime,
  })
}
