var sizes = ["iphone-3", "iphone-6", "ipad-mini", "macbook-13", "macbook-11", "macbook-16"]
import { utility } from "../../support/Utility"

describe('test id 207 - Navigation with resolutions', () => {
    context.only(`${sizes[0]} screen`, () => {
        beforeEach(() => {
            cy.visit('/en/home')
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

        it('Top learning title is visible', () => {
            cy.get('h3').eq(2).should('be.visible')
        })

        it('Main sources of retirement income link click url redirects to /en/fr/ when accessing /en/fr', () => {
            let language = new utility().getLanguageMobileScreen()
            cy.wait(2000)
            cy.get('button').eq(0).click()
            cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-body1').click()
            cy.location('pathname').should('equal', language ? '/en/test' : '/fr/test')
        })

        it('Planning to save for retirement link click url redirects to /en/fr/ when accessing /en/fr', () => {
            let language = new utility().getLanguageMobileScreen()
            cy.wait(2000)
            cy.get('button').eq(0).click()
            cy.get(':nth-child(3) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-body1').click()
            cy.location('pathname').should('equal', language ? '/en/test2' : '/fr/test2')
        })

        it('When to take your public pensions link click url redirects to /en/fr/ when accessing /en/fr', () => {
            let language = new utility().getLanguageMobileScreen()
            cy.wait(2000)
            cy.get('button').eq(0).click()
            cy.get(':nth-child(5) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-body1').click()
            cy.location('pathname').should('equal', language ? '/en/test3' : '/fr/test3')
        })
    })

    context(`${sizes[1]} screen`, () => {
        beforeEach(() => {
            cy.visit('/en/home')
            cy.viewport(sizes[1])
        })

        it('Top learning title is visible', () => {
            cy.get('h3').eq(2).should('be.visible')
        })

        it('Main sources of retirement income link click url redirects to /en/fr/ when accessing /en/fr', () => {
            let language = new utility().getLanguageTabletOrMonitorScreen()
            cy.wait(2000)
            cy.get('button').eq(0).click()
            cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-body1').click()
            cy.location('pathname').should('equal', language ? '/en/test' : '/fr/test')
        })

        it('Planning to save for retirement link click url redirects to /en/fr/ when accessing /en/fr', () => {
            let language = new utility().getLanguageTabletOrMonitorScreen()
            cy.wait(2000)
            cy.get('button').eq(0).click()
            cy.get(':nth-child(3) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-body1').click()
            cy.location('pathname').should('equal', language ? '/en/test2' : '/fr/test2')
        })

        it('When to take your public pensions link click url redirects to /en/fr/ when accessing /en/fr', () => {
            let language = new utility().getLanguageTabletOrMonitorScreen()
            cy.wait(2000)
            cy.get('button').eq(0).click()
            cy.get(':nth-child(5) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-body1').click()
            cy.location('pathname').should('equal', language ? '/en/test3' : '/fr/test3')
        })
    })

    context(`${sizes[2]} screen`, () => {
        beforeEach(() => {
            cy.visit('/fr/home')
            cy.viewport(sizes[2])
        })

        it('Top learning title is visible', () => {
            cy.get('h3').eq(2).should('be.visible')
        })

        it('Main sources of retirement income link click url redirects to /en/fr/ when accessing /en/fr', () => {
            let language = new utility().getLanguageTabletOrMonitorScreen()
            cy.wait(2000)
            cy.get('button').eq(0).click()
            cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-body1').click()
            cy.location('pathname').should('equal', language ? '/en/test' : '/fr/test')
        })

        it('Planning to save for retirement link click url redirects to /en/fr/ when accessing /en/fr', () => {
            let language = new utility().getLanguageTabletOrMonitorScreen()
            cy.wait(2000)
            cy.get('button').eq(0).click()
            cy.get(':nth-child(3) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-body1').click()
            cy.location('pathname').should('equal', language ? '/en/test2' : '/fr/test2')
        })

        it('When to take your public pensions link click url redirects to /en/fr/ when accessing /en/fr', () => {
            let language = new utility().getLanguageTabletOrMonitorScreen()
            cy.wait(2000)
            cy.get('button').eq(0).click()
            cy.get(':nth-child(5) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-body1').click()
            cy.location('pathname').should('equal', language ? '/en/test3' : '/fr/test3')
        })
    })
})