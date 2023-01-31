// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'

export interface PageBodyProps extends ComponentPropsWithoutRef<'section'> {
  className?: string
}

const PageBody = ({ className, children }: PageBodyProps): ReactElement => {
  return (
    <section role="article" className={cn('inf-page-body', className)}>
      {children}
    </section>
  )
}

PageBody.displayName = 'PageBody'

export default PageBody
