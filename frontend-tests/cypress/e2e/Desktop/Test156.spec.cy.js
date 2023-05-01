import { utility } from "../../support/Utility"

describe('test id 156 - verify Top Learning links - Landing page', () => {
  beforeEach(() => {
    cy.visit('/en/home', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
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