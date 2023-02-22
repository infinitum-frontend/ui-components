// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import '../style/list-item-icon.scss'

export interface ListItemIconProps {
  className?: string
  children?: ReactNode
}

const ListItemIcon = ({
  className,
  children
}: ListItemIconProps): ReactElement => {
  return <span className={cn('inf-list-item-icon', className)}>{children}</span>
}

export default ListItemIcon
