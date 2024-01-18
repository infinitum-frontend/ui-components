import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import { Container } from 'Components/Container'

export interface PageLayoutBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  /**
   * @deprecated
   */
  containerWidth?: 'large' | 'medium'
}

const PageLayoutBody = React.forwardRef<HTMLDivElement, PageLayoutBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Container
        ref={ref}
        className={cn('inf-page-layout-body', className)}
        {...props}
      >
        <div className="inf-page-layout-body__box">{children}</div>
      </Container>
    )
  }
)

PageLayoutBody.displayName = 'PageLayoutBody'

export default PageLayoutBody
