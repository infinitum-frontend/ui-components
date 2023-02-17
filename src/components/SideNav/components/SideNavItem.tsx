import React, { ComponentPropsWithoutRef } from 'react'
import './SideNavItem.scss'
import cn from 'classnames'

export interface SideNavItemProps extends ComponentPropsWithoutRef<'a'> {
  className?: string
  as?: React.ElementType<any>
  active?: boolean
}

const SideNavItem = React.forwardRef<HTMLAnchorElement, SideNavItemProps>(
  ({ className, children, as = 'a', active = false, ...props }, ref) => {
    const Component = as
    return (
      <Component
        ref={ref}
        className={cn('inf-side-nav-item', className, {
          'inf-side-nav-item--active': active
        })}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

SideNavItem.displayName = 'SideNav.Item'

export default SideNavItem
