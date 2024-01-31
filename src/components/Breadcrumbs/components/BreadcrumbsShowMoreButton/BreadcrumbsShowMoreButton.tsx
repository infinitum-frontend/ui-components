import { ComponentPropsWithoutRef, forwardRef } from 'react'
import cn from 'classnames'
import './BreadcrumbsShowMoreButton.scss'

const BreadcrumbsShowMoreButton = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn('inf-breadcrumbs-show-more-button', className)}
      ref={ref}
      {...props}
    >
      ...
    </div>
  )
})

BreadcrumbsShowMoreButton.displayName = 'BreadcrumbsShowMoreButton'

export default BreadcrumbsShowMoreButton
