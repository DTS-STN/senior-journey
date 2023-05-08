var sizes = ["iphone-3", "iphone-6", "ipad-mini", "macbook-13", "macbook-11", "macbook-16"]
	import { utility } from "../../support/Utility"
	
	describe('test id 213 - Automate - Middle Learning Links - Mobile', () => {
	    context(`${sizes[0]} screen`, () => {
	        beforeEach(() => {
				cy.visitAndWait('/en/home')
				cy.viewport(sizes[0])
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
	
	    context(`${sizes[1]} screen`, () => {
	        beforeEach(() => {
				cy.visitAndWait('/en/home')
				cy.viewport(sizes[1])
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
	
	    context(`${sizes[2]} screen`, () => {
	        beforeEach(() => {
				cy.visitAndWait('/en/home')
				cy.viewport(sizes[2])
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
	})