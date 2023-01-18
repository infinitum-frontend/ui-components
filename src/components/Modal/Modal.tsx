import { PropsWithChildren, ReactElement, useEffect } from 'react'
import { Portal } from '../Portal'
import ModalBody from './components/ModalBody'
import ModalHeader from './components/ModalHeader'
import ModalFooter from './components/ModalFooter'
import ModalTitle from './components/ModalTitle'
import ModalClose from './components/ModalClose'
import cn from 'classnames'
import './Modal.scss'

export interface IModalProps extends PropsWithChildren<ReactElement> {
  className?: string
  open: boolean
  size?: 'small' | 'medium' | 'large'
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  hasCloseButton?: boolean
  onClose: () => void
}

const Modal = ({
  className,
  open = false,
  hasCloseButton = true,
  closeOnClickOutside = true,
  closeOnEsc = true,
  children,
  onClose,
  size = 'medium',
  ...props
}: IModalProps): ReactElement | null => {
  // обработка closeOnEsc
  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', keydownHandler)
    return () => document.removeEventListener('keydown', keydownHandler)
  }, [closeOnEsc])

  if (!open) {
    return null
  }

  return (
    <Portal>
      <div className={cn('inf-modal', className)} {...props} onClick={onClose}>
        <div
          className={cn('inf-modal__card', `inf-modal__card--size-${size}`)}
          onClick={(e) => e.stopPropagation()}
        >
          {hasCloseButton && <ModalClose onClick={onClose} />}
          {children}
        </div>
      </div>
    </Portal>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.Title = ModalTitle

export default Modal
