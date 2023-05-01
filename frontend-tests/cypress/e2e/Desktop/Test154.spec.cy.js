import { utility } from "../../support/Utility"

describe('test id 154 - Automate - Top menu - Learn Plan Apply Manage Tabs - Landing page', () => {
	beforeEach(() => {
		cy.visit('/en/home', {
			onBeforeLoad: spyOnAddEventListener
		}).then({ timeout: 10000 }, waitForAppStart)
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