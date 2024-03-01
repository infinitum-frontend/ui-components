// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import './MenuItemContent.scss'
import cn from 'classnames'

export interface MenuItemContentProps extends ComponentPropsWithoutRef<'div'> {
  /** Занимает всю доступную ширину
   * @default true
   */
  stretched?: boolean
  children?: ReactNode
}

const MenuItemContent = ({
  stretched = true,
  children,
  ...props
}: MenuItemContentProps): ReactElement => {
  return (
    <div
      className={cn('inf-menu-item-content', {
        'inf-menu-item-content--unstretched': !stretched
      })}
      {...props}
    />
  )
}

export default MenuItemContent
