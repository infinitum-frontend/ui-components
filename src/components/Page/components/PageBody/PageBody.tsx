import React, { ComponentPropsWithoutRef } from 'react'
import './PageBody.scss'
import cn from 'classnames'

export interface PageBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}
const PageBody = React.forwardRef<HTMLDivElement, PageBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-page-body', className)} {...props}>
        {children}
      </div>
    )
  }
)

PageBody.displayName = 'Page.Body'

export default PageBody
