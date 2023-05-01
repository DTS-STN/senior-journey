import { utility } from "../../support/Utility"

describe('test id 162 - verify Learn overview - Top section - Learn page', () => {
  beforeEach(() => {
    cy.visit('/en/learn', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
  })

  it('Find all broken links - verify broken link on landing page', () => {
    cy.get('a').each(link => {
      if (link.prop('href'))
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: false
        })

      cy.log(link.prop('href'))
    })
  })

  it('Learn overview - Top section is visible', () => {
    cy.get('.my-2')
      .should('be.visible')
  })

  it('Learn overview - links to quiz', () => {
    cy.get('.my-2 > .MuiButtonBase-root').click()
    cy.get('.h2')
      .should('be.visible')
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