beforeEach(() => {
  cy.visit('/')
})

describe('app page loads', () => {
  it('displays the index page', () => {
    cy.location('pathname').should('equal', '/')
  })

  it('redirects to /en/home when accessing /en', () => {
    cy.visit('/en')
    cy.location('pathname').should('equal', '/en/home')
  })

  it('redirects to /fr/home when accessing /fr', () => {
    cy.visit('/fr')
    cy.location('pathname').should('equal', '/fr/home')
  })

  it('should have correct title', () => {
    cy.title().should('eq', 'Seniors Journey | Parcours des aînés - Canada.ca')
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})
