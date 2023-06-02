import React, { ComponentPropsWithoutRef } from 'react'
import { HeaderNavItem } from './components/HeaderNavItem'
import './HeaderNav.scss'
import cn from 'classnames'

export interface HeaderNavProps extends ComponentPropsWithoutRef<'nav'> {
  className?: string
}

const HeaderNav = React.forwardRef<HTMLElement, HeaderNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav ref={ref} className={cn('inf-header-nav', className)} {...props}>
        {children}
      </nav>
    )
  }
)

HeaderNav.displayName = 'HeaderNav'

/** Компонент панели навигации для удобного доступа к различным разделам приложения */
export default Object.assign(HeaderNav, {
  Item: HeaderNavItem
})
