import { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { Portal } from '../Portal'
import ModalBody from './components/ModalBody'
import ModalHeader from './components/ModalHeader'
import ModalFooter from './components/ModalFooter'
import ModalTitle from './components/ModalTitle'
import ModalClose from './components/ModalClose'
import cn from 'classnames'
import './Modal.scss'
import { useMount } from './useMount'
import { CSSTransition } from 'react-transition-group'

export const ANIMATION_TIME = 200
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
  const { mounted } = useMount(open)
  const [animationIn, setAnimationIn] = useState(false)

  useEffect(() => {
    setAnimationIn(open)
  }, [open])

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

  if (!mounted) {
    return null
  }

  return (
    <Portal>
      <CSSTransition
        appear={true}
        in={animationIn}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames="inf-modal-"
      >
        <div
          className={cn('inf-modal', className)}
          role="dialog"
          onClick={onClose}
          {...props}
        >
          <div
            className={cn('inf-modal__card', `inf-modal__card--size-${size}`)}
            onClick={(e) => e.stopPropagation()}
          >
            {hasCloseButton && <ModalClose onClick={onClose} />}
            {children}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.Title = ModalTitle

export default Modal
