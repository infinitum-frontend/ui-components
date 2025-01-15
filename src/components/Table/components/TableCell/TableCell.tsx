import { ComponentPropsWithoutRef, ReactElement } from 'react'
import cn from 'classnames'
import './TableCell.scss'

export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {
  visibleOnHover?: boolean
}

const TableCell = ({
  children,
  visibleOnHover,
  ...restProps
}: TableCellProps): ReactElement => {
  return (
    <td
      className={cn('inf-table-cell', {
        'inf-table-cell--visible-on-hover': visibleOnHover
      })}
      {...restProps}
    >
      {children}
    </td>
  )
}

export default TableCell
