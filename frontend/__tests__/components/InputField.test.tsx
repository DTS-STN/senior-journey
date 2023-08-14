import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import InputField from '../../src/components/InputField'

expect.extend(toHaveNoViolations)

describe('InputField', () => {
  const { container } = render(<InputField id="id" name="name" label="label" onChange={() => {}} value="" />)

  it('renders', () => {
    const sut = screen.getByTestId('id')
    expect(sut).toBeInTheDocument()
    expect(sut.querySelector(`#id`)).toHaveAccessibleName('label')
    expect(sut.querySelector(`#id`)).not.toHaveAccessibleDescription()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders with accessible description', () => {
    const { getByTestId } = render(
      <InputField
        id="accessible-description"
        name="name"
        label="label"
        onChange={() => {}}
        errorMessage="Error Message"
        helpMessage="Help Message"
      />,
    )
    const sut = getByTestId('accessible-description')
    expect(sut).toBeInTheDocument()
    expect(sut.querySelector('input')).toHaveAccessibleDescription(expect.stringContaining('Error Message'))
    expect(sut.querySelector('input')).toHaveAccessibleDescription(expect.stringContaining('Help Message'))
  })
})
