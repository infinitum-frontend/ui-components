import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './index.scss'

export interface LayoutBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const LayoutBody = React.forwardRef<HTMLDivElement, LayoutBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-layout-body', className)} {...props}>
        {children}
      </div>
    )
  }
)

LayoutBody.displayName = 'LayoutBody'

export default LayoutBody
