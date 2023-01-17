import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react'
import { Portal } from '../Portal'
import { useClickOutside } from 'Hooks/useClickOutside'
import ModalBody from './components/ModalBody'
import ModalHeader from './components/ModalHeader'
import ModalFooter from './components/ModalFooter'
import ModalTitle from './components/ModalTitle'
import ModalClose from './components/ModalClose'
import cn from 'classnames'
import './Modal.scss'

export interface IModalProps extends PropsWithChildren<ReactElement> {
  className: string
  isOpen?: boolean
  size?: 'small' | 'medium' | 'large'
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  closeButton?: boolean
  onClose: () => void
}

const Modal = ({
  className,
  isOpen = false,
  closeButton = true,
  closeOnClickOutside = true,
  closeOnEsc = true,
  children,
  onClose,
  size = 'medium',
  ...props
}: IModalProps): ReactElement | null => {
  let ref = null

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

  // обработка closeOnClickOutside
  if (closeOnClickOutside) {
    ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => {
      onClose()
    })
  }

  // render
  if (!isOpen) {
    return null
  }

  return (
    <Portal>
      <div className={cn('inf-modal', className)} {...props}>
        <div className={cn('inf-modal__card', `inf-modal__card--size-${size}`)}>
          {closeButton && <ModalClose />}
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
