import { utility } from "../../support/Utility"

describe('test id 220 - verify Plan link - Landing page', () => {
  beforeEach(() => {
    cy.visitAndWait('en/home')
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