import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import { Container } from 'Components/Container'

export interface PageLayoutBottomBarProps
  extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const PageLayoutBottomBar = React.forwardRef<
  HTMLDivElement,
  PageLayoutBottomBarProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('inf-page-layout-bottom-bar', className)}
      {...props}
    >
      <Container>{children}</Container>
    </div>
  )
})

PageLayoutBottomBar.displayName = 'PageLayoutBottomBar'

export default PageLayoutBottomBar
