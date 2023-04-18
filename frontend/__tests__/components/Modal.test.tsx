import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Modal from '../../src/components/Modal'

expect.extend(toHaveNoViolations)

//Mocks for dialog element until PR containing fix for TypeError is merged into jsdom
HTMLDialogElement.prototype.show = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = true
})

HTMLDialogElement.prototype.showModal = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = true
})

HTMLDialogElement.prototype.close = jest.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = false
})

describe('Modal', () => {
  const { container } = render(
    <Modal
      open
      onClose={jest.fn()}
      actionButtons={[{ id: "action-button", children: 'button text' }]}
      header={'header'}
    >
      <p>description</p>
    </Modal>
  )

  it('renders', () => {
    const sut = screen.getByRole('dialog')
    const header = screen.getByText('header')
    const description = screen.getByText('description')
    const actionButton = screen.getByText('button text')
    expect(sut).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(actionButton).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
