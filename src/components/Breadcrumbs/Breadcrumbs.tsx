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
import useSplittedBreadcrumbs from './hooks/useSplittedBreadcrumbs'
import { DropdownMenu } from 'Components/DropdownMenu'
import { BreadcrumbsSeparator } from 'Components/Breadcrumbs/components/BreadcrumbsSeparator'
import { BreadcrumbsShowMoreButton } from 'Components/Breadcrumbs/components/BreadcrumbsShowMoreButton'

// TODO: aria-current IDD-302
// ol / li

export type IBreadcrumbsItem<
  C extends ElementType,
  Props = {},
  HtmlElement extends keyof JSX.IntrinsicElements = any
> = {
  title: string
} & C extends keyof JSX.IntrinsicElements
  ? PolymorphicComponent<C>
  : PolymorphicComponent<C, Props> & JSX.IntrinsicElements[HtmlElement]

export interface BreadcrumbsProps<C extends ElementType> {
  maxVisibleCount?: number
  items?: Array<IBreadcrumbsItem<C>>
}

const BreadcrumbsItemsMapper = ({
  items
}: {
  items: Array<IBreadcrumbsItem<any>>
}): ReactElement => {
  return (
    <>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <Fragment key={index}>
            <BreadcrumbsItem {...item} key={item.title}>
              {item.title}
            </BreadcrumbsItem>
            {!isLast && <BreadcrumbsSeparator />}
          </Fragment>
        )
      })}
    </>
  )
}

function BaseBreadcrumbs<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, BreadcrumbsProps<C>>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    className,
    children,
    as = 'nav',
    maxVisibleCount = 0,
    items = [],
    ...rest
  } = props

  const Component = as

  if (!items.length) {
    const arrayChildren = Children.toArray(children)

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
              {!isLast && <BreadcrumbsSeparator />}
            </Fragment>
          )
        })}
      </Component>
    )
  }

  const { hasHiddenItems, hiddenItems, lastItems, firstItem } =
    useSplittedBreadcrumbs(items, maxVisibleCount)

  return (
    <Component
      ref={ref}
      className={cn('inf-breadcrumbs', className)}
      aria-label="Breadcrumb"
      {...rest}
    >
      {hasHiddenItems ? (
        <Fragment>
          <BreadcrumbsItem {...firstItem}>{firstItem.title}</BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <BreadcrumbsShowMoreButton />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              {hiddenItems.map((item) => {
                const Component = item.as || 'div'
                return (
                  // TODO: asChild мержит и стили DropdownItem, и Link. Плюс Link занимает не всю ширину. Как такое обрабатывать?
                  <DropdownMenu.Item key={item.title} asChild>
                    {/* Мержатся стили, возможно будут проблемы с визуалом(например, focus-visible у Link.
                     Можно будет решить через кастомный className на конечном проекте */}
                    <Component {...item}>{item.title}</Component>
                  </DropdownMenu.Item>
                )
              })}
            </DropdownMenu.Content>
          </DropdownMenu>
          <BreadcrumbsSeparator />
          <BreadcrumbsItemsMapper items={lastItems} />
        </Fragment>
      ) : (
        <BreadcrumbsItemsMapper items={items} />
      )}
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
