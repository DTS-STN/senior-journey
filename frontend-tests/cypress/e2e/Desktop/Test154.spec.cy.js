import { utility } from "../../support/Utility"

describe('test id 154 - Automate - Top menu - Learn Plan Apply Manage Tabs - Landing page', () => {
	beforeEach(() => {
		cy.visitAndWait('/en/home')
	})

	it('Learn overview - Top section - Learn page content', () => {
		cy.get('.h2')
			.should('be.visible')
	})

	it.only('Middle Pannel- Learn', () => {
		cy.get('button').each((item) => {
			cy.wrap(item)
				.should('have.attr', 'type', 'button')
				.and('have.attr', 'role', 'tab')
				.and('be.visible')
		})
	})
})