// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import cn from 'classnames'
import PageBody from './components/PageBody'
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import './Page.scss'

export interface PageProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  role?: string
}

const Page = forwardRef<HTMLDivElement, PageProps>(
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
  Body: PageBody,
  Footer: PageFooter
})
