import { PropsWithChildren } from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router'

import ApplicationNameBar from '../../src/components/ApplicationNameBar'

const queryClient = new QueryClient()
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

// Move useRouter mock to global scope
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// Apply useRouter mock to all tests
const useRouterMock = useRouter as jest.Mock<any>
useRouterMock.mockReturnValue({
  pathname: '/home',
  asPath: '/home',
})

expect.extend(toHaveNoViolations)

describe('ApplicationNameBar', () => {
  const sut = <ApplicationNameBar text="Test" href="/somelink" checklist="checklist" checklistUrl="checklist-url" />

  it('renders', () => {
    render(sut, { wrapper })

    const screenText = screen.getByText('Test')
    expect(screenText).toBeInTheDocument()
    expect(document.querySelector('a')?.getAttribute('href')).toBe('/somelink')
  })

  it('meets a11y', async () => {
    const { container } = render(sut, { wrapper })

    const results = await waitFor(() => axe(container))
    expect(results).toHaveNoViolations()
  })
})
