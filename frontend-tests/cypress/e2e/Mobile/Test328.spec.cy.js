import { utility } from "../../support/Utility"
var sizes = ["iphone-3", "iphone-6", "ipad-mini"]

describe('test id 328 - Main Sources of retirement income - Learning page', () => {
  beforeEach(() => {
    cy.visit('/en/learn/retirement-income-sources#overview', {
      onBeforeLoad: spyOnAddEventListener
    }).then({ timeout: 10000 }, waitForAppStart)
  })

  //Left menu and items visible screen sizes tests
  it(`${sizes[0]} screen left menu items are not visible \'Overview of retirement income sources\'`, () => {
    cy.viewport(sizes[0])
    for (var i = 0; i < 7; i++) {
      cy.get('li.MuiListItem-root.MuiListItem-gutters.mui-style-pjl2lh').eq(i)
        .should('not.visible')
    }
  })

  it(`${sizes[1]} screenleft menu items are not visible \'Overview of retirement income sources\'`, () => {
    cy.viewport(sizes[1])
    for (var i = 0; i < 7; i++) {
      cy.get('li.MuiListItem-root.MuiListItem-gutters.mui-style-pjl2lh').eq(i)
        .should('not.visible')
    }
  })

  it(`${sizes[2]} screenleft menu items are not visible \'Overview of retirement income sources\'`, () => {
    cy.viewport(sizes[2])
    for (var i = 0; i < 7; i++) {
      cy.get('li.MuiListItem-root.MuiListItem-gutters.mui-style-pjl2lh').eq(i)
        .should('not.visible')
    }
  })

  //Scroll screen sizes tests
  it(`${sizes[0]} title 1 \'Overview\' scroll into view linear`, () => {
    cy.viewport(sizes[0])
    cy.get('.mb-10')
      .scrollIntoView({
        easing: 'linear',
        duration: 1000,
      })
      .click()
  })

  it(`${sizes[0]} title 2 \'Canada\'s retirement income system\' scroll into view`, () => {
    cy.viewport(sizes[0])
    cy.get('#canada-retirement-income-system').scrollIntoView().click()
  })

  it(`${sizes[0]} title 3 \'Old Age Security (OAS) program\' scroll into view`, () => {
    cy.viewport(sizes[0])
    cy.get('#old-age-security-program').scrollIntoView().click()
  })

  it(`${sizes[0]} title 4 \'Canada Pension Plan (CPP) program\' scroll into view`, () => {
    cy.viewport(sizes[0])
    cy.get('#canada-pension-plan-program').scrollIntoView().click()
  })

  it(`${sizes[0]} title 5 \'Ongoing earnings from your job\' scroll into view`, () => {
    cy.viewport(sizes[0])
    cy.get('#ongoing-earnings-from-your-job').scrollIntoView().click()
  })

  it(`${sizes[0]} title 6 \'Workplace pension plans\' scroll into view`, () => {
    cy.viewport(sizes[0])
    cy.get('#workplace-pension-plans').scrollIntoView().click()
  })

  it(`${sizes[0]} title 7 \'Personal retirement savings\' scroll into view`, () => {
    cy.viewport(sizes[0])
    cy.get('#personal-retirement-savings').scrollIntoView().click()
  })

  //Left menu items are clickable tests
  it(`${sizes[0]} left menu items are clickable`, () => {
    cy.viewport(sizes[0])
    for (var i = 0; i < 7; i++) {
    cy.get('li.MuiListItem-root.MuiListItem-gutters.mui-style-pjl2lh').eq(i).click({ force: true })
    }
  })

  it(`${sizes[1]} left menu items are clickable`, () => {
    cy.viewport(sizes[1])
    for (var i = 0; i < 7; i++) {
    cy.get('li.MuiListItem-root.MuiListItem-gutters.mui-style-pjl2lh').eq(i).click({ force: true })
    }
  })

  it(`${sizes[2]} left menu items are clickable`, () => {
    cy.viewport(sizes[2])
    for (var i = 0; i < 7; i++) {
    cy.get('li.MuiListItem-root.MuiListItem-gutters.mui-style-pjl2lh').eq(i).click({ force: true })
    }
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

  describe('verify \'this OAS Pension page\' link', () => {
    it('\'this OAS Pension page\' link - click url redirects to /en when accessing /en', () => {
      cy.visit('/en/learn/retirement-income-sources#overview', {
        onBeforeLoad: spyOnAddEventListener
      }).then({ timeout: 10000 }, waitForAppStart)
      cy.get('a').eq(16).click({ force: true })
      cy.origin('https://www.canada.ca/en/', () => {
        cy.wait(3000)
        cy.location('pathname').should('equal', '/en/services/benefits/publicpensions/cpp/old-age-security/eligibility.html')
        cy.get('#wb-cont').should('be.visible')
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
})