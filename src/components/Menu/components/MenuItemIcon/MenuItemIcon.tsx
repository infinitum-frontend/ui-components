// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import './MenuItemIcon.scss'

export interface MenuItemIconProps {
  className?: string
  children?: ReactNode
}

const MenuItemIcon = ({
  className,
  children
}: MenuItemIconProps): ReactElement => {
  return <span className={cn('inf-menu-item-icon', className)}>{children}</span>
}

export default MenuItemIcon
