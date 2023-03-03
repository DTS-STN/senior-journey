import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import LinkButton from '../../src/components/LinkButton'

expect.extend(toHaveNoViolations)

describe('LinkButton', () => {
  const sut = <LinkButton href={'/'} text="text" />

  it('renders', () => {
    render(sut)

    const screenText = screen.getByText('text')
    expect(screenText).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const { container } = render(sut)

    const results = await waitFor(() => axe(container))
    expect(results).toHaveNoViolations()
  })
})
