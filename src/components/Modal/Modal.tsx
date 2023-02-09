import React, { ComponentPropsWithoutRef } from 'react'
import ModalBody from './components/ModalBody'
import ModalHeader from './components/ModalHeader'
import ModalFooter from './components/ModalFooter'
import ModalTitle from './components/ModalTitle'
import ModalClose from './components/ModalClose'
import cn from 'classnames'
import './Modal.scss'
import {
  useFloating,
  useDismiss,
  useRole,
  useId,
  useInteractions,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal
} from '@floating-ui/react'

export interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  open: boolean
  size?: 'small' | 'medium' | 'large'
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  hasCloseButton?: boolean
  onClose: () => void
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      open: isOpen = false,
      hasCloseButton = true,
      closeOnClickOutside = true,
      closeOnEsc = true,
      children,
      onClose,
      size = 'medium',
      ...props
    },
    ref
  ) => {
    function handleOpenChange(value: boolean): void {
      if (!value) {
        onClose()
      }
    }

    const { refs, context } = useFloating({
      open: isOpen,
      onOpenChange: handleOpenChange
    })
    const dismiss = useDismiss(context, {
      outsidePressEvent: 'mousedown'
    })
    const role = useRole(context)

    const { getFloatingProps } = useInteractions([dismiss, role])

    const headingId = useId()
    const descriptionId = useId()

    return (
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay
            ref={ref}
            className="inf-modal"
            lockScroll
            {...props}
          >
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                className={cn(
                  'inf-modal__card',
                  `inf-modal__card--size-${size}`
                )}
                aria-labelledby={headingId}
                aria-describedby={descriptionId}
                {...getFloatingProps()}
              >
                {hasCloseButton && <ModalClose onClick={onClose} />}
                {children}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    )
  }
)

Modal.displayName = 'Modal'

export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Title: ModalTitle
})
