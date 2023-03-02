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

  const { container } = render(
    <ErrorSummary
      id="id"
      summary="summary"
      errors={[{ feildId: 'id', errorMessage: 'error' }]}
    />
  )

  it('renders', () => {
    const sut = screen.getByText('summary')
    expect(sut).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
