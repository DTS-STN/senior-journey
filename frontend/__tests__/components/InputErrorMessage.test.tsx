import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import InputErrorMessage from '../../src/components/InputErrorMessage'

expect.extend(toHaveNoViolations)

describe('InputErrorMessage', () => {
  const { container } = render(<InputErrorMessage message="error message here" />)

  it('renders', () => {
    const sut = screen.getByTestId('input-error-message')
    expect(sut).toBeInTheDocument()
    expect(sut.textContent).toEqual('error message here')
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
