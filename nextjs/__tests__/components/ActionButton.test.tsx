import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import ActionButton from '../../src/components/ActionButton'

expect.extend(toHaveNoViolations)

describe('ActionButton', () => {
  const { container } = render(<ActionButton text="text" />)

  it('renders', () => {
    const sut = screen.getByText('text')
    expect(sut).toBeInTheDocument()
  })

  it('sets primary style', () => {
    render(<ActionButton text="my-button-text" style="primary" />)
    const sut = screen.getByText('my-button-text')
    expect(sut).toHaveClass(
      'inline-flex justify-center items-center font-display align-middle border shadow-sm focus:ring-1 focus:ring-offset-2 focus:ring-black focus:text-basic-white disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:pointer-events-none undefined px-3.5 py-2.5 rounded text-base border-blue-dark bg-blue-dark text-basic-white focus:bg-blue-normal hover:bg-blue-normal active:bg-blue-active'
    )
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
