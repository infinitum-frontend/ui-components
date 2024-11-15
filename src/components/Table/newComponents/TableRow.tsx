import { ComponentPropsWithoutRef, ReactElement } from 'react'
import cn from 'classnames'

export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  selected?: boolean
}

const TableRow = ({ children, selected }: TableRowProps): ReactElement => {
  return (
    <tr
      className={cn('inf-new-table-row', {
        'inf-new-table-row--selected': selected
      })}
    >
      {children}
    </tr>
  )
}

export default TableRow
