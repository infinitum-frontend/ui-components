// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'

export interface PageFooterProps extends ComponentPropsWithoutRef<'footer'> {
  className?: string
  role?: string
}

const PageFooter = ({
  className,
  role = 'toolbar',
  children
}: PageFooterProps): ReactElement => {
  return (
    <footer role={role} className={cn('inf-page-footer', className)}>
      {children}
    </footer>
  )
}

export default PageFooter
