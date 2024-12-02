// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import './MenuLabel.scss'

export interface MenuLabelProps {
  className?: string
  children?: ReactNode
}

const MenuLabel = ({
  className,
  children,
  ...props
}: MenuLabelProps): ReactElement => {
  return (
    <div className={cn('inf-menu-label', className)} {...props}>
      {children}
    </div>
  )
}

export default MenuLabel
