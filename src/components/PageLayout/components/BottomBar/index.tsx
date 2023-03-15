import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'
import PageLayoutContainer from '../Container'

export interface PageLayoutBottomBarProps
  extends ComponentPropsWithoutRef<'div'> {
  className?: string
  containerWidth?: 'medium' | 'large'
}

const PageLayoutBottomBar = React.forwardRef<
  HTMLDivElement,
  PageLayoutBottomBarProps
>(({ className, children, containerWidth, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('inf-page-layout-bottom-bar', className)}
      {...props}
    >
      <PageLayoutContainer width={containerWidth}>
        {children}
      </PageLayoutContainer>
    </div>
  )
})

PageLayoutBottomBar.displayName = 'PageLayoutBottomBar'

export default PageLayoutBottomBar
