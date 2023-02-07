import React, { ComponentPropsWithoutRef } from 'react'
import './HeaderNavItem.scss'
import cn from 'classnames'

export interface HeaderNavItemProps extends ComponentPropsWithoutRef<'a'> {
  className?: string
  as?: React.ElementType<any>
  active?: boolean
}

const HeaderNavItem = React.forwardRef<HTMLAnchorElement, HeaderNavItemProps>(
  ({ className, children, as = 'a', active = false, ...props }, ref) => {
    const Component = as
    return (
      <Component
        ref={ref}
        className={cn('inf-header-nav-item', className, {
          'inf-header-nav-item--active': active
        })}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

HeaderNavItem.displayName = 'HeaderNav.Item'

export default HeaderNavItem
