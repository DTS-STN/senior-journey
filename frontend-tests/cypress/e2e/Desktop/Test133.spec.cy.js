import { utility } from "../../support/Utility"

describe('test id 133 - verify Button/Links - Landing page top section', () => {
  beforeEach(() => {
    cy.visit('/en/home')
  })
  
  it('language link - verify is visible, clickable, html attributes and url pathname.', () => {
    cy.get('[data-cy="toggle-language-link"]').click()
    cy.get('[data-cy="toggle-language-link"]').should('have.attr', 'lang', 'fr')
      .and('have.attr', 'href', '/fr/home')
      .and('be.visible')
    cy.location('pathname').should('equal', '/fr/home')
    cy.contains('Retirement Hub (FR)')

    cy.get('[data-cy="toggle-language-link"]').click()
    cy.get('[data-cy="toggle-language-link"]').should('have.attr', 'lang', 'en')
      .and('have.attr', 'href', '/en/home')
      .and('be.visible')
    cy.location('pathname').should('equal', '/en/home')
    cy.contains('Retirement Hub')
  })

  it('checklist button - verify is visible, clickable, html attributes and url pathname', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()

    cy.get('.p-4 > .mb-6 > .MuiButtonBase-root').should('have.attr', 'href', language ? '/en/home#' : '/fr/home#')
      .and('be.visible')
    cy.location('pathname').should('equal', language ? '/en/home' : '/fr/home')
    cy.get('.p-4 > .mb-6 > .MuiButtonBase-root').click()
  })
})

//broken-link.cy.js
describe('broken link', () => {
  beforeEach(() => {
    cy.viewport(1280, 1000)
  })

  it('find all broken links - verify broken link on landing page', () => {
    cy.visit('/en/home')
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

beforeEach(() => {
  cy.request({ url: '/404', failOnStatusCode: false })
    .its('status')
    .should('equal', 403)
  cy.visit('/404', { failOnStatusCode: false })
})

describe('not found page loads', () => {
  it('status 404 - verify displays the not found page with 404 in pathname', () => {
    cy.location('pathname').should('equal', '/404')
  })

  it('status 404 - should have correct title', () => {
    cy.title().should('eq', 'Not Found | Pas trouvé - Canada.ca')
  })
})




