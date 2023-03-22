import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router';

// Mock useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/home',
    asPath: '/home',
  }),
}));


import Breadcrumb from '../../src/components/Breadcrumb'

expect.extend(toHaveNoViolations)

describe('Breadcrumb', () => {

  const useRouterMock = useRouter as jest.Mock<any>;

  beforeEach(() => {
    useRouterMock.mockClear();
  });

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
