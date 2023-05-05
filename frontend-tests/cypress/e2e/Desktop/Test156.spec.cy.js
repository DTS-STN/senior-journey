import { utility } from "../../support/Utility"
let langurl = Cypress.config().language
let language = new utility().getLanguage()
var sizes = ["macbook-13", "macbook-11", "macbook-16"]

describe(`[${langurl}] - ${sizes[0]} test id 156 - verify Top Learning links - Landing page`, () => {
  beforeEach(() => {
    cy.log('https://dev.azure.com/JourneyLab/SeniorsJourney/_workitems/edit/156')
    cy.viewport(sizes[0])
    cy.visitAndWait(`/${langurl}/home`)
  })

  it(`[${langurl}] - ${sizes[0]} - Top learning title is visible`, () => {
    cy.get('h3').first().should('be.visible')
  })

  it(`[${langurl}] - ${sizes[0]} - Main sources of retirement income link click url redirects to /en/fr/ when accessing /en/fr`, ()=> {
    cy.get('li').eq(1)
    .should('have.attr', 'href', language ? '/en/test' : '/fr/test')
    .should('be.visible')
  })

  it(`[${langurl}] - ${sizes[0]} - Planning to save for retirement link click url redirects to /en/fr/ when accessing /en/fr`, () => {
    cy.get('li').eq(2)
    .should('have.attr', 'href', language ? '/en/test2' : '/fr/test2')
    .should('be.visible')
  })

  it(`[${langurl}] - ${sizes[0]} - When to take your public pensions link click url redirects to /en/fr/ when accessing /en/fr`, () => {
    cy.get('li').eq(3)
    .should('have.attr', 'href', language ? '/en/test3' : '/fr/test3')
    .should('be.visible')
  })
})

describe(`[${langurl}] - ${sizes[1]} test id 156 - verify Top Learning links - Landing page`, () => {
  beforeEach(() => {
    cy.log('https://dev.azure.com/JourneyLab/SeniorsJourney/_workitems/edit/156')
    cy.viewport(sizes[1])
    cy.visitAndWait(`/${langurl}/home`)
  })

  it(`[${langurl}] - ${sizes[1]} - Top learning title is visible`, () => {
    cy.get('h3').first().should('be.visible')
  })

  it(`[${langurl}] - ${sizes[1]} - Main sources of retirement income link click url redirects to /en/fr/ when accessing /en/fr`, ()=> {
    cy.get('li').eq(1)
    .should('have.attr', 'href', language ? '/en/test' : '/fr/test')
    .should('be.visible')
  })

  it(`[${langurl}] - ${sizes[1]} - Planning to save for retirement link click url redirects to /en/fr/ when accessing /en/fr`, () => {
    cy.get('li').eq(2)
    .should('have.attr', 'href', language ? '/en/test2' : '/fr/test2')
    .should('be.visible')
  })

  it(`[${langurl}] - ${sizes[1]} - When to take your public pensions link click url redirects to /en/fr/ when accessing /en/fr`, () => {
    cy.get('li').eq(3)
    .should('have.attr', 'href', language ? '/en/test3' : '/fr/test3')
    .should('be.visible')
  })
})

describe(`[${langurl}] - ${sizes[2]} test id 156 - verify Top Learning links - Landing page`, () => {
  beforeEach(() => {
    cy.log('https://dev.azure.com/JourneyLab/SeniorsJourney/_workitems/edit/156')
    cy.viewport(sizes[2])
    cy.visitAndWait(`/${langurl}/home`)
  })

  it(`[${langurl}] - ${sizes[2]} - Top learning title is visible`, () => {
    
    cy.get('h3').first().should('be.visible')
  })

  it(`[${langurl}] - ${sizes[2]} - Main sources of retirement income link click url redirects to /en/fr/ when accessing /en/fr`, ()=> {
    cy.get('li').eq(1)
    .should('have.attr', 'href', language ? '/en/test' : '/fr/test')
    .should('be.visible')
  })

  it(`[${langurl}] - ${sizes[2]} - Planning to save for retirement link click url redirects to /en/fr/ when accessing /en/fr`, () => {
    cy.get('li').eq(2)
    .should('have.attr', 'href', language ? '/en/test2' : '/fr/test2')
    .should('be.visible')
  })

  it(`[${langurl}] - ${sizes[2]} - When to take your public pensions link click url redirects to /en/fr/ when accessing /en/fr`, () => {
    cy.get('li').eq(3)
    .should('have.attr', 'href', language ? '/en/test3' : '/fr/test3')
    .should('be.visible')
  })
})