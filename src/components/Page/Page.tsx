// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import cn from 'classnames'
import PageBody from './PageBody'
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
import './Page.scss'

export interface PageProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  role?: string
}

const Page = ({
  className,
  role = 'document',
  children,
  ...props
}: PageProps): ReactElement => {
  return (
    <div {...props} role={role} className={cn('inf-page', className)}>
      {children}
    </div>
  )
}

Page.displayName = 'Page'

export default Object.assign(Page, {
  Header: PageHeader,
  Body: PageBody,
  Footer: PageFooter
})
