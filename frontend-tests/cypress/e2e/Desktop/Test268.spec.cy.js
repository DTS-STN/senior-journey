describe('test id 268 - verify Learn Overview - Breadcrumb', () => {
  it.only('canada link - click url redirects to /en when accessing /en', () => {
    cy.visitAndWait('/en/home')
    cy.get('.block > :nth-child(1) > .MuiTypography-root').click()
    cy.origin('https://www.canada.ca', () => {
      cy.wait(3000)
      cy.location('pathname').should('equal', '/en.html')
    })
  })

  it('canada link - click url redirects to /fr when accessing /fr', () => {
    cy.visitAndWait('/fr/home')
    cy.get('.block > :nth-child(1) > .MuiTypography-root').click()
    cy.origin('https://www.canada.ca', () => {
      cy.wait(3000)
      cy.location('pathname').should('equal', '/fr.html')
    })
  })

  it('learn link - retirement-income-sources redirects to /en when accessing /en', () => {
    cy.visitAndWait('/en/learn/retirement-income-sources')
    cy.location('pathname').should('equal', '/en/learn/retirement-income-sources')
  })

  it('learn link - retirement-income-sources redirects to /fr when accessing /fr', () => {
    cy.visitAndWait('/fr/learn/retirement-income-sources')
    cy.location('pathname').should('equal', '/fr/learn/retirement-income-sources')
  })

  it('learn link - redirects to /en when accessing /en', () => {
    cy.visitAndWait('/en/learn/retirement-income-sources')
    cy.get('.block > :nth-child(2) > .MuiTypography-root').click()
    cy.location('pathname').should('equal', '/en/learn')
  })

  it('learn link - planning-to-save-for-retirement redirects to /en when accessing /en', () => {
    cy.visitAndWait('/en/learn/planning-to-save-for-retirement')
    cy.location('pathname').should('equal', '/en/learn/planning-to-save-for-retirement')
  })

  it('learn link - planning-to-save-for-retirement redirects to /fr when accessing /fr', () => {
    cy.visitAndWait('/fr/learn/planning-to-save-for-retirement')
    cy.location('pathname').should('equal', '/fr/learn/planning-to-save-for-retirement')
  })

  it('learn link - redirects to /fr when accessing /fr', () => {
    cy.visitAndWait('/fr/learn/retirement-income-sources')
    cy.get('.block > :nth-child(2) > .MuiTypography-root').click()
    cy.location('pathname').should('equal', '/fr/learn')
  })
})