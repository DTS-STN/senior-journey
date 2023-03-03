import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import ApplicationNameBar from '../../src/components/ApplicationNameBar'

expect.extend(toHaveNoViolations)

describe('ApplicationNameBar', () => {
  const sut = <ApplicationNameBar text="Test" href="/somelink" />

  it('renders', () => {
    render(sut)

    const screenText = screen.getByText('Test')
    expect(screenText).toBeInTheDocument()
    expect(document.querySelector('a')?.getAttribute('href')).toBe('/somelink')
  })

  it('meets a11y', async () => {
    const { container } = render(sut)

    const results = await waitFor(() => axe(container))
    expect(results).toHaveNoViolations()
  })
})
