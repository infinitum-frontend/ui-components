import React, { ComponentPropsWithoutRef, ReactElement, useState } from 'react'
import cn from 'classnames'
import './Alert.scss'
import {
  IconAlert02,
  IconAlertCircle,
  IconCancel01,
  IconCheckmarkCircle02,
  IconInformationCircle
} from '@infinitum-ui/icons'
import { Icon } from '../Icon'
import { Space } from '../Space'

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
  onClose?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, children, variant = 'neutral', onClose, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(true)

    const getAlertIcon = (): ReactElement => {
      switch (variant) {
        case 'info':
          return (
            <Icon size="medium">
              <IconInformationCircle />
            </Icon>
          )
        case 'success':
          return (
            <Icon size="medium">
              <IconCheckmarkCircle02 />
            </Icon>
          )
        case 'warning':
          return (
            <Icon size="medium">
              <IconAlert02 />
            </Icon>
          )
        default:
          return (
            <Icon size="medium">
              <IconAlertCircle />
            </Icon>
          )
      }
    }

    const handleClose = (): void => {
      setIsVisible(false)
      onClose?.()
    }

    if (!isVisible) return null

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
        <Space direction="horizontal" gap="small">
          <span className="inf-alert__before">{getAlertIcon()}</span>
          {children}
        </Space>
        {onClose && (
          <button className="inf-alert__after" onClick={handleClose} {...props}>
            {
              <Icon size="medium">
                <IconCancel01 />
              </Icon>
            }
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export default Alert
