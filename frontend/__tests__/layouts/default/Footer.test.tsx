import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Footer from '../../../src/layouts/default/Footer'

expect.extend(toHaveNoViolations)

describe('Footer', () => {
  it('renders Footer with links', () => {
    render(
      <Footer
        dateModifiedText="testDateModified"
        footerHeader="testFooterHeader"
        footerLogo={{
          alt: 'testAltText',
          src: '/testImage',
          width: 1,
          height: 1,
        }}
        footerNavHeader="footerNavHeader"
        links={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
          {
            link: 'https://some-link-2.com',
            linkText: 'some-lin-2',
          },
          {
            link: 'https://some-link-3.com',
            linkText: 'some-link-3',
          },
          {
            link: 'https://some-link-4.com',
            linkText: 'some-link-4',
          },
        ]}
        learningMaterialsText='learning materials text'
        learningMaterialsLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        menuText='footer.menu-text'
        menuLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        footerTopOfPage='footer.top-of-page'
      />
    )
    const footerLink = screen.getByText('some-link-4')
    expect(footerLink).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Footer
        dateModifiedText="testDateModified"
        footerHeader="testFooterHeader"
        footerLogo={{
          alt: 'testAltText',
          src: '/testImage',
          width: 1,
          height: 1,
        }}
        links={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        footerNavHeader="testFooterNavHeader"
        learningMaterialsText='learning materials text'
        learningMaterialsLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        menuText='footer.menu-text'
        menuLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        footerTopOfPage='footer.top-of-page'
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
