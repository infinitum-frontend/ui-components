import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import './Label.scss'
import { ReactComponent as IconWarning } from 'Icons/warning.svg'
import { ReactComponent as IconInfo } from 'Icons/info-circle.svg'
import { ReactComponent as IconCheckIn } from 'Icons/checkInCircle2.svg'

export interface LabelProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'prefix'> {
  /** Варианты лейбла
   *
   * variant: 'danger' was deprecated
   */
  variant:
    | 'info'
    | 'error'
    | 'success'
    | 'warning'
    | 'neutral'
    | 'brand'
    | 'violet'
    | 'teal'
  /** Поддержка стандартной иконки для variant */
  withIcon?: boolean
  before?: ReactNode
}

const defaultIcon = {
  info: <IconInfo />,
  error: <IconWarning />,
  success: <IconCheckIn />,
  warning: <IconWarning />,
  neutral: <IconWarning />,
  brand: <IconWarning />,
  violet: <IconWarning />,
  teal: <IconWarning />,
  danger: <IconWarning />
}

const Label = ({
  children,
  variant = 'neutral',
  withIcon = false,
  before,
  ...props
}: LabelProps): ReactElement => {
  return (
    <span
      className={cn(
        props.className,
        'inf-label',
        `inf-label--variant-${variant}`
      )}
      {...props}
    >
      {withIcon && (
        <span className="inf-label__before">{defaultIcon[variant]}</span>
      )}
      {before && <span className="inf-label__before">{before}</span>}
      {children}
    </span>
  )
}

export default Label
