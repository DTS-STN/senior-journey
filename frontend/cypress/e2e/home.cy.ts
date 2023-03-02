beforeEach(() => {
  cy.visit('/home')
})

describe('home page loads', () => {
  it('displays the home page', () => {
    cy.location('pathname').should('equal', '/en/home')
  })

  it('should have correct title in English', () => {
    cy.get('h1')
      .filter(':visible')
      .invoke('text')
      .then((text) => {
        cy.title().should('eq', `${text} - Seniors journey - Canada.ca`)
      })
  })

  it('should have correct title in French', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.wait(200)
    cy.get('h1')
      .filter(':visible')
      .invoke('text')
      .then((text) => {
        cy.title().should('eq', `${text} - Parcours seniors - Canada.ca`)
      })
  })

  it('should have a bar in the header with the application name', () => {
    cy.get('#app-bar').should('be.visible')
  })

  it('should redirect you to the home page when clicking the text in the application name bar', () => {
    cy.get('#app-bar a').click()
    cy.location('pathname').should('equal', '/en/home')
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})
