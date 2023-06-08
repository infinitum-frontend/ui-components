import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './PageHeader.scss'

export interface PageHeaderProps extends ComponentPropsWithoutRef<'header'> {
  className?: string
}

const PageHeader = React.forwardRef<HTMLHeadElement, PageHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header ref={ref} className={cn('inf-page-header', className)} {...props}>
        {children}
      </header>
    )
  }
)

PageHeader.displayName = 'Page.Header'

export default PageHeader
