import React from 'react'
import cn from 'classnames'
import useTimeout from 'Hooks/useTimeout'
import { useNotificationDispatchContext } from '../../context/NotificationContext'
import { NotificationProps, ActionKind } from '../../types'
import { CloseButton } from 'Components/CloseButton'
import './Notification.scss'
/**
 * Всплывающее окно с сообщением
 */
const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    { className, message, id, duration = 5000, type = 'default', ...props },
    ref
  ) => {
    const dispatch = useNotificationDispatchContext()

    function close(): void {
      dispatch({ type: ActionKind.Delete, payload: { id } })
    }

    if (duration) {
      useTimeout(close, duration)
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inf-notification',
          className,
          `inf-notification--type-${type}`
        )}
        role="alert"
        {...props}
      >
        <div className="inf-notification__text">{message}</div>
        <CloseButton
          className="inf-notification__close-btn"
          onClick={close}
          size="small"
        />
      </div>
    )
  }
)

Notification.displayName = 'Notification'

export default Notification
