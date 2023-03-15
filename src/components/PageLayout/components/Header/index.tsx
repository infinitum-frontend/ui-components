import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import PageLayoutContainer from '../Container'

export interface PageLayoutHeaderProps
  extends ComponentPropsWithoutRef<'header'> {
  className?: string
  sticky?: boolean
  containerWidth?: 'large' | 'medium'
}

const PageLayoutHeader = React.forwardRef<HTMLElement, PageLayoutHeaderProps>(
  ({ className, children, containerWidth, sticky, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn('inf-page-layout-header', className, {
          'inf-page-layout-header--sticky': sticky
        })}
        {...props}
      >
        <PageLayoutContainer width={containerWidth}>
          {children}
        </PageLayoutContainer>
      </header>
    )
  }
)

PageLayoutHeader.displayName = 'PageLayoutHeader'

export default PageLayoutHeader
