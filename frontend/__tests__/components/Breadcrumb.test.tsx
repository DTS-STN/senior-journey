import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router';

// Move useRouter mock to global scope
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Apply useRouter mock to all tests
const useRouterMock = useRouter as jest.Mock<any>;
useRouterMock.mockReturnValue({
  pathname: '/home',
  asPath: '/home',
});

import Breadcrumb from '../../src/components/Breadcrumb'

expect.extend(toHaveNoViolations)

describe('Breadcrumb', () => {

  const sut = <Breadcrumb />

  it('renders', () => {
    render(sut)
    const screenText = screen.getByText('Canada.ca')
    expect(screenText).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
