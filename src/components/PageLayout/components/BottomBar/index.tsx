import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import { Container } from 'Components/Container'
import { ContainerSize } from '~/src/components/Container'

export interface PageLayoutBottomBarProps
  extends ComponentPropsWithoutRef<'div'> {
  className?: string
  containerSize?: ContainerSize
}

const PageLayoutBottomBar = React.forwardRef<
  HTMLDivElement,
  PageLayoutBottomBarProps
>(({ className, children, containerSize, ...props }, ref) => {
  return (
    <footer
      ref={ref}
      className={cn('inf-page-layout-bottom-bar', className)}
      {...props}
    >
      <Container
        className="inf-page-layout-bottom-bar__container"
        size={containerSize}
      >
        {children}
      </Container>
    </footer>
  )
})

PageLayoutBottomBar.displayName = 'PageLayoutBottomBar'

export default PageLayoutBottomBar
