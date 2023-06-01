import React, { ComponentPropsWithoutRef } from 'react'
import Notification from '../Notification/Notification'
import { useNotificationStateContext } from '../../NotificationContext'
import './NotificationContainer.scss'
import cn from 'classnames'
import { NotificationOptions } from '../../types'
import { FloatingPortal } from '@floating-ui/react'

export const NOTIFICATION_CONTAINER_CLASSNAME = 'inf-notification-container'

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
    <FloatingPortal>
      <div
        ref={ref}
        className={cn(NOTIFICATION_CONTAINER_CLASSNAME, className)}
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
    </FloatingPortal>
  )
})

NotificationContainer.displayName = 'NotificationContainer'

export default NotificationContainer
