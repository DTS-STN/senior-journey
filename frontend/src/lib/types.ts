export type AdobeDataLayer = { push?: (object: Record<string, string>) => void }
export type AppWindow = Window &
  typeof globalThis & { adobeDataLayer?: AdobeDataLayer }

export interface HealthApiResponse {
  appBaseUri: string
  buildDate: string
  environment: string
  status: string
  uptime: string
}
