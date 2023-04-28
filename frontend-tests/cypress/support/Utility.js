//utility.js
let language = Cypress.config().language

export class utility {
    getLanguageMobileScreen() {
        if (language == "French") {
            cy.get('abbr').click({ force: true })
            return false
        }
        else {
            return true
        }
    }

    getLanguageTabletOrMonitorScreen() {
        if (language == "French") {
            cy.get('[data-cy="toggle-language-link"]').click()
            return false
        }
        else {
            return true
        }
    }
}