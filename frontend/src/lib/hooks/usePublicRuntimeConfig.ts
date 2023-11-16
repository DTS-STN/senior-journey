import { useMemo } from 'react'

import getConfig from 'next/config'

import { publicRuntimeConfigSchema } from '../schemas/public-runtime-config-schema'

export const usePublicRuntimeConfig = () => {
  const config = getConfig()

  const { ADOBE_ANALYTICS_SCRIPT_SRC, ANALYTICS_BEACON_DELAY, APP_BASE_URI, ENVIRONMENT, LOGGING_LEVEL } =
    config?.publicRuntimeConfig ?? {}

  return useMemo(
    () =>
      publicRuntimeConfigSchema.validateSync({
        ADOBE_ANALYTICS_SCRIPT_SRC,
        ANALYTICS_BEACON_DELAY,
        APP_BASE_URI,
        ENVIRONMENT,
        LOGGING_LEVEL,
      }),
    [ADOBE_ANALYTICS_SCRIPT_SRC, ANALYTICS_BEACON_DELAY, APP_BASE_URI, ENVIRONMENT, LOGGING_LEVEL],
  )
}
