import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import cn from 'classnames'
import './Alert.scss'
import IconInfoCircle from 'Icons/info-circle.svg?react'
import IconCheckCircle from 'Icons/check-circle.svg?react'
import IconAlertCircle from 'Icons/alert-circle.svg?react'

export interface AlertProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'prefix'> {
  variant:
    | 'info'
    | 'error'
    | 'success'
    | 'warning'
    | 'neutral'
    | 'brand'
    | 'violet'
    | 'teal'
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, children, variant = 'neutral', ...props }, ref) => {
    const getAlertIcon = (): ReactElement => {
      switch (variant) {
        case 'info':
          return <IconInfoCircle />
        case 'success':
          return <IconCheckCircle />
        default:
          return <IconAlertCircle />
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inf-alert',
          `inf-alert--variant-${variant as string}`,
          className
        )}
        {...props}
      >
        <span className="inf-alert__before">{getAlertIcon()}</span>
        {children}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export default Alert
