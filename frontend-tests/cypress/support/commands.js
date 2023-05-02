/**
 * Intercepts network requests using Cypress intercept and adds an authorization header
 * with a bearer token.
 *
 * @param {string} token - The bearer token to include in the authorization header.
 * @returns {Cypress.Chainable} A chainable object representing the intercepted request.
 */
function interceptWithAuthorization(token) {
  return cy.intercept('/**', ({ headers }) => {
    headers['Authorization'] = `Bearer ${token}`
  })
}

/**
 * Checks if an access token is still valid based on its expiry timestamp.
 *
 * @param {number} accessTokenExpiry - The timestamp of the access token expiry in milliseconds since Unix epoch.
 * @returns {boolean} - Returns true if the access token is still valid, false otherwise.
 */
function isAccessTokenValid(accessTokenExpiry) {
  return Date.now() < accessTokenExpiry
}

/**
 * Custom cypress command for logging in to a service account using OAuth 2.0 client credentials grant.
 *
 * This command requires the following environment variables to be set:
 * - oauthClientId: The client ID for the OAuth 2.0 client credentials grant.
 * - oauthClientSecret: The client secret for the OAuth 2.0 client credentials grant.
 * - oauthTokenUrl: The token endpoint URL for the OAuth 2.0 client credentials grant.
 * - oauthScope (optional): The OAuth 2.0 scope(s) for the access token.
 *
 * @throws {Error} If any of the required environment variables are not defined.
 * @returns {Cypress.Chainable<string>} A chainable object representing the bearer token.
 */
Cypress.Commands.add('getBearerToken', () => {
  const { oauthAccessToken, oauthAccessTokenExpiry, oauthClientId, oauthClientSecret, oauthScope, oauthTokenUrl } = Cypress.env()

  if (!oauthClientId) { throw new Error('OAuth client ID is not defined') }
  if (!oauthClientSecret) { throw new Error('OAuth client secret is not defined') }
  if (!oauthTokenUrl) { throw new Error('OAuth token URL is not defined') }

  if (oauthAccessToken && oauthAccessTokenExpiry && isAccessTokenValid(oauthAccessTokenExpiry)) {
    return cy.wrap(oauthAccessToken, { log: false })
  }

  cy.log(`Acquiring OAuth token for service account: [${oauthClientId}]`)

  return cy.request({
    url: oauthTokenUrl,
    method: 'POST',
    log: false,
    form: true,
    body: {
      grant_type: 'client_credentials',
      client_id: oauthClientId,
      client_secret: oauthClientSecret,
      scope: oauthScope,
    },
  })
  .then(({ body }) => {
    const oauthAccessToken = body['access_token']
    const oauthAccessTokenExpiry = Date.now() + body['expires_in'] * 1000

    Cypress.env({ oauthAccessToken, oauthAccessTokenExpiry })

    return oauthAccessToken
  })
})

/**
 * Overwrites the `visit` command to include an authorization header with a bearer token
 * obtained from a login request, if OAuth is enabled.
 *
 * @param {Cypress.VisitFunction} originalFn - The original `visit` function.
 * @param {string} url - The URL to visit.
 * @param {Cypress.VisitOptions} options - Options to customize the visit.
 * @returns {Cypress.Chainable} A chainable object representing the intercepted request.
 */
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  if (!Cypress.env('oauthEnabled')) {
    return originalFn(url, options)
  }

  return cy.getBearerToken()
    .then(token => interceptWithAuthorization(token))
    .then(() => originalFn(url, options))
})

//insert the `visitAndWait` command to wrap it up (including the visit) into a custom command.

let appHasStarted
function spyOnAddEventListener(win) {
  // win = window object in our application
  const addListener = win.EventTarget.prototype.addEventListener
  win.EventTarget.prototype.addEventListener = function (name) {
    if (name === 'change') {
      // web app added an event listener to the input box -
      // that means the web application has started
      appHasStarted = true
      // restore the original event listener
      win.EventTarget.prototype.addEventListener = addListener
    }
    return addListener.apply(this, arguments)
  }
}

function waitForAppStart() {
  // keeps rechecking "appHasStarted" variable
  return new Cypress.Promise((resolve, reject) => {
    const isReady = () => {
      if (appHasStarted) {
        return resolve()
      }
      setTimeout(isReady, 0)
    }
    isReady()
  })
}

Cypress.Commands.add('visitAndWait', (url) =>
  cy.visit(url, { onBeforeLoad: spyOnAddEventListener })
    .then({ timeout: 10000 }, waitForAppStart)
)
