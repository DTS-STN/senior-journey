import { FC } from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import { DateSelectProps } from '../../src/components/DateSelect'
import DateSelectField from '../../src/components/DateSelectField'

expect.extend(toHaveNoViolations)

const DateSelectMock: FC<DateSelectProps> = ({ label }: DateSelectProps) => {
  return <div data-testid="date-selector">{label}</div>
}

jest.mock('../../src/components/DateSelect', () => DateSelectMock)

describe('DateSelectField', () => {
  const sut = (
    <DateSelectField
      id="date-picker"
      label="Date Picker"
      onChange={jest.fn()}
      value="Some value"
    />
  )

  it('renders', () => {
    render(sut)
    const screenText = screen.getByText('Date Picker')
    expect(screenText).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
