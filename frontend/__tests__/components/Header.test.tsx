import { PropsWithChildren } from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router'

import Header from '../../src/components/Header'

const queryClient = new QueryClient()
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const defaultRouterObj = {
  pathname: '/',
  asPath: '/',
  locale: 'en',
}

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => defaultRouterObj),
}))

expect.extend(toHaveNoViolations)

describe('Header', () => {
  it('renders Header in English', () => {
    render(<Header gocLink="testGocLink" skipToMainText="testSkipToMainText" />, { wrapper })

    const HeaderLang = screen.getByText('Français')
    expect(HeaderLang).toBeInTheDocument()
  })

  it('renders Header in French', () => {
    const useRouterMock = useRouter as jest.Mock
    useRouterMock.mockImplementationOnce(() => ({ ...defaultRouterObj, locale: 'fr' }))

    render(<Header gocLink="testGocLink" skipToMainText="testSkipToMainText" />, { wrapper })

    const HeaderLang = screen.getByText('English')
    expect(HeaderLang).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Header gocLink="testGocLink" skipToMainText="testSkipToMainText" />, { wrapper })

    const results = await waitFor(() => axe(container))
    expect(results).toHaveNoViolations()
  })
})
