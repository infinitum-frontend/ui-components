import { ComponentPropsWithoutRef, ReactElement } from 'react'
import cn from 'classnames'
import './Alert.scss'
import { ReactComponent as IconWarning } from 'Icons/warning.svg'
import { ReactComponent as IconCheck } from 'Icons/checkInCircle2.svg'
import { ReactComponent as IconInfo } from 'Icons/info-circle.svg'

export interface AlertProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'prefix'> {
  variant:
    | 'info'
    | 'danger'
    | 'success'
    | 'warning'
    | 'neutral'
    | 'error'
    | 'violet'
    | 'teal'
}

const Alert = ({ children, variant = 'neutral' }: AlertProps): ReactElement => {
  const getAlertIcon = (): ReactElement => {
    switch (variant) {
      case 'info':
        return <IconInfo />
      case 'success':
        return <IconCheck />
      default:
        return <IconWarning />
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
