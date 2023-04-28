import { utility } from "../../support/Utility"

describe('test id 163 - verify Learn overview - Explore our Content - Manage Money in retirement', () => {
    beforeEach(() => {
        cy.visit('/en/learn')
    })
    it('Learn overview - Manage Money in retirement is visible', () => {
        cy.get('h2').eq(2)
            .should('be.visible')
    })

    it('Learn overview - card 1 is visible', () => {
        cy.get('#section-0-card-0')
            .should('be.visible')
    })

    it('Learn overview - card 2 is visible', () => {
        cy.get('#section-1-card-1')
            .should('be.visible')
    })

    it('Learn overview - card 1 link click url redirects to /en/fr/ when accessing /en/fr', () => {
        let language = new utility().getLanguageTabletOrMonitorScreen()
        cy.wait(2000)
        cy.get('#section-0-card-0').click()
        cy.location('pathname').should('equal', language ? '/en/learn/retirement-income-sources' : '/fr/learn/retirement-income-sources')
    })

    it('Learn overview - card 2 link click url redirects to /en/fr/ when accessing /en/fr', () => {
        let language = new utility().getLanguageTabletOrMonitorScreen()
        cy.wait(2000)
        cy.get('#section-0-card-1').click()
        cy.location('pathname').should('equal', language ? '/en/learn/planning-to-save-for-retirement' : '/fr/learn/planning-to-save-for-retirement')
    })
})