/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import ErrorPage from '../../../src/components/pages/ErrorPage'

describe('Error Page', () => {
  it('renders custom statusCode without crashing', () => {
    render(<ErrorPage statusCode={500} />)
    expect(screen.getByText('Error 500')).toBeInTheDocument()
  })

  it('renders no statusCode without crashing', () => {
    render(<ErrorPage />)
    expect(screen.getByText('An error occurred on client')).toBeInTheDocument()
  })
})
