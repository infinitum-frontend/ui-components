import { ComponentPropsWithoutRef, forwardRef } from 'react'
import cn from 'classnames'
import './BreadcrumbsShowMoreButton.scss'

const BreadcrumbsShowMoreButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn('inf-breadcrumbs-show-more-button', className)}
      ref={ref}
      {...props}
    >
      ...
    </button>
  )
})

BreadcrumbsShowMoreButton.displayName = 'BreadcrumbsShowMoreButton'

export default BreadcrumbsShowMoreButton
