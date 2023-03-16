import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import SupportingSeniorsCard from '../../src/components/SupportingSeniorsCard'

expect.extend(toHaveNoViolations)

describe('SupportingSeniorsCard', () => {
  const sut = <SupportingSeniorsCard 
    src="/assets/supporting-seniors-family-and-friends.svg"
    href=""
    linkText="Family and Friends"
    text="Learn how you can help your loved ones enter the retirement stage in their life."
  />

  it('renders', () => {
    render(sut)
    const screenText = screen.getByText(/Family and Friends/i)
    expect(screenText).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
