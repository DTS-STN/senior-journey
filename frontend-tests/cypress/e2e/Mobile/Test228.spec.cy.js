var sizes = ["iphone-3", "iphone-6", "ipad-mini", "macbook-13", "macbook-11", "macbook-16"]
import { utility } from "../../support/Utility"

describe('Test id 228 - Top Section - Mobile', () => {
    context(`${sizes[1]} screen`, () => {
        beforeEach(() => {
            cy.visitAndWait('/en/home')
            cy.viewport(sizes[0])
        })

        it('Retirement hub title is visible', () => {
            cy.get('.MuiTypography-root > h2')
                .should('be.visible')
        })
    })
})