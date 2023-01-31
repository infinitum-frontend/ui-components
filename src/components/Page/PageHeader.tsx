// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'

export interface PageHeaderProps extends ComponentPropsWithoutRef<'header'> {
  className?: string
  role?: string
}

const PageHeader = ({
  className,
  role = 'heading',
  children
}: PageHeaderProps): ReactElement => {
  return (
    <header role={role} className={cn('inf-page-header', className)}>
      {children}
    </header>
  )
}

PageHeader.displayName = 'PageHeader'

export default PageHeader
