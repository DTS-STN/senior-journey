import React, { PropsWithChildren } from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { axe, toHaveNoViolations } from 'jest-axe'

import Layout from '../../src/components/Layout'

const queryClient = new QueryClient()
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

//mock custom components
jest.mock('../../src/components/Header')
jest.mock('../../src/components/Footer')

expect.extend(toHaveNoViolations)

describe('Layout with default text', () => {
  const sut = <Layout>Content</Layout>

  it('Layout contains a Main tag', () => {
    render(sut, { wrapper })
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('Layout contains no a11y violations', async () => {
    const { container } = render(sut, { wrapper })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
