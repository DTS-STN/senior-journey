import { utility } from "../../support/Utility"

describe('test case id - 130 Digital Gateway Landing Footer Automate Footer link Landing page section', () => {
	beforeEach(() => {
		cy.visitAndWait('/en/home')
	})
	it('Testing all English footer link 1.) Sources of retirement income ', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li').contains(language ? 'Sources of retirement income' : 'Sources of retirement income (FR)').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/sources-of-retirement-income' : '/fr/sources-of-retirement-income-fr')
	})

	it('Testing all English footer link  2.) CPP Program Overview', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li').contains('CPP Program Overview').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/cpp-program-overview' : '/fr/cpp-program-overview-fr')
	})

	it('Testing all English footer link 3.) OAS Program Overview', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li').contains('OAS Program Overview').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/oas-program-overview' : '/fr/oas-program-overview-fr')
	})

	it('Testing all English footer link 4.) Saving for retirement', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li', { timeout: 10000 }).contains('Saving for retirement').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/saving-for-retirement' : '/fr/saving-for-retirement-fr')
	})

	it('Testing all English footer link 5.) Do you qualify for CPP retirement pension', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li').contains('Do you qualify for CPP retirement pension').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/do-you-qualify-for-cpp-retirement-pension' : '/fr/do-you-qualify-for-cpp-retirement-pension-fr')
	})

	it('Testing all English footer link 6.) Contributions to the CPP', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li').contains('Contributions to the CPP').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/contributions-to-the-cpp' : '/fr/contributions-to-the-cpp-fr')
	})

	it('Testing all English footer link 7.) Situations that can affect your pension amount', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li').contains('Situations that can affect your pension amount').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/situations-that-can-affect-your-pension-amount' : '/fr/situations-that-can-affect-your-pension-amount-fr')
	})

	it('Testing all English footer link 8.) When to start your retirement pension', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li').contains('When to start your retirement pension').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/when-to-start-your-retirement-pension' : '/fr/when-to-start-your-retirement-pension-fr')
	})

	it('Testing all English footer link 9.) Do you qualify for the OAS pension', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li').contains('Do you qualify for the OAS pension').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/do-you-qualify-for-the-oas-pension' : '/fr/do-you-qualify-for-the-oas-pension-fr')
	})

	it('Testing all English footer link 10.) How much could you receive from OAS', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get('li').contains('How much could you receive from OAS').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/how-much-could-you-receive-from-oas' : '/fr/how-much-could-you-receive-from-oas-fr')
	})

	it('Testing all English footer link 1.) Learn', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get(':nth-child(2) > .space-y-2 > :nth-child(1) > .MuiTypography-root').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/learn' : '/fr/learn')
	})

	it('Testing all English footer link 2.) Plan', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get(':nth-child(2) > .space-y-2 > :nth-child(2) > .MuiTypography-root').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/plan' : '/fr/plan')
	})

	it('Testing all English footer link 3.) Apply', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get(':nth-child(2) > .space-y-2 > :nth-child(3) > .MuiTypography-root').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/apply' : '/fr/apply')
	})

	it('Testing all English footer link 4.) Manage', () => {
		let language = new utility().getLanguage()
		cy.wait(2000)
		cy.get(':nth-child(2) > .space-y-2 > :nth-child(4) > .MuiTypography-root').click({ force: true })
		cy.location('pathname').should('equal', language ? '/en/manage' : '/fr/manage')
	})

	it('Testing all English footer link 5.) Terms and onditions', () => {
		cy.get('li').contains('Terms and conditions').click({ force: true })
		cy.origin('https://www.canada.ca', () => {
			cy.wait(2000)
			cy.location('pathname').should('equal', '/en/transparency/terms.html')
			cy.get('#wb-cont').should('have.text', '\nTerms and conditions')
		})
	})

	it('Testing all English footer link 6.) Privacy', () => {
		cy.get('li').contains('Privacy').click({ force: true })
		cy.origin('https://www.canada.ca', () => {
			cy.wait(2000)
			cy.location('pathname').should('equal', '/en/transparency/privacy.html')
			cy.get('#wb-cont').should('have.text', '\nPrivacy')
		})
	})
})