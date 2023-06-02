import React, { ComponentPropsWithoutRef } from 'react'
import './Divider.scss'
import cn from 'classnames'

export interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'secondary'
}

/** Компонент для визуального разделения контента */
const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    { className, orientation = 'horizontal', variant = 'default', ...props },
    ref
  ) => {
    return (
      <hr
        ref={ref}
        className={cn('inf-divider', className, [
          `inf-divider--orientation-${orientation}`,
          `inf-divider--variant-${variant}`
        ])}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'

export default Divider
