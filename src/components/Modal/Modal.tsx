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
import { NOTIFICATION_CONTAINER_CLASSNAME } from 'Components/Notification/components/NotificationContainer/NotificationContainer'

export interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  open: boolean
  onClose: () => void
  size?: 'small' | 'medium' | 'large' | 'full'
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  hasCloseButton?: boolean
  /** Нужно ли вешать фокус на referenceElement при закрытии модалки */
  returnFocus?: boolean
  /** Куда нужно установить фокус при открытии */
  initialFocus?: number | React.MutableRefObject<HTMLElement | null>
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
      returnFocus = true,
      initialFocus = 0,
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
      outsidePress: (e) => {
        const el = e.target as HTMLElement

        // если нажатый элемент находится внутри компонента нотификации, не триггерим закрытие модалки
        if (el.closest(`.${NOTIFICATION_CONTAINER_CLASSNAME as string}`)) {
          return false
        }

        return closeOnClickOutside
      },
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
            className="inf-modal-container"
            lockScroll
            data-status={status}
          >
            <FloatingFocusManager
              context={context}
              returnFocus={returnFocus}
              initialFocus={initialFocus}
            >
              <div
                ref={refs.setFloating}
                className={cn(
                  'inf-modal',
                  `inf-modal--size-${size}`,
                  className
                )}
                aria-labelledby={headingId}
                aria-describedby={descriptionId}
                data-status={status}
                {...getFloatingProps()}
                {...props}
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

/** Модальное окно */
export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Title: ModalTitle
})
