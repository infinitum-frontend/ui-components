import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'

export interface MenuItemProps extends ComponentPropsWithoutRef<'button'> {
  className?: string
}

const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('inf-menu-item', className)}
        role="menuitem"
        {...props}
      >
        {children}
      </button>
    )
  }
)

MenuItem.displayName = 'MenuItem'

export default MenuItem
