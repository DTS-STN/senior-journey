import { utility } from "../../support/Utility"

describe('test id 156 - verify Top Learning links - Landing page', () => {
  beforeEach(() => {
    cy.visitAndWait('/en/home')
  })

  it('Top learning title is visible', () => {
    cy.get('h3').eq(2).should('be.visible')
  })

  it('Main sources of retirement income link click url redirects to /en/fr/ when accessing /en/fr', ()=> {
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