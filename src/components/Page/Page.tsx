import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import PageBody from './components/PageBody'
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import PageAside from './components/PageAside'
import './Page.scss'

export interface PageProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-page', className)} {...props}>
        {children}
      </div>
    )
  }
)

Page.displayName = 'Page'

export default Object.assign(Page, {
  Header: PageHeader,
  Aside: PageAside,
  Body: PageBody,
  Footer: PageFooter
})
