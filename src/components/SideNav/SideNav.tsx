import React, { ComponentPropsWithoutRef } from 'react'
import SideNavItem from './components/SideNavItem'
import './SideNav.scss'
import cn from 'classnames'

export interface SideNavProps extends ComponentPropsWithoutRef<'nav'> {
  className?: string
}

const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav ref={ref} className={cn('inf-side-nav', className)} {...props}>
        {children}
      </nav>
    )
  }
)

SideNav.displayName = 'SideNav'

/** Компонент боковой панели навигации для удобного доступа к различным разделам приложения */
export default Object.assign(SideNav, {
  Item: SideNavItem
})
