// load environment variables from .env file
require('dotenv').config()

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://seniors-journey-test.dev-dp.dts-stn.com',
    language: 'en',
    env: {
      oauthClientId: process.env.OAUTH_CLIENT_ID,
      oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
      oauthEnabled: process.env.OAUTH_ENABLED === 'true',
      oauthScope: process.env.OAUTH_SCOPE,
      oauthTokenUrl: process.env.OAUTH_TOKEN_URL,
    },
    userAgent: 'cypress/12.x'
  },
};
