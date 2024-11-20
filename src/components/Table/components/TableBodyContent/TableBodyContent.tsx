// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { flexRender, Row } from '@tanstack/react-table'
import {
  TableRow as TableRowType,
  TableVerticalAlignValue
} from 'Components/Table/types'
import {
  mapRowToExternalFormat,
  checkIsRowSelected
} from 'Components/Table/helpers'
import { Virtualizer, notUndefined } from '@tanstack/react-virtual'
import TableRow from '../TableRow'
import TableEmpty from '../TableEmpty'
import TableCell from '../TableCell'

export interface TableBodyContentProps {
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

const TableBodyContent = ({
  rows,
  selectedRow,
  onRowClick,
  verticalAlignBody,
  virtualizer,
  totalColumnsCount,
  emptyMessage
}: TableBodyContentProps): ReactElement => {
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
    return <TableEmpty colSpan={totalColumnsCount} message={emptyMessage} />
  }

  if (!virtualizer) {
    return (
      <>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            selected={checkIsRowSelected(
              mapRowToExternalFormat(row),
              selectedRow
            )}
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
      </>
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

  return (
    <>
      {before > 0 && <FillerRow height={before} />}

      {virtualItems.map((virtualItem) => {
        const row = rows[virtualItem.index]

        return (
          <TableRow
            key={row.id}
            data-index={virtualItem.index}
            ref={virtualizer?.measureElement}
            selected={checkIsRowSelected(
              mapRowToExternalFormat(row),
              selectedRow
            )}
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
        )
      })}

      {after > 0 && <FillerRow height={after} />}
    </>
  )
}

export default TableBodyContent
