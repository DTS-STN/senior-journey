var sizes = ["iphone-3", "iphone-6", "ipad-mini", "macbook-13", "macbook-11", "macbook-16"]
import { utility } from "../../support/Utility"

describe('test id 215 - Automate - Contact Us - Mobile', () => {
    context(`${sizes[0]} screen`, () => {
        beforeEach(() => {
            cy.visit('/')
            cy.viewport(sizes[0])
        })
            
        

        it('Contact Us', () => {
            cy.get('#english-button').click()
            let language = new utility().getLanguageMobileScreen()

            cy.scrollTo('center')

            cy.get('#mainContent > :nth-child(6)')
                .should('have.text', language ? 'Contact Us' : '(FR)Contact Us')
                .and('be.visible')

            cy.wait(2000)
            cy.get(':nth-child(9) > .mb-4')
                .should('have.text', language ? 'Call us' : '(FR)Call us')
                .and('be.visible')

            cy.wait(2000)
            
            cy.wait(2000)
            cy.get('.grid > :nth-child(1) > .MuiTypography-root').click({ force: true })
                .should('have.text', language ? '1-800-800-277-9914' : '1-800-800-277-9914')
                .and('be.visible')            
            
            cy.get('.grid > :nth-child(2) > .MuiTypography-root').click({ force: true })  
                 .should('have.text', language ? '1-800-255-4786' : '1-800-255-4786')
                 .and('be.visible')
                 
            cy.get('.grid > :nth-child(2) > .MuiTypography-root').click({ force: true })  
                 .should('have.text', language ? '1-613-957-1954 (Call collect)' : '1-613-957-1954 (Call collect) (FR)')
                 .and('be.visible')      
            
                          
            cy.wait(2000)
            cy.get(':nth-child(10) > .MuiButtonBase-root').click({ force: true })
                .should('have.text', language ? 'Find a Service Canada Centre' : '(FR)Find a Service Canada Centre')
                .and('be.visible')

        })             
             
    })

})

    
