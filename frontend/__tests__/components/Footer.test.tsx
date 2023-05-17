import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Footer from '../../src/components/Footer'

const defaultRouterObj = {
  pathname: '/',
  asPath: '/',
  locale: 'en',
}

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => defaultRouterObj),
}))

expect.extend(toHaveNoViolations)

describe('Footer', () => {
  it('renders Footer with links', () => {
    render(
      <Footer
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
        exploreRetirementText="learning materials text"
        exploreRetirementLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        menuText="footer.menu-text"
        menuLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        retirementStoriesText="retirement stories text"
        retirementStoriesLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
      />
    )
    const footerLink = screen.getByText('some-link-4')
    expect(footerLink).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Footer
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
        exploreRetirementText="learning materials text"
        exploreRetirementLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        menuText="footer.menu-text"
        menuLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
        retirementStoriesText="retirement stories text"
        retirementStoriesLinks={[
          {
            link: 'https://some-link-1.com',
            linkText: 'some-link-1',
          },
        ]}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
