import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import { Container, ContainerSize } from 'Components/Container'

export interface PageLayoutBodyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  containerSize?: ContainerSize
}

const PageLayoutBody = React.forwardRef<HTMLDivElement, PageLayoutBodyProps>(
  ({ className, children, containerSize, ...props }, ref) => {
    return (
      <Container
        ref={ref}
        className={cn('inf-page-layout-body', className)}
        size={containerSize}
        {...props}
      >
        <div className="inf-page-layout-body__box">{children}</div>
      </Container>
    )
  }
)

PageLayoutBody.displayName = 'PageLayoutBody'

export default PageLayoutBody
