import React, { ComponentPropsWithoutRef } from 'react'
import './styles.scss'
import cn from 'classnames'

export interface MenuProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-menu', className)} {...props}>
        {children}
      </div>
    )
  }
)

Menu.displayName = 'Menu'

export default Menu
