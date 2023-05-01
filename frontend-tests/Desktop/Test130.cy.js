import { utility } from "../../support/Utility"
	
describe('test id 130 - Automate Footer link - Landing page section', () => {
	  beforeEach(() => {
	    cy.visit('/en/learn')
	  })

	  it('Learn overview - Top section - Learn page content', () => {
	    cy.get('.h2')
	      .should('be.visible')
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

	//Sources of retirement income  
	it('Testing all English footer link 1.) Sources of retirement income ', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()        
		cy.get('.col-span-2 > :nth-child(1) > .MuiTypography-root').click({ force: true })

    })

    //CPP Program Overview
	it('Testing all English footer link  2.) CPP Program Overview', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()        
		cy.get('.col-span-2 > :nth-child(2) > .MuiTypography-root').click({ force: true })
    })

    //OAS Program Overview
	it('Testing all English footer link 3.) OAS Program Overview', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()         
		cy.get('.col-span-2 > :nth-child(3) > .MuiTypography-root').click({ force: true })
    })

    //Saving for retirement
	it('Testing all English footer link 4.) Saving for retirement', () => {
        cy.visit('/')
        cy.get('#english-button').click()   
		let language = new utility().getLanguageTabletOrMonitorScreen()     
		cy.get('.col-span-2 > :nth-child(4) > .MuiTypography-root').click({ force: true })
    })

    //Do you qualify for CPP retirement pension
	it('Testing all English footer link 5.) Do you qualify for CPP retirement pension', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()       
		cy.get('.col-span-2 > :nth-child(4) > .MuiTypography-root').click({ force: true })

    })

    //Contributions to the CPP
	it('Testing all English footer link 6.) Contributions to the CPP', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen() 
        cy.get(':nth-child(6) > .MuiTypography-root').click({ force: true })
    })

    //Situations that can affect your pension amount
	it('Testing all English footer link 7.) Situations that can affect your pension amount', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()        
		cy.get(':nth-child(6) > .MuiTypography-root').click({ force: true })
    })

    //When to start your retirement pension
	it('Testing all English footer link 7.) When to start your retirement pension', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()      
		cy.get(':nth-child(8) > .MuiTypography-root').click({ force: true })
    })
    
    //Do you qualify for the OAS pension
    it('Testing all English footer link 9.) Do you qualify for the OAS pension', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()        
		cy.get(':nth-child(9) > .MuiTypography-root').click({ force: true })
		
    })

    //How much could you receive from OAS
    it('Testing all English footer link 10.) How much could you receive from OAS', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen() 
        //cy.get('li').contains('How much could you receive from OAS').click({ force: true })
		cy.get(':nth-child(10) > .MuiTypography-root').click({ force: true })
    })

    //Learn
	it('Testing all English footer link 1.) Learn', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()       
        cy.get(':nth-child(2) > .space-y-2 > :nth-child(1) > .MuiTypography-root').click({ force: true })
    })

    //Plan
	it('Testing all English footer link 2.) Plan', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()        
		cy.get(':nth-child(2) > .space-y-2 > :nth-child(1) > .MuiTypography-root').click({ force: true })
    })

    //Apply
	it('Testing all English footer link 3.) Apply', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()        
		cy.get(':nth-child(2) > .space-y-2 > :nth-child(2) > .MuiTypography-root').click({ force: true })
    })

    //Manage
	it('Testing all English footer link 4.) Manage', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen()        
		cy.get(':nth-child(2) > .space-y-2 > :nth-child(4) > .MuiTypography-root').click({ force: true })
    })    

    //Terms and Condition
	it('Testing all English footer link 5.) Terms and onditions', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen() 
        cy.get('li').contains('Terms and conditions').click({ force: true })

    })

    //Privacy
	it('Testing all English footer link 6.) Privacy', () => {
        cy.visit('/')
        cy.get('#english-button').click()
		let language = new utility().getLanguageTabletOrMonitorScreen() 
        cy.get('li').contains('Privacy').click({ force: true })
    })
  })

})	 



