import { utility } from "../../support/Utility"

describe('test id 220 - verify Plan link - Landing page', () => {
  beforeEach(() => {
    cy.visit('en/home', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
  })
  it('plan tab - verify is visible and html attributes', () => {
    cy.get('button').eq(1).should('have.attr', 'type', 'button')
      .and('have.attr', 'tabindex', '-1')
      .and('have.attr', 'role', 'tab')
      .and('have.attr', 'aria-selected', 'false')
      .and('be.visible')
  })

  it('plan link click url redirects to /en/fr/ when accessing /en/fr', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()
    cy.wait(2000)
    cy.get('button').eq(1).click()
    cy.get('.text-right > .MuiButtonBase-root').click()
    cy.wait(2000)
    cy.location('pathname').should('equal', language ? '/en/home' : '/fr/home')
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