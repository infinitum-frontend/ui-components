// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { flexRender, Row } from '@tanstack/react-table'
import {
  TableRow as TableRowType,
  TableVerticalAlignValue
} from 'Components/Table/types'
import { mapRowToExternalFormat } from 'Components/Table/helpers'
import { Virtualizer, notUndefined } from '@tanstack/react-virtual'
import TableCell from '../TableCell'
import TableRow from '../TableRow'
import TableEmpty from '../TableEmpty'

export interface TableBodyProps {
  // тут для ряда используется внутренний тип танстака - это верно, не менять.
  rows: Array<Row<any>>
  selectedRow?: string | number | ((row: TableRowType<any>) => boolean)
  onRowClick?: (row: TableRowType<any>) => void
  verticalAlignBody?: TableVerticalAlignValue
  virtualizer?: Virtualizer<HTMLDivElement, Element>
  totalColumnsCount: number
  emptyMessage?: string
  // columns?: Array<ColumnDef<any>>
  // grouping?: boolean
}

const checkSelected = (
  row: TableRowType<any>,
  selectedRow?: string | number | ((row: TableRowType<any>) => boolean)
): boolean => {
  if (typeof selectedRow === 'function') {
    return selectedRow(row)
  } else {
    return row.id === selectedRow
  }
}

const TableBody = ({
  rows,
  selectedRow,
  onRowClick,
  verticalAlignBody,
  virtualizer,
  totalColumnsCount,
  emptyMessage
}: TableBodyProps): ReactElement => {
  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Row<any>
  ): void => {
    // клик на ряд срабатывает только в случае, если клик был на элемент внутри ячейки таблицы
    if (!(e.target as HTMLElement).closest('td')) {
      return
    }

    onRowClick?.(mapRowToExternalFormat(row))
  }

  const isRowInteractive = Boolean(onRowClick)

  if (!rows?.length) {
    return (
      <tbody>
        <TableEmpty colSpan={totalColumnsCount} message={emptyMessage} />
      </tbody>
    )
  }

  if (!virtualizer) {
    return (
      <tbody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            selected={checkSelected(mapRowToExternalFormat(row), selectedRow)}
            interactive={isRowInteractive}
            style={row.original.style}
            onClick={(e) => handleRowClick(e, row)}
            // verticalAlignBody TODO:
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    )
  }

  const virtualItems = virtualizer.getVirtualItems() || []

  const [before, after] =
    virtualItems.length > 0
      ? [
          notUndefined(virtualItems[0]).start -
            (virtualizer?.options.scrollMargin || 0),
          (virtualizer?.getTotalSize() || 0) -
            notUndefined(virtualItems[virtualItems.length - 1]).end
        ]
      : [0, 0]

  const FillerRow = ({ height }: { height: number }): ReactElement => {
    return (
      <tr>
        <td
          style={{
            height: `${height}px`,
            padding: 0,
            borderTop: 'none'
          }}
        />
      </tr>
    )
  }

  return (
    <tbody>
      {before > 0 && <FillerRow height={before} />}

      {virtualItems.map((virtualItem) => {
        const row = rows[virtualItem.index]

        return (
          // TODO: вынести дублирование TableRow в общий компонент здесь же в файле
          <TableRow
            key={row.id}
            data-index={virtualItem.index}
            ref={virtualizer?.measureElement}
            selected={checkSelected(mapRowToExternalFormat(row), selectedRow)}
            interactive={isRowInteractive}
            style={row.original.style}
            onClick={(e) => handleRowClick(e, row)}
            // verticalAlignBody={verticalAlignBody} TODO:
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        )
      })}

      {after > 0 && <FillerRow height={after} />}
    </tbody>
  )
}

export default TableBody
