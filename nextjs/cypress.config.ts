import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})
