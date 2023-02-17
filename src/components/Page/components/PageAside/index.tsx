import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'

export interface PageAsideProps extends ComponentPropsWithoutRef<'aside'> {
  className?: string
}
const PageAside = React.forwardRef<HTMLElement, PageAsideProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <aside ref={ref} className={cn('inf-page-aside', className)} {...props}>
        {children}
      </aside>
    )
  }
)

PageAside.displayName = 'Page.Aside'

export default PageAside
