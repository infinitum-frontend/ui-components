import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import PageLayoutContainer from '../Container'

export interface PageLayoutBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  containerWidth?: 'small' | 'large' | 'medium'
}

const PageLayoutBody = React.forwardRef<HTMLDivElement, PageLayoutBodyProps>(
  ({ className, children, containerWidth, ...props }, ref) => {
    return (
      <PageLayoutContainer
        ref={ref}
        className={cn('inf-page-layout-body', className)}
        width={containerWidth}
        {...props}
      >
        <div className="inf-page-layout-body__box">{children}</div>
      </PageLayoutContainer>
    )
  }
)

PageLayoutBody.displayName = 'PageLayoutBody'

export default PageLayoutBody
