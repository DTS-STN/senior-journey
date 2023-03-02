import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Collapse from '../../src/components/Collapse'

expect.extend(toHaveNoViolations)

describe('Collapse', () => {
  const sut = (
    <Collapse title="title">
      <p>content</p>
    </Collapse>
  )

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
