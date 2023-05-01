var sizes = ["iphone-3", "iphone-6", "ipad-mini", "macbook-13", "macbook-11", "macbook-16"]
import { utility } from "../../support/Utility"

describe('Test id 228 - Top Section - Mobile', () => {
    context(`${sizes[1]} screen`, () => {
        beforeEach(() => {
            cy.visit('/en/home', {
                onBeforeLoad: spyOnAddEventListener
            }).then({ timeout: 10000 }, waitForAppStart)
            cy.viewport(sizes[0])
        })

        it('Retirement hub title is visible', () => {
            cy.get('.MuiTypography-root > h2')
                .should('be.visible')
        })
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
