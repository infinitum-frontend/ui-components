// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { Row } from '@tanstack/react-table'
import { TableRow, TableVerticalAlignValue } from 'Components/Table/types'
import { mapRowToExternalFormat } from 'Components/Table/helpers'
import { Virtualizer, notUndefined } from '@tanstack/react-virtual'
import TableBodyTr from 'Components/Table/components/TableBody/TableBodyTr'

export interface TableBodyProps<T extends Record<any, any>> {
  // тут для ряда используется внутренний тип танстака - это верно, не менять.
  rows: Array<Row<T>>
  selectedRow?: string | number | ((row: TableRow<T>) => boolean)
  onRowClick?: (row: TableRow<T>) => void
  verticalAlignBody?: TableVerticalAlignValue
  virtualizer?: Virtualizer<HTMLDivElement, Element>
  // columns?: Array<ColumnDef<any>>
  // grouping?: boolean
}

const checkSelected = (
  row: TableRow<any>,
  selectedRow?: string | number | ((row: TableRow<any>) => boolean)
): boolean => {
  if (typeof selectedRow === 'function') {
    return selectedRow(row)
  } else {
    return row.id === selectedRow
  }
}

const TableBody = <T extends Record<any, any>>({
  rows,
  selectedRow,
  onRowClick,
  verticalAlignBody,
  virtualizer
}: TableBodyProps<T>): ReactElement => {
  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Row<T>
  ): void => {
    // клик на ряд срабатывает только в случае, если клик был на элемент внутри ячейки таблицы
    if (!(e.target as HTMLElement).closest('td')) {
      return
    }

    onRowClick?.(mapRowToExternalFormat(row))
  }

  if (!virtualizer) {
    return (
      <tbody>
        {rows.map((row) => (
          <TableBodyTr<T>
            key={row.id}
            row={row}
            onRowClick={handleRowClick}
            isSelected={checkSelected(mapRowToExternalFormat(row), selectedRow)}
            verticalAlignBody={verticalAlignBody}
          />
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
          <TableBodyTr
            key={row.id}
            row={row}
            data-index={virtualItem.index}
            ref={virtualizer?.measureElement}
            onRowClick={handleRowClick}
            isSelected={checkSelected(mapRowToExternalFormat(row), selectedRow)}
            verticalAlignBody={verticalAlignBody}
          />
        )
      })}

      {after > 0 && <FillerRow height={after} />}
    </tbody>
  )
}

export default TableBody
