import React, { ComponentPropsWithoutRef } from 'react'
import './index.scss'
import cn from 'classnames'

export interface PageLayoutContainerProps
  extends ComponentPropsWithoutRef<'div'> {
  className?: string
  width?: 'small' | 'large' | 'medium'
}

const PageLayoutContainer = React.forwardRef<
  HTMLDivElement,
  PageLayoutContainerProps
>(({ className, children, width, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('inf-page-layout-container', className, {
        [`inf-page-layout-container--size-${width as string}`]: width
      })}
      {...props}
    >
      {children}
    </div>
  )
})

PageLayoutContainer.displayName = 'PageLayoutContainer'

export default PageLayoutContainer
