import React from 'react'
import Notification from '../Notification/Notification'
import { useNotificationStateContext } from '../../context/NotificationContext'
import './NotificationContainer.scss'
import cn from 'classnames'
import { NotificationOptions } from '../../types'
import * as ToastPrimitives from '@radix-ui/react-toast'

export const NOTIFICATION_CONTAINER_CLASSNAME = 'inf-notification-container'

export interface NotificationContainerProps {
  className?: string
}

const Provider = ToastPrimitives.Provider

const Viewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> &
    NotificationContainerProps
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(NOTIFICATION_CONTAINER_CLASSNAME, className)}
    {...props}
  />
))
Viewport.displayName = 'NotificationContainerViewport'

const NotificationContainer = React.forwardRef<
  HTMLDivElement,
  NotificationContainerProps
>(({ className, ...props }, ref) => {
  const { notifications } = useNotificationStateContext()
  console.log('notifications', notifications)

  return (
    <Provider>
      <>
        {notifications?.map(
          (notification: { id: string; options: NotificationOptions }) => (
            <Notification
              id={notification.id}
              key={notification.id}
              {...notification.options}
            />
          )
        )}
        <Viewport />
      </>
    </Provider>
  )
})

NotificationContainer.displayName = 'NotificationContainer'

export default NotificationContainer
