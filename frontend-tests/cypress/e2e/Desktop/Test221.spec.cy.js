import { utility } from "../../support/Utility"

describe('test id 221 - verify Apply link - Landing page', () => {
  beforeEach(() => {
    cy.visitAndWait('en/home')
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