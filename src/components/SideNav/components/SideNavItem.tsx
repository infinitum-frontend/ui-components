// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import './SideNavItem.scss'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'

export interface SideNavItemProps {
  active?: boolean
}

function BaseSideNavItem<C extends ElementType = 'a'>(
  props: PolymorphicComponent<C, SideNavItemProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const { className, children, as = 'a', active = false, ...rest } = props
  const Component = as
  return (
    <Component
      ref={ref}
      className={cn('inf-side-nav-item', className, {
        'inf-side-nav-item--active': active
      })}
      {...rest}
    >
      {children}
    </Component>
  )
}

export const SideNavItem = forwardRef(BaseSideNavItem) as typeof BaseSideNavItem

// @ts-expect-error
SideNavItem.displayName = 'SideNav.Item'
