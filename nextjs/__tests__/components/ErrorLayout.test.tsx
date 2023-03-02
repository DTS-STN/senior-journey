/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import ErrorLayout from '../../src/components/ErrorLayout'

expect.extend(toHaveNoViolations)

describe('Reusable error page layout', () => {
  const { container } = render(<ErrorLayout />)

  it('ErrorLayout contains a main tag', () => {
    const sut = screen.getByRole('main')
    expect(sut).toBeInTheDocument()
  })

  it('ErrorLayout contains no a11y violations', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
