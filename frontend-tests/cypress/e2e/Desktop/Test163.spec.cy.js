import { utility } from "../../support/Utility"

describe('test id 163 - verify Learn overview - Explore our Content - Manage Money in retirement', () => {
    beforeEach(() => {
        cy.visit('/en/learn', {
            onBeforeLoad: spyOnAddEventListener
        }).then({ timeout: 10000 }, waitForAppStart)
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

function waitForAppStart() {
    // keeps rechecking "appHasStarted" variable
    return new Cypress.Promise((resolve, reject) => {
        const isReady = () => {
            if (appHasStarted) {
                return resolve()
            }
            setTimeout(isReady, 0)
        }
        isReady()
    })
}

let appHasStarted
function spyOnAddEventListener(win) {
    // win = window object in our application
    const addListener = win.EventTarget.prototype.addEventListener
    win.EventTarget.prototype.addEventListener = function (name) {
        if (name === 'change') {
            // web app added an event listener to the input box -
            // that means the web application has started
            appHasStarted = true
            // restore the original event listener
            win.EventTarget.prototype.addEventListener = addListener
        }
        return addListener.apply(this, arguments)
    }
}