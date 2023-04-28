import { utility } from "../../support/Utility"

describe('test id 155 - verify Learn link - Landing page', () => {
  beforeEach(() => {
    cy.visit('en/home')
  })

  it('learn tab - verify is visible and html attributes', () => {
    cy.get('button').eq(0).should('have.attr', 'type', 'button')
      .and('have.attr', 'tabindex', '0')
      .and('have.attr', 'role', 'tab')
      .and('have.attr', 'aria-selected', 'true')
      .and('be.visible')
  })

  it.only('learn link click url redirects to /en/fr/ when accessing /en/fr', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()
    cy.wait(2000)
    cy.get('button').eq(0).click()
    cy.get('.text-right > .MuiButtonBase-root').click()
    cy.wait(2000)
    cy.location('pathname').should('equal', language ? '/en/learn' : '/fr/learn')
  })
})