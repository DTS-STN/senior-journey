var sizes = ["iphone-3", "iphone-6", "ipad-mini", "macbook-13", "macbook-11", "macbook-16"]
import { utility } from "../../support/Utility"

describe('test id 214 - Supporting Seniors - Mobile', () => {
    context(`${sizes[0]} screen`, () => {
        beforeEach(() => {
            cy.visitAndWait('/en/home')
            cy.viewport(sizes[0])
        })

        it('Supporting Seniors title is visible', () => {
            cy.get('h2').eq(3).should('be.visible')
        })

        it('family and friends card is visible', () => {
            cy.get('h3').eq(1).should('be.visible')
        })

        it('family and friends card is a link', () => {
            let language = new utility().getLanguageMobileScreen()
            cy.wait(2000)
            cy.get('h3').eq(1).click()
            cy.location('pathname').should('equal', language ? '/en/home' : '/fr/home')
        })
    })
})