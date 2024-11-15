import { ComponentPropsWithoutRef, ReactElement } from 'react'

export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {}

const TableCell = ({
  children,
  ...restProps
}: TableCellProps): ReactElement => {
  return (
    <td className="inf-new-table-cell" {...restProps}>
      {children}
    </td>
  )
}

export default TableCell
