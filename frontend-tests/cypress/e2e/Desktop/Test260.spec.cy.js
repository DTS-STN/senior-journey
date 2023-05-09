import { utility } from "../../support/Utility"

describe('test id 260 - verify Learn overview - Explore our Content - Making Retirement Decisions', () => {
	['en', 'fr'].forEach(lang => {
	  it(`[${lang}] Learn overview - Making retirement decisions`, () => {
		cy.log('https://dev.azure.com/JourneyLab/SeniorsJourney/_workitems/edit/260')		
		cy.visitAndWait(`/${lang}/learn`).get('#mainContent h2').first().should('be.visible')
	  })
  
	  it(`[${lang}] Learn overview - Manage money cards are visible and link to expected pages`, () => {
		const cardSpecs = [
		  // TODO :: GjB :: using `aria-describedby` as a selector is bad; ask developers to add data-cy attributes
		  { 'aria-describedby': 'section-1-card-0', 'href': `/${lang}/learn/when-to-take-your-pensions`},
		  { 'aria-describedby': 'section-1-card-1', 'href': `/${lang}/learn/from-work-to-retirement`},
		  { 'aria-describedby': 'section-1-card-2', 'href': `/${lang}/learn/rule-of-thumb-public-pensions`},
		]
  
		cardSpecs.forEach(cardSpec => {
			cy.visitAndWait(`/${lang}/learn`)
			.get(`#mainContent a[aria-describedby=${cardSpec['aria-describedby']}]`)
			.should('have.attr', 'href', cardSpec['href'])
			.should('be.visible')
		})
	  })
    })
})

 