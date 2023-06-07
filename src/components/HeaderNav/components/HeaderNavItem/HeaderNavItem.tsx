// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import './HeaderNavItem.scss'
import cn from 'classnames'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'

export interface HeaderNavItemProps {
  active?: boolean
}

function BaseHeaderNavItem<C extends ElementType = 'a'>(
  props: PolymorphicComponent<C, HeaderNavItemProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const { className, children, as = 'a', active = false, ...rest } = props

  const Component = as

  return (
    <Component
      ref={ref}
      className={cn('inf-header-nav-item', className, {
        'inf-header-nav-item--active': active
      })}
      {...rest}
    >
      {children}
    </Component>
  )
}

const HeaderNavItem = forwardRef(BaseHeaderNavItem)
HeaderNavItem.displayName = 'HeaderNav.Item'

export default HeaderNavItem as typeof BaseHeaderNavItem
