import React, { ComponentPropsWithoutRef } from 'react'
import Notification from '../Notification/Notification'
import { useNotificationStateContext } from '../../NotificationContext'
import './NotificationContainer.scss'
import cn from 'classnames'
import { NotificationOptions } from '../../types'

export interface NotificationContainerProps
  extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const NotificationContainer = React.forwardRef<
  HTMLDivElement,
  NotificationContainerProps
>(({ className, ...props }, ref) => {
  const { notifications } = useNotificationStateContext()

  return (
    <div
      ref={ref}
      className={cn('inf-notification-container', className)}
      {...props}
    >
      {notifications?.map(
        (notification: { id: string; options: NotificationOptions }) => (
          <Notification
            id={notification.id}
            key={notification.id}
            {...notification.options}
          />
        )
      )}
    </div>
  )
})

NotificationContainer.displayName = 'NotificationContainer'

export default NotificationContainer
