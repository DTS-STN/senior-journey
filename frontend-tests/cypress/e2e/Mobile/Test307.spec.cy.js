var sizes = ["iphone-3", "iphone-6", "ipad-mini", "macbook-13", "macbook-11", "macbook-16"]
import { utility } from "../../support/Utility"

describe('test id 307 - Automate Top section - Mobile', () => {
	context(`${sizes[0]} screen`, () => {
		beforeEach(() => {
			cy.visit('/en/home', {
				onBeforeLoad: spyOnAddEventListener
			}).then({ timeout: 10000 }, waitForAppStart)
			cy.viewport(sizes[0])
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
	})

	context(`${sizes[1]} screen`, () => {
		beforeEach(() => {
			cy.visit('/en/home', {
				onBeforeLoad: spyOnAddEventListener
			}).then({ timeout: 10000 }, waitForAppStart)
			cy.viewport(sizes[1])
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
	})

	context(`${sizes[2]} screen`, () => {
		beforeEach(() => {
			cy.visit('/en/home', {
				onBeforeLoad: spyOnAddEventListener
			}).then({ timeout: 10000 }, waitForAppStart)
			cy.viewport(sizes[2])
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

