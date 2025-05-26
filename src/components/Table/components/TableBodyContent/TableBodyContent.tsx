// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { flexRender, Row } from '@tanstack/react-table'
import { TableRow as TableRowType } from 'Components/Table/types'
import {
  mapRowToExternalFormat,
  checkIsRowSelected
} from 'Components/Table/helpers'
import { Virtualizer, notUndefined } from '@tanstack/react-virtual'
import TableRow from '../TableRow'
import TableEmpty from '../TableEmpty'
import TableCell from '../TableCell'
import useCheckSelection from '~/src/hooks/useCheckElementHasSelection'

export interface TableBodyContentProps<TRowData extends Record<string, any>> {
  // тут для ряда используется внутренний тип танстака - это верно, не менять.
  rows: Array<Row<TRowData>>
  selectedRow?: string | number | ((row: TableRowType<TRowData>) => boolean)
  onRowClick?: (row: TableRowType<TRowData>) => void
  virtualizer?: Virtualizer<HTMLDivElement, Element>
  totalColumnsCount: number
  emptyMessage?: string
  withGroupLabel?: boolean
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

// TODO: вынести логику этого компонента в HOC,
// убрать дублирование прохождения по циклу и рендеринга TableRow и TableCell
const TableBodyContent = <TRowData extends Record<string, any>>({
  rows,
  selectedRow,
  onRowClick,
  virtualizer,
  totalColumnsCount,
  emptyMessage,
  withGroupLabel
}: TableBodyContentProps<TRowData>): ReactElement => {
  const checkSelection = useCheckSelection()
  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Row<any>
  ): void => {
    // клик на ряд срабатывает только в случае, если клик был на элемент внутри ячейки таблицы и НЕ было селекции(копирования строки)
    if (!(e.target as HTMLElement).closest('td') || checkSelection('td')) {
      return
    }

    onRowClick?.(mapRowToExternalFormat(row))
  }

  const isRowInteractive = Boolean(onRowClick)

  if (!rows?.length) {
    return <TableEmpty colSpan={totalColumnsCount} message={emptyMessage} />
  }

  const checkIsRowGroupLabel = (row: Row<any>): boolean => {
    return Boolean(withGroupLabel && row.getCanExpand())
  }

  if (!virtualizer) {
    return (
      <>
        {rows.map((row) => {
          const isGroupLabel = checkIsRowGroupLabel(row)
          return (
            <TableRow
              withGroupLabel={isGroupLabel}
              key={row.id}
              selected={checkIsRowSelected(
                mapRowToExternalFormat(row),
                selectedRow
              )}
              interactive={isRowInteractive}
              style={row.original.style}
              onClick={(e) => handleRowClick(e, row)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  visibleOnHover={cell.column.columnDef.meta?.visibleOnRowHover}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          )
        })}
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
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                visibleOnHover={cell.column.columnDef.meta?.visibleOnRowHover}
              >
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
