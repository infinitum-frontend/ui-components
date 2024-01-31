// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ElementType,
  forwardRef,
  ReactElement,
  Children,
  Fragment,
  ReactNode
} from 'react'
import { BreadcrumbsItem } from './components/BreadcrumbsItem'
import './Breadcrumbs.scss'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import { BreadcrumbsShowMoreButton } from './components/BreadcrumbsShowMoreButton'
import { BreadcrumbsSeparator } from './components/BreadcrumbsSeparator'

// TODO: aria-current
// ol / li

// проверяем, есть ли среди детей на 1 уровне или на 2(если контент передается через Fragment) компонент BreadcrumbsSeparator
// если сепаратора нет, добавляем его внутри компонента
function checkSeparator(children: ReactNode[]): boolean {
  if (children.length === 1) {
    return !(children[0] as ReactElement).props?.children?.find(
      (child: any) => child?.type?.name === 'BreadcrumbsSeparator'
    )
  } else {
    return !children.find(
      (child: any) => child?.type?.name === 'BreadcrumbsSeparator'
    )
  }
}

function BaseBreadcrumbs<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C>,
  ref: PolymorphicRef<C>
): ReactElement {
  const { className, children, as = 'nav', ...rest } = props
  const arrayChildren = Children.toArray(children)
  const shouldAddSeparators = checkSeparator(arrayChildren)

  const Component = as

  return (
    <Component
      ref={ref}
      className={cn('inf-breadcrumbs', className)}
      aria-label="Breadcrumb"
      {...rest}
    >
      {/* TODO: отрисовку через Children считаю deprecated, лучше использовать компонент Separator, который можно дальше расширить */}
      {shouldAddSeparators
        ? Children.map(arrayChildren, (child, index) => {
            const isLast = index === arrayChildren.length - 1
            return (
              <Fragment key={index}>
                {child}
                {!isLast && <BreadcrumbsSeparator />}
              </Fragment>
            )
          })
        : children}
    </Component>
  )
}

/** Хлебные крошки — компонент навигации, который помогает пользователю понять иерархию между уровнями и вернуться на предыдщие этапы. */
const Breadcrumbs = Object.assign(
  forwardRef(BaseBreadcrumbs) as typeof BaseBreadcrumbs,
  {
    Item: BreadcrumbsItem,
    Separator: BreadcrumbsSeparator,
    ShowMoreButton: BreadcrumbsShowMoreButton
  }
)

export default Breadcrumbs
