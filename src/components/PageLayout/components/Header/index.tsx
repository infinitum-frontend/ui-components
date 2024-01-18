import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import { Container } from 'Components/Container'

export interface PageLayoutHeaderProps
  extends ComponentPropsWithoutRef<'header'> {
  className?: string
  sticky?: boolean
  /**
   * @deprecated
   */
  containerWidth?: 'large' | 'medium'
}

const PageLayoutHeader = React.forwardRef<HTMLElement, PageLayoutHeaderProps>(
  ({ className, children, sticky, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn('inf-page-layout-header', className, {
          'inf-page-layout-header--sticky': sticky
        })}
        {...props}
      >
        <Container className="inf-page-layout-header__container">
          {children}
        </Container>
      </header>
    )
  }
)

PageLayoutHeader.displayName = 'PageLayoutHeader'

export default PageLayoutHeader
