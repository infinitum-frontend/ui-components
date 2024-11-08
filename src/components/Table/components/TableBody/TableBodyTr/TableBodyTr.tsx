import cn from 'classnames'
import { flexRender, Row } from '@tanstack/react-table'
import React, { ComponentPropsWithRef, forwardRef, ReactElement } from 'react'
import { TableBodyProps } from 'Components/Table/components/TableBody/TableBody'
import { PolymorphicComponent } from '~/src/utils/types'

interface TableBodyTrProps<T extends Record<any, any>>
  extends Omit<TableBodyProps<T>, 'rows' | 'selectedRow' | 'onRowClick'> {
  row: Row<T>
  isSelected: boolean
  onRowClick: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Row<T>
  ) => void
}

function BaseTableBodyTr<T extends Record<any, any>>(
  props: PolymorphicComponent<'tr', TableBodyTrProps<T>>,
  ref: ComponentPropsWithRef<'tr'>['ref']
): ReactElement {
  const { row, onRowClick, verticalAlignBody, isSelected, ...restProps } = props
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
      {...restProps}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}

const TableBodyTr = forwardRef(BaseTableBodyTr)

/** Компонент ссылки */
export default TableBodyTr as typeof BaseTableBodyTr
