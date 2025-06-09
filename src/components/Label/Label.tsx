import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'
import cn from 'classnames'
import './Label.scss'
import IconInfoCircle from 'Icons/info-circle.svg?react'
import IconCheckCircle from 'Icons/check-circle.svg?react'
import IconAlertCircle from 'Icons/alert-circle.svg?react'

export interface LabelProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'prefix'> {
  /** Варианты лейбла */
  variant:
    | 'info'
    | 'error'
    | 'success'
    | 'warning'
    | 'neutral'
    | 'brand'
    | 'violet'
    | 'teal'
  tone?: 'heavy' | 'light'
  /** Поддержка стандартной иконки для variant */
  withIcon?: boolean
  before?: ReactNode
}

const defaultIcon = {
  info: <IconInfoCircle />,
  error: <IconAlertCircle />,
  success: <IconCheckCircle />,
  warning: <IconAlertCircle />,
  neutral: <IconAlertCircle />,
  brand: <IconAlertCircle />,
  violet: <IconAlertCircle />,
  teal: <IconAlertCircle />,
  danger: <IconAlertCircle />
}

const Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    {
      children,
      variant = 'neutral',
      tone = 'heavy',
      withIcon = false,
      before,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(className, 'inf-label', `inf-label--variant-${variant}`, {
          [`inf-label--tone-${tone as string}`]: tone
        })}
        {...props}
      >
        {withIcon && (
          <span className="inf-label__before">{defaultIcon[variant]}</span>
        )}
        {before && <span className="inf-label__before">{before}</span>}
        {children && <span className="inf-label__content">{children}</span>}
      </span>
    )
  }
)

Label.displayName = 'Label'

export default Label
