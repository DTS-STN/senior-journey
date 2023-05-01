import { utility } from "../../support/Utility"

describe('test id 221 - verify Apply link - Landing page', () => {
  beforeEach(() => {
    cy.visit('en/home', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
  })
  it('apply tab - verify is visible and html attributes', () => {
    cy.get('button').eq(2).should('have.attr', 'type', 'button')
      .and('have.attr', 'tabindex', '-1')
      .and('have.attr', 'role', 'tab')
      .and('have.attr', 'aria-selected', 'false')
      .and('be.visible')
  })

  it('apply link click \'Canada Pension Plan: How to Apply\' url redirects to /en/fr/ when accessing /en/fr', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()
    cy.wait(2000)
    cy.get('button').eq(2).click()
    cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click()
    cy.wait(2000)
    cy.location('pathname').should('equal', language ? '/en/test' : '/fr/test')
  })

  it('apply link click \'Old Age Security: How to Apply\' url redirects to /en/fr/ when accessing /en/fr', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()
    cy.wait(2000)
    cy.get('button').eq(2).click()
    cy.get(':nth-child(3) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click()
    cy.wait(2000)
    cy.location('pathname').should('equal', language ? '/en/test2' : '/fr/test2')
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