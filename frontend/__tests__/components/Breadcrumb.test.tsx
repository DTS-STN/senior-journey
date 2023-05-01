import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Breadcrumb from '../../src/components/Breadcrumb'

expect.extend(toHaveNoViolations)

describe('Breadcrumb', () => {

const sampleItems = [
    {
      text: 'Home',
      link: '/home'
    },
    {
      text: 'Learn',
      link: '/learn'
    }
  ]
  const sut = <Breadcrumb items={sampleItems} />

  it('renders', () => {
    render(sut)
    const screenText = screen.getByText('Home')
    expect(screenText).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})