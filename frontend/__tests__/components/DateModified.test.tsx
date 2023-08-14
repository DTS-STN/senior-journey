import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import DateModified from '../../src/components/DateModified'

expect.extend(toHaveNoViolations)

describe('DateModified', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
    process.env.NEXT_PUBLIC_BUILD_DATE = '2000-01-01'
  })

  afterEach(() => {
    process.env = env
  })

  it('renders dateModified', () => {
    const { container } = render(<DateModified id="date-modified" text="Date Modified" />)
    const dl = container.querySelector('#date-modified')
    const dt = dl?.querySelector('dt')
    const dd = dl?.querySelector('dd')
    expect(dl).toBeInTheDocument()
    expect(dl?.tagName).toBe('DL')
    expect(dt?.textContent).toBe('Date Modified')
    expect(dd?.textContent).toBe('2000-01-01')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<DateModified id="date-modified" text="Date Modified" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
