import React, { ComponentPropsWithoutRef } from 'react'
import { Container } from 'Components/Container'
import './index.scss'
import cn from 'classnames'

export interface PageLayoutContainerProps
  extends ComponentPropsWithoutRef<'div'> {
  className?: string
  /**
   * @deprecated
   */
  width?: 'large' | 'medium'
}

const PageLayoutContainer = React.forwardRef<
  HTMLDivElement,
  PageLayoutContainerProps
>(({ className, children, width, ...props }, ref) => {
  return (
    <Container
      ref={ref}
      className={cn('inf-page-layout-container', className)}
      size="xlarge"
      {...props}
    >
      {children}
    </Container>
  )
})

PageLayoutContainer.displayName = 'PageLayoutContainer'

export default PageLayoutContainer
