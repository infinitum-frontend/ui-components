import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import { Container, ContainerSize } from 'Components/Container'

export interface PageLayoutFooterProps
  extends ComponentPropsWithoutRef<'footer'> {
  className?: string
  containerSize?: ContainerSize
}

const PageLayoutFooter = React.forwardRef<HTMLElement, PageLayoutFooterProps>(
  ({ className, children, containerSize, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn('inf-page-layout-footer', className)}
        {...props}
      >
        <Container
          className="inf-page-layout-footer__container"
          size={containerSize}
        >
          {children}
        </Container>
      </footer>
    )
  }
)

PageLayoutFooter.displayName = 'PageLayoutFooter'

export default PageLayoutFooter
