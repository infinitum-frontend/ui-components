import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'

export interface MenuListProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inf-menu-list', className)}
        role="menu"
        {...props}
      >
        {children}
      </div>
    )
  }
)

MenuList.displayName = 'MenuList'

export default MenuList
