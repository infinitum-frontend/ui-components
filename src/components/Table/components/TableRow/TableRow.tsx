import { ComponentPropsWithoutRef, forwardRef } from 'react'
import cn from 'classnames'
import './TableRow.scss'

export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  selected?: boolean
  interactive?: boolean
  hoverable?: boolean
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    { className, selected, interactive, hoverable = true, children, ...props },
    ref
  ) => {
    return (
      <tr
        ref={ref}
        className={cn('inf-table-row', className, {
          'inf-table-row--selected': selected,
          'inf-table-row--interactive': interactive,
          'inf-table-row--hoverable': hoverable
        })}
        {...props}
      >
        {children}
      </tr>
    )
  }
)

TableRow.displayName = 'TableRow'

export default TableRow
