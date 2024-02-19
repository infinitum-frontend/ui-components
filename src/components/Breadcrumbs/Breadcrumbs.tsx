// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ElementType,
  forwardRef,
  ReactElement,
  Children,
  Fragment
} from 'react'
import { BreadcrumbsItem } from './components/BreadcrumbsItem'
import './Breadcrumbs.scss'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import { ReactComponent as ChevronRightIcon } from 'Icons/chevronRight.svg'

// TODO: aria-current IDD-302
// ol / li

function BaseBreadcrumbs<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C>,
  ref: PolymorphicRef<C>
): ReactElement {
  const { className, children, as = 'nav', ...rest } = props
  const arrayChildren = Children.toArray(children)
  const Component = as

  return (
    <Component
      ref={ref}
      className={cn('inf-breadcrumbs', className)}
      aria-label="Breadcrumb"
      {...rest}
    >
      {Children.map(arrayChildren, (child, index) => {
        const isLast = index === arrayChildren.length - 1
        return (
          <Fragment key={index}>
            {child}
            {!isLast && (
              <ChevronRightIcon className="inf-breadcrumbs__separator" />
            )}
          </Fragment>
        )
      })}
    </Component>
  )
}

/** Хлебные крошки — компонент навигации, который помогает пользователю понять иерархию между уровнями и вернуться на предыдщие этапы. */
const Breadcrumbs = Object.assign(
  forwardRef(BaseBreadcrumbs) as typeof BaseBreadcrumbs,
  {
    Item: BreadcrumbsItem
  }
)

export default Breadcrumbs
