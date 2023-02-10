import { ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import '../style/menu-item-icon.scss'

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
