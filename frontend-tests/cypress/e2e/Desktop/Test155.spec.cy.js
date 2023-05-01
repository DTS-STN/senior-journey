import { utility } from "../../support/Utility"

describe('test id 155 - verify Learn link - Landing page', () => {
  beforeEach(() => {
    cy.visit('en/home', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
  })

  it('learn tab - verify is visible and html attributes', () => {
    cy.get('button').eq(0).should('have.attr', 'type', 'button')
      .and('have.attr', 'tabindex', '0')
      .and('have.attr', 'role', 'tab')
      .and('have.attr', 'aria-selected', 'true')
      .and('be.visible')
  })

  it('learn link click url redirects to /en/fr/ when accessing /en/fr', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()
    cy.wait(2000)
    cy.get('button').eq(0).click()
    cy.get('.text-right > .MuiButtonBase-root').click()
    cy.wait(2000)
    cy.location('pathname').should('equal', language ? '/en/learn' : '/fr/learn')
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