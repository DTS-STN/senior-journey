describe('test id 133 - verify Button/Links - Landing page top section', () => {
  const langs = ['en', 'fr']
  const sizes = ['macbook-13', 'macbook-11', 'macbook-16']

  sizes.forEach(size => {
    langs.forEach(lang => {
      it(`[${lang}] - ${size} -language link - verify is visible, clickable, html attributes and url pathname.`, () => {
        cy.log('https://dev.azure.com/JourneyLab/SeniorsJourney/_workitems/edit/133')
        cy.visitAndWait(`/${lang}/home`)
        cy.viewport(size)
        cy.get('[data-cy="toggle-language-link"]').click()
        cy.get('[data-cy="toggle-language-link"]').should('have.attr', 'lang', lang)
          .and('have.attr', 'href', `/${lang}/home`)
          .and('be.visible')
        if (lang == 'fr') {
          cy.location('pathname').should('equal', '/en/home')
        }
        else {
          cy.location('pathname').should('equal', '/fr/home')
        }
      })
    })
  })
})