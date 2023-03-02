import { FC, ReactNode, useEffect, useId, useRef } from 'react'

import { FocusOn } from 'react-focus-on'

import ActionButton, { ActionButtonProps } from './ActionButton'

export interface ModalProps {
  actionButtons: ActionButtonProps[]
  children: ReactNode
  header: string
  onClose: EventListener
  open: boolean
}

const Modal: FC<ModalProps> = ({
  actionButtons,
  children,
  header,
  onClose,
  open,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const id = useId()

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  useEffect(() => {
    const el = dialogRef.current
    el?.addEventListener('close', onClose)
    return () => {
      el?.removeEventListener('close', onClose)
    }
  }, [onClose])

  // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]

  return (
    <dialog
      ref={dialogRef}
      className="w-full border-none bg-transparent p-1 backdrop:bg-black backdrop:bg-opacity-80 md:w-2/3 lg:w-2/5"
    >
      <FocusOn enabled={open}>
        <section
          data-autofocus
          tabIndex={-1}
          className="rounded-md bg-white ring-2 ring-gray-modal"
          aria-describedby={`${id}-modal-header`}
        >
          <header
            id={`${id}-modal-header`}
            className="rounded-t-md border-b border-black bg-blue-deep p-3 text-white"
          >
            <h1>{header}</h1>
          </header>
          <div id={`${id}-modal-desc`} className="p-3">
            {children}
          </div>
          <div className="flex justify-end gap-2 border-t border-gray-modal p-2">
            {actionButtons.map((actionButtonProps) => (
              <ActionButton
                key={actionButtonProps.text}
                {...actionButtonProps}
              />
            ))}
          </div>
        </section>
      </FocusOn>
    </dialog>
  )
}

export default Modal
