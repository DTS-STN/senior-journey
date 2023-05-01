import { utility } from "../../support/Utility"

describe('test id 133 - verify Button/Links - Landing page top section', () => {
  beforeEach(() => {
    cy.visit('/en/home')
  })
  
  it('language link - verify is visible, clickable, html attributes and url pathname.', () => {
    cy.get('[data-cy="toggle-language-link"]').click()
    cy.get('[data-cy="toggle-language-link"]').should('have.attr', 'lang', 'fr')
      .and('have.attr', 'href', '/fr/home')
      .and('be.visible')
    cy.location('pathname').should('equal', '/fr/home')
    cy.contains('Retirement Hub (FR)')

    cy.get('[data-cy="toggle-language-link"]').click()
    cy.get('[data-cy="toggle-language-link"]').should('have.attr', 'lang', 'en')
      .and('have.attr', 'href', '/en/home')
      .and('be.visible')
    cy.location('pathname').should('equal', '/en/home')
    cy.contains('Retirement Hub')
  })

  it('checklist button - verify is visible, clickable, html attributes and url pathname', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()

    cy.get('.p-4 > .mb-6 > .MuiButtonBase-root').should('have.attr', 'href', language ? '/en/home#' : '/fr/home#')
      .and('be.visible')
    cy.location('pathname').should('equal', language ? '/en/home' : '/fr/home')
    cy.get('.p-4 > .mb-6 > .MuiButtonBase-root').click()
  })
})

//broken-link.cy.js
describe('broken link', () => {
  beforeEach(() => {
    cy.viewport(1280, 1000)
  })

  it('find all broken links - verify broken link on landing page', () => {
    cy.visit('/en/home')
    cy.get('a').each(link => {
      if (link.prop('href'))
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: false
        })

      cy.log(link.prop('href'))
    })
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
