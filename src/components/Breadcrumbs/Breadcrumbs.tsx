import React, { ComponentPropsWithoutRef } from 'react'
import { BreadcrumbsItem } from './components/BreadcrumbsItem'
import './Breadcrumbs.scss'
import cn from 'classnames'

// TODO: aria-current
// ol / li

export interface BreadcrumbsProps extends ComponentPropsWithoutRef<'nav'> {
  className?: string
  as?: React.ElementType<any>
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, children, as = 'nav', ...props }, ref) => {
    const Component = as

    return (
      <Component
        ref={ref}
        className={cn('inf-breadcrumbs', className)}
        aria-label="Breadcrumb"
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Breadcrumbs.displayName = 'Breadcrumbs'

export default Object.assign(Breadcrumbs, {
  Item: BreadcrumbsItem
})
