import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'

export interface PageBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

// const PageBody = ({ className, children }: PageBodyProps): ReactElement => {
//   return (
//     <section className={cn('inf-page-body', className)}>{children}</section>
//   )
// }

const PageBody = React.forwardRef<HTMLDivElement, PageBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-page-body', className)} {...props}>
        {children}
      </div>
    )
  }
)

PageBody.displayName = 'PageBody'

export default PageBody
