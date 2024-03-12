import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import { Container } from 'Components/Container'

export interface PageLayoutFooterProps
  extends ComponentPropsWithoutRef<'footer'> {
  className?: string
}

const PageLayoutFooter = React.forwardRef<HTMLElement, PageLayoutFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn('inf-page-layout-footer', className)}
        {...props}
      >
        <Container className="inf-page-layout-footer__container">
          {children}
        </Container>
      </footer>
    )
  }
)

PageLayoutFooter.displayName = 'PageLayoutFooter'

export default PageLayoutFooter
