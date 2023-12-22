import React from 'react'
import cn from 'classnames'
import { useNotificationDispatchContext } from '../../context/NotificationContext'
import { NotificationProps, ActionKind } from '../../types'
import { CloseButton } from 'Components/CloseButton'
import { ReactComponent as CheckInCircleIcon } from 'Icons/checkInCircle.svg'
import { ReactComponent as ExclamationMarkInCircleIcon } from 'Icons/exclamationMarkInCircle.svg'
import * as ToastPrimitives from '@radix-ui/react-toast'
import './Notification.scss'

const iconsMap: Record<string, React.ReactElement> = {
  info: <ExclamationMarkInCircleIcon />,
  success: <CheckInCircleIcon />,
  warning: <ExclamationMarkInCircleIcon />,
  error: <ExclamationMarkInCircleIcon />
}

/**
 * Всплывающее окно с сообщением
 */
const Notification = React.forwardRef<HTMLLIElement, NotificationProps>(
  (
    { className, message, title, id, duration = 5000, type, actionSlot },
    ref
  ) => {
    const dispatch = useNotificationDispatchContext()

    const handleOpenChange = (open: boolean): void => {
      if (!open) {
        dispatch({ type: ActionKind.Delete, payload: { id } })
      }
    }

    const IconComponent = type ? iconsMap[type] : undefined

    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(
          'inf-notification',
          className,
          `inf-notification--type-${type as string}`
        )}
        duration={duration}
        onOpenChange={handleOpenChange}
      >
        {IconComponent && (
          <div className="inf-notification__icon">{IconComponent}</div>
        )}

        <div
          className={cn('inf-notification__body', {
            'inf-notification__body--with-extra-padding': IconComponent
          })}
        >
          {title && (
            <ToastPrimitives.Title className="inf-notification__title">
              {title}
            </ToastPrimitives.Title>
          )}

          <ToastPrimitives.Description className="inf-notification__message">
            {message}
          </ToastPrimitives.Description>

          {actionSlot && (
            <ToastPrimitives.Action asChild altText="action">
              {actionSlot}
            </ToastPrimitives.Action>
          )}
        </div>

        <ToastPrimitives.Close aria-label="Close" asChild>
          <CloseButton
            className="inf-notification__close-btn"
            size="small"
            aria-hidden
          />
        </ToastPrimitives.Close>
      </ToastPrimitives.Root>
    )
  }
)

Notification.displayName = 'Notification'

export default Notification
