import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react'
import { InfPortal } from '../Portal'
import { useClickOutside } from '../../hooks/useClickOutside'
import './Modal.scss'
import ModalCard from './components/ModalCard'
import ModalBody from './components/ModalBody'
import ModalHeader from './components/ModalHeader'
import ModalFooter from './components/ModalFooter'
import ModalTitle from './components/ModalTitle'
import ModalClose from './components/ModalClose'

export interface IModalProps extends PropsWithChildren<ReactElement> {
  isOpen?: boolean
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  onClose: () => void
}

const Modal = ({
  isOpen = false,
  closeOnClickOutside = true,
  closeOnEsc = true,
  children,
  onClose
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
    <InfPortal>
      <div className={'inf-modal'}>
        {children}
      </div>
    </InfPortal>
  )
}

Modal.Card = ModalCard
Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.Title = ModalTitle
Modal.Close = ModalClose

export default Modal
