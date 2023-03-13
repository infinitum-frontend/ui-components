import React, { ComponentPropsWithoutRef } from 'react'
import ModalBody from './components/ModalBody'
import ModalHeader from './components/ModalHeader'
import ModalFooter from './components/ModalFooter'
import ModalTitle from './components/ModalTitle'
import { CloseButton } from 'Components/CloseButton'
import cn from 'classnames'
import './Modal.scss'
import {
  useFloating,
  useDismiss,
  useRole,
  useId,
  useInteractions,
  useTransitionStatus,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal
} from '@floating-ui/react'

export interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  open: boolean
  onClose: () => void
  size?: 'small' | 'medium' | 'large'
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  hasCloseButton?: boolean
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      open: isOpen = false,
      onClose,
      hasCloseButton = true,
      closeOnClickOutside = true,
      closeOnEsc = true,
      children,
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
      escapeKey: closeOnEsc,
      outsidePress: closeOnClickOutside,
      outsidePressEvent: 'mousedown'
    })
    const role = useRole(context)

    const { getFloatingProps } = useInteractions([dismiss, role])

    const headingId = useId()
    const descriptionId = useId()

    const { isMounted, status } = useTransitionStatus(context)

    return (
      <FloatingPortal>
        {isMounted && (
          <FloatingOverlay
            ref={ref}
            className={cn('inf-modal', className)}
            lockScroll
            data-status={status}
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
                data-status={status}
                {...getFloatingProps()}
              >
                {hasCloseButton && (
                  <div>
                    <CloseButton
                      className="inf-modal__close-btn"
                      onClick={onClose}
                    />
                  </div>
                )}
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
