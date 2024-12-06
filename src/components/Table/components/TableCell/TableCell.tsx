import { ComponentPropsWithoutRef, ReactElement } from 'react'
import './TableCell.scss'

export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {}

const TableCell = ({
  children,
  ...restProps
}: TableCellProps): ReactElement => {
  return (
    <td className="inf-table-cell" {...restProps}>
      {children}
    </td>
  )
}

export default TableCell
