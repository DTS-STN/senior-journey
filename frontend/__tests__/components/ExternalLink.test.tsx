import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import ExternalLink from '../../src/components/ExternalLink'

expect.extend(toHaveNoViolations)

describe('ExternalLink component', () => {
  const sut = <ExternalLink href="https://example.com">content</ExternalLink>

  it('renders', () => {
    render(sut)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
