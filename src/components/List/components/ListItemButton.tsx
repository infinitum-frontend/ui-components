import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import '../style/list-item-button.scss'

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
