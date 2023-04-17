import { FC, ReactNode, useEffect, useId, useRef } from 'react'
import { FocusOn } from 'react-focus-on'
import Button from '@mui/material/Button';
import { MdClose } from 'react-icons/md'

export interface QuizModalProps {
  children: ReactNode
  onClose: () => void
  open: boolean
}

const QuizModal: FC<QuizModalProps> = ({ children, onClose, open }) => {
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

  return (
    <dialog
      ref={dialogRef}
      className="w-full border-none bg-transparent p-1 backdrop:bg-black backdrop:bg-opacity-80 md:w-2/3 lg:w-2/5"
    >
      <FocusOn enabled={open}>
        <section
          data-autofocus
          tabIndex={-1}
          className="rounded-md bg-white p-6"
          aria-describedby={`${id}-QuizModal-header`}
        >
          <div className="flex justify-end gap-2 p-2">
          
            <Button variant="text" className="hover:bg-white text-primary-700 normal-case font-bold text-base" onClick={onClose}>
            <MdClose className="inline text-2xl font-bold text-primary-700 mr-2" /> Close
            </Button>
          </div>
          <div id={`${id}-QuizModal-desc`} className="p-3">
            {children}
          </div>
        </section>
      </FocusOn>
    </dialog>
  )
}

export default QuizModal
