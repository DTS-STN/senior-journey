import { utility } from "../../support/Utility"
	
	describe('test id 130 - Automate Footer link - Landing page section', () => {
	  beforeEach(() => {
	    cy.visit('/en/learn')
	  })
	
	  it('Learn overview - Top section - Learn page content', () => {
	    cy.get('.h2')
	      .should('be.visible')
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
	})
