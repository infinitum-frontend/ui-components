// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './index.scss'

export interface PageHeaderProps extends ComponentPropsWithoutRef<'header'> {
  className?: string
}

const PageHeader = ({ className, children }: PageHeaderProps): ReactElement => {
  return (
    <header className={cn('inf-page-header', className)}>{children}</header>
  )
}

PageHeader.displayName = 'PageHeader'

export default PageHeader
