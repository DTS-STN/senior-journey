import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import ErrorSummary from '../../src/components/ErrorSummary'

expect.extend(toHaveNoViolations)

describe('ErrorSummary', () => {
  /**
   * @see https://stackoverflow.com/a/60225417
   */
  window.HTMLElement.prototype.scrollIntoView = jest.fn()

  const { container } = render(<ErrorSummary id="id" errors={[{ feildId: 'id', errorMessage: 'invalid input' }]} />)

  it('renders', () => {
    const header = screen.getByText('found-errors')
    expect(header).toBeInTheDocument()
    const error = screen.getByText('invalid input')
    expect(error).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
