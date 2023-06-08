// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import './ListItemButton.scss'

export interface ListItemButtonProps extends ComponentPropsWithoutRef<'span'> {
  className?: string
  children?: ReactNode
}

const ListItemButton = ({
  className,
  children
}: ListItemButtonProps): ReactElement => {
  return (
    <span
      onClick={(e) => e.stopPropagation()}
      className={cn('inf-list-item-button', className)}
    >
      {children}
    </span>
  )
}

export default ListItemButton
