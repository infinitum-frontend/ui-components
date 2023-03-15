import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'

export interface PageLayoutContentProps
  extends ComponentPropsWithoutRef<'main'> {
  className?: string
}

const PageLayoutContent = React.forwardRef<HTMLElement, PageLayoutContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn('inf-page-layout-content', className)}
        {...props}
      >
        {children}
      </main>
    )
  }
)

PageLayoutContent.displayName = 'PageLayoutContent'

export default PageLayoutContent
