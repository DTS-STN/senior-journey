import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Banner from '../../../src/layouts/default/Banner'

expect.extend(toHaveNoViolations)

describe('Banner', () => {
  const sut = <Banner alert="Test site" description="content" />

  it('renders', () => {
    render(sut)
    const screenText = screen.getByText('content')
    expect(screenText).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
