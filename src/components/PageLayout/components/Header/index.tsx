import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import { Container, ContainerSize } from 'Components/Container'

export interface PageLayoutHeaderProps
  extends ComponentPropsWithoutRef<'header'> {
  className?: string
  sticky?: boolean
  containerSize?: ContainerSize
}

const PageLayoutHeader = React.forwardRef<HTMLElement, PageLayoutHeaderProps>(
  ({ className, children, sticky, containerSize, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn('inf-page-layout-header', className, {
          'inf-page-layout-header--sticky': sticky
        })}
        {...props}
      >
        <Container
          className="inf-page-layout-header__container"
          size={containerSize}
        >
          {children}
        </Container>
      </header>
    )
  }
)

PageLayoutHeader.displayName = 'PageLayoutHeader'

export default PageLayoutHeader
