import React, { ComponentPropsWithoutRef } from 'react'
import './Notification.scss'
import cn from 'classnames'

export interface NotificationProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  variant?: 'info' | 'success'
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, children, variant = 'info', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inf-notification', className, [
          `inf-notification--variant-${variant}`
        ])}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Notification.displayName = 'Notification'

export default Notification
