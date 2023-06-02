// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import { BreadcrumbsItem } from './components/BreadcrumbsItem'
import './Breadcrumbs.scss'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'

// TODO: aria-current
// ol / li

function BaseBreadcrumbs<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C>,
  ref: PolymorphicRef<C>
): ReactElement {
  const { className, children, as = 'nav', ...rest } = props
  const Component = as

  return (
    <Component
      ref={ref}
      className={cn('inf-breadcrumbs', className)}
      aria-label="Breadcrumb"
      {...rest}
    >
      {children}
    </Component>
  )
}

const Breadcrumbs = forwardRef(BaseBreadcrumbs) as typeof BaseBreadcrumbs

/** Хлебные крошки — компонент навигации, который помогает пользователю понять иерархию между уровнями и вернуться на предыдщие этапы. */
export default Object.assign(Breadcrumbs, {
  Item: BreadcrumbsItem
})
