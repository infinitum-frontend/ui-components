import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import './Label.scss'
import { ReactComponent as IconWarning } from 'Icons/warning.svg'
import { ReactComponent as IconInfo } from 'Icons/info-circle.svg'
import { ReactComponent as IconCheckIn } from 'Icons/checkInCircle2.svg'

export interface LabelProps
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
  icon?: boolean
  before?: ReactNode
}

const Label = ({
  children,
  variant = 'neutral',
  icon = false,
  before
}: LabelProps): ReactElement => {
  return (
    <span className={cn('inf-label', `inf-label--variant-${variant}`)}>
      {icon &&
        (variant === 'info' ? (
          <span className="inf-label__before">{<IconInfo />}</span>
        ) : variant === 'success' ? (
          <span className="inf-label__before">{<IconCheckIn />}</span>
        ) : (
          <span className="inf-label__before">{<IconWarning />}</span>
        ))}
      {before && <span className="inf-label__before">{before}</span>}
      {children}
    </span>
  )
}

export default Label
