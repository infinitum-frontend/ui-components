import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import '../style/menu-item-button.scss'

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