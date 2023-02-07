import React, { ComponentPropsWithoutRef } from 'react'
import './BreadcrumbsItem.scss'
import cn from 'classnames'

export interface BreadcrumbsItemProps extends ComponentPropsWithoutRef<'a'> {
  className?: string
  as?: React.ElementType<any>
}

const BreadcrumbsItem = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbsItemProps
>(({ className, children, as = 'span', ...props }, ref) => {
  const Component = as

  return (
    <Component
      ref={ref}
      className={cn('inf-breadcrumbs-item', className)}
      {...props}
    >
      {children}
    </Component>
  )
})

BreadcrumbsItem.displayName = 'Breadcrumbs.Item'

export default BreadcrumbsItem
