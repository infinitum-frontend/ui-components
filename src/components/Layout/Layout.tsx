import React, { ComponentPropsWithoutRef } from 'react'
import LayoutHeader from './components/LayoutHeader'
import LayoutBody from './components/LayoutBody'
import cn from 'classnames'
import './Layout.scss'

export interface LayoutProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-layout', className)} {...props}>
        {children}
      </div>
    )
  }
)

Layout.displayName = 'Layout'

/** Компонент для упорядочивания контентных блоков */
export default Object.assign(Layout, {
  Header: LayoutHeader,
  Body: LayoutBody
})
