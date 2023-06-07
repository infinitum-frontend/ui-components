// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import './BreadcrumbsItem.scss'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'

function BaseBreadcrumbsItem<C extends ElementType = 'span'>(
  props: PolymorphicComponent<C>,
  ref: PolymorphicRef<C>
): ReactElement {
  const { className, children, as = 'span', ...rest } = props

  const Component = as

  return (
    <Component
      ref={ref}
      className={cn('inf-breadcrumbs-item', className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

const BreadcrumbsItem = forwardRef(BaseBreadcrumbsItem)
BreadcrumbsItem.displayName = 'Breadcrumbs.Item'

export default BreadcrumbsItem as typeof BaseBreadcrumbsItem
