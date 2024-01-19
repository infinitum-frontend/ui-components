import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'

export interface PageLayoutContentProps
  extends ComponentPropsWithoutRef<'main'> {
  className?: string
  centerContent?: boolean
}

const PageLayoutContent = React.forwardRef<HTMLElement, PageLayoutContentProps>(
  ({ className, children, centerContent, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn('inf-page-layout-content', className, {
          'inf-page-layout-content--center-content': centerContent
        })}
        {...props}
      >
        {children}
      </main>
    )
  }
)

PageLayoutContent.displayName = 'PageLayoutContent'

export default PageLayoutContent
