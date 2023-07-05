/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Error404Page from '../../../src/components/pages/Error404Page'

describe('Error 404 Page', () => {
  it('renders 404 without crashing', () => {
    render(<Error404Page />)
    expect(screen.getByText('Error 404')).toBeInTheDocument()
  })
})
