import cn from 'classnames'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import './MenuLabel.scss'

export interface MenuLabelProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  children?: ReactNode
}

const MenuLabel = React.forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-menu-label', className)} {...props}>
        {children}
      </div>
    )
  }
)

MenuLabel.displayName = 'MenuLabel'

export default MenuLabel
