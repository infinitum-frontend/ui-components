import { ComponentPropsWithoutRef, ReactElement } from 'react'
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

const Alert = ({ children, variant = 'neutral' }: AlertProps): ReactElement => {
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
    <div className={cn('inf-alert', `inf-alert--variant-${variant as string}`)}>
      <span className="inf-alert__before">{getAlertIcon()}</span>
      {children}
    </div>
  )
}

export default Alert
