import { ComponentPropsWithoutRef, forwardRef } from 'react'
import cn from 'classnames'
import './TableRow.scss'

export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  selected?: boolean
  interactive?: boolean
  hoverable?: boolean
  withGroupLabel?: boolean
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      className,
      selected,
      interactive,
      hoverable = true,
      children,
      withGroupLabel,
      ...props
    },
    ref
  ) => {
    return (
      <tr
        ref={ref}
        className={cn('inf-table-row', className, {
          'inf-table-row--selected': selected,
          'inf-table-row--interactive': interactive,
          'inf-table-row--hoverable': hoverable,
          'inf-table-row--with-group-label': withGroupLabel
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
