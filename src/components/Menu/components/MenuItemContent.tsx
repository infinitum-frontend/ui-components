import { ReactElement, ReactNode } from 'react'
import '../style/menu-item-content.scss'
import cn from 'classnames'

export interface MenuItemContentProps {
  /** Занимает всю доступную ширину
   * @default true
   */
  stretched?: boolean
  children?: ReactNode
}

const MenuItemContent = ({
  stretched = true,
  children
}: MenuItemContentProps): ReactElement => {
  return (
    <div
      className={cn('inf-menu-item-content', {
        'inf-menu-item-content--unstretched': !stretched
      })}
    >
      {children}
    </div>
  )
}

export default MenuItemContent
