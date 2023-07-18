import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import './Label.scss'

export interface LabelProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'prefix'> {
  variant: 'success' | 'danger' | 'warning' | 'info' | 'neutral'
  before?: ReactNode
}

const Label = ({
  children,
  variant = 'neutral',
  before
}: LabelProps): ReactElement => {
  return (
    <span className={cn('inf-label', `inf-label--variant-${variant}`)}>
      {before && <span className="inf-label__before">{before}</span>}
      {children}
    </span>
  )
}

export default Label
