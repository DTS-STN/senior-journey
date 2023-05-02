describe('test id 268 - verify Learn Overview - Breadcrumb', () => {
  it.only('canada link - click url redirects to /en when accessing /en', () => {
    cy.visit('/en/home', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
    cy.get('.block > :nth-child(1) > .MuiTypography-root').click()
    cy.origin('https://www.canada.ca', () => {
      cy.wait(3000)
      cy.location('pathname').should('equal', '/en.html')
    })
  })

  it('canada link - click url redirects to /fr when accessing /fr', () => {
    cy.visit('/fr/home', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
    cy.get('.block > :nth-child(1) > .MuiTypography-root').click()
    cy.origin('https://www.canada.ca', () => {
      cy.wait(3000)
      cy.location('pathname').should('equal', '/fr.html')
    })
  })

  it('learn link - retirement-income-sources redirects to /en when accessing /en', () => {
    cy.visit('/en/learn/retirement-income-sources', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
    cy.location('pathname').should('equal', '/en/learn/retirement-income-sources')
  })

  it('learn link - retirement-income-sources redirects to /fr when accessing /fr', () => {
    cy.visit('/fr/learn/retirement-income-sources', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
    cy.location('pathname').should('equal', '/fr/learn/retirement-income-sources')
  })

  it('learn link - redirects to /en when accessing /en', () => {
    cy.visit('/en/learn/retirement-income-sources', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
    cy.get('.block > :nth-child(2) > .MuiTypography-root').click()
    cy.location('pathname').should('equal', '/en/learn')
  })

  it('learn link - planning-to-save-for-retirement redirects to /en when accessing /en', () => {
    cy.visit('/en/learn/planning-to-save-for-retirement', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
    cy.location('pathname').should('equal', '/en/learn/planning-to-save-for-retirement')
  })

  it('learn link - planning-to-save-for-retirement redirects to /fr when accessing /fr', () => {
    cy.visit('/fr/learn/planning-to-save-for-retirement', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
    cy.location('pathname').should('equal', '/fr/learn/planning-to-save-for-retirement')
  })

  it('learn link - redirects to /fr when accessing /fr', () => {
    cy.visit('/fr/learn/retirement-income-sources', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
    cy.get('.block > :nth-child(2) > .MuiTypography-root').click()
    cy.location('pathname').should('equal', '/fr/learn')
  })
})

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