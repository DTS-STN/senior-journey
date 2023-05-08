describe('test id 156 - verify Top Learning links - Landing page', () => {
  const langs = ['en', 'fr']
  const sizes = ['macbook-13', 'macbook-11', 'macbook-16']

  langs.forEach(lang => {
    const expectedLinks = [`/${lang}/test`, `/${lang}/test2`, `/${lang}/test3`]

    sizes.forEach(size => {
      it(`[${lang}] - ${size} - top learning title visible and links url redirects to /en/fr/ when accessing /en/fr`, () => {
        cy.log('https://dev.azure.com/JourneyLab/SeniorsJourney/_workitems/edit/156')
        const actualLinks = []

        cy.visitAndWait(`/${lang}/home`)
          .viewport(size)
          .get('h3').eq(2).should('be.visible')
          .get('#mainContent li a')
          .each($a => actualLinks.push($a.attr('href')))
          .then(() => {
            expectedLinks.forEach(expectedLink => {
              assert.isTrue(actualLinks.includes(expectedLink), `Expected link ${expectedLink} was not found on page`)
            })
          })
      })
    })
  })
})