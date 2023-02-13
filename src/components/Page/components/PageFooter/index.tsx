import React, { ComponentPropsWithoutRef } from 'react'
import { Container } from 'Components/Container'
import cn from 'classnames'
import './index.scss'

export interface PageFooterProps extends ComponentPropsWithoutRef<'footer'> {
  className?: string
}

const PageFooter = React.forwardRef<HTMLElement, PageFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer ref={ref} className={cn('inf-page-footer', className)} {...props}>
        <Container className="inf-page-footer__container">{children}</Container>
      </footer>
    )
  }
)

PageFooter.displayName = 'Page.Footer'

export default PageFooter
