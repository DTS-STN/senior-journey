import { utility } from "../../support/Utility"

describe('test id 157 - verify Supporting Seniors - Landing page ', () => {
  beforeEach(() => {
    cy.visitAndWait('en/home')
  })

  it('Supporting Seniors title is visible', () => {
    cy.get('h2').eq(3).should('be.visible')
  })

  it('family and friends card is visible', () => {
    cy.get('h3').eq(1).should('be.visible')
  })

  it('family and friends card is a link', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()
    cy.wait(2000)
    cy.get('h3').eq(1).click()
    cy.location('pathname').should('equal', language ? '/en/home' : '/fr/home')
  })

  it('representatives card in visible', () => {
    cy.get('h3').eq(2).should('be.visible')
  })

  it('representatives card is a link', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()
    cy.wait(2000)
    cy.get('h3').eq(2).click()
    cy.location('pathname').should('equal', language ? '/en/home' : '/fr/home')
  })

  it('organization card is visible', () => {
    cy.get('h3').eq(3).should('be.visible')
  })

  it('organization card is a link', () => {
    let language = new utility().getLanguageTabletOrMonitorScreen()
    cy.wait(2000)
    cy.get('h3').eq(3).click()
    cy.location('pathname').should('equal', language ? '/en/home' : '/fr/home')
  })
})