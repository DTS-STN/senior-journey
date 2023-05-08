import { utility } from "../../support/Utility"

describe('test id 162 - verify Learn overview - Top section - Learn page', () => {
  beforeEach(() => {
    cy.visitAndWait('/en/learn')
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