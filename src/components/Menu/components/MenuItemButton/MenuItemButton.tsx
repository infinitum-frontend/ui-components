// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import './MenuItemButton.scss'

export interface MenuItemButtonProps extends ComponentPropsWithoutRef<'span'> {
  className?: string
  children?: ReactNode
}

const MenuItemButton = ({
  className,
  children
}: MenuItemButtonProps): ReactElement => {
  return (
    <span
      onClick={(e) => e.stopPropagation()}
      className={cn('inf-menu-item-button', className)}
    >
      {children}
    </span>
  )
}

export default MenuItemButton
