import cn from 'classnames'
import { flexRender, Row } from '@tanstack/react-table'
import React, { forwardRef } from 'react'
import { TableBodyProps } from 'Components/Table/components/TableBody/TableBody'

interface TableBodyTrProps
  extends Omit<TableBodyProps, 'rows' | 'selectedRow' | 'onRowClick'> {
  row: Row<any>
  isSelected: boolean
  onRowClick: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Row<any>
  ) => void
}

const TableBodyTr = forwardRef<HTMLTableRowElement, TableBodyTrProps>(
  ({ row, onRowClick, verticalAlignBody, isSelected, ...props }, ref) => {
    return (
      <tr
        key={row.id}
        ref={ref}
        className={cn(row.original.className, {
          [`inf-table--vertical-align-${verticalAlignBody as string}`]:
            verticalAlignBody,
          'inf-table__row--selected': isSelected,
          'inf-table__row--interactive': Boolean(onRowClick)
        })}
        style={row.original.style}
        onClick={(e) => onRowClick(e, row)}
        {...props}
      >
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    )
  }
)

TableBodyTr.displayName = 'TableBodyTr'

export default TableBodyTr
