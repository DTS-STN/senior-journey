import { useMemo } from 'react'

import { NextConfig } from 'next'
import getConfig from 'next/config'

import { publicRuntimeConfigSchema } from '../schemas/public-runtime-config-schema'

export const usePublicRuntimeConfig = () => {
  const config = getConfig() as NextConfig
  return useMemo(
    () =>
      publicRuntimeConfigSchema.validateSync({
        NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC: config.publicRuntimeConfig?.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC,
        NEXT_PUBLIC_APP_BASE_URI: config.publicRuntimeConfig?.NEXT_PUBLIC_APP_BASE_URI,
        NEXT_PUBLIC_ENVIRONMENT: config.publicRuntimeConfig?.NEXT_PUBLIC_ENVIRONMENT,
      }),
    [
      config.publicRuntimeConfig?.NEXT_PUBLIC_ADOBE_ANALYTICS_SCRIPT_SRC,
      config.publicRuntimeConfig?.NEXT_PUBLIC_APP_BASE_URI,
      config.publicRuntimeConfig?.NEXT_PUBLIC_ENVIRONMENT,
    ]
  )
}
