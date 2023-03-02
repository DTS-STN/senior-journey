import { FC } from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'

import IdleTimeout from '../../src/components/IdleTimeout'
import { ModalProps } from '../../src/components/Modal'

const ModalMock: FC<ModalProps> = ({ open }: ModalProps) => {
  return <div data-testid="modal">{open ? 'modal-opened' : 'modal-closed'}</div>
}

jest.mock('next/router', () => ({
  useRouter: () => ({}),
}))
jest.mock('../../src/components/Modal', () => ModalMock)

describe('IdleTimeout', () => {
  it('renders with modal closed', () => {
    render(<IdleTimeout />)
    const modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
    expect(modal.textContent).toMatch('modal-closed')
  })

  it('renders with modal opened after 1 second timeout', async () => {
    render(<IdleTimeout promptBeforeIdle={4000} timeout={5000} />)
    await waitFor(
      () => {
        const modal = screen.getByTestId('modal')
        expect(modal).toBeInTheDocument()
        expect(modal.textContent).toMatch('modal-opened')
      },
      { timeout: 3000 }
    )
  })
})
