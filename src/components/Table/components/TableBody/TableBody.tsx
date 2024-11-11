// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { Row } from '@tanstack/react-table'
import { TableRow, TableVerticalAlignValue } from 'Components/Table/types'
import { mapRowToExternalFormat } from 'Components/Table/helpers'
import { Virtualizer, notUndefined } from '@tanstack/react-virtual'
import TableBodyTr from 'Components/Table/components/TableBody/TableBodyTr'

export interface TableBodyProps {
  // тут для ряда используется внутренний тип танстака - это верно, не менять.
  rows: Array<Row<any>>
  selectedRow?: string | number | ((row: TableRow<any>) => boolean)
  onRowClick?: (row: TableRow<any>) => void
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

const TableBody = ({
  rows,
  selectedRow,
  onRowClick,
  verticalAlignBody,
  virtualizer
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

  if (!virtualizer) {
    return (
      <tbody>
        {rows.map((row) => (
          <TableBodyTr
            key={row.id}
            row={row}
            onRowClick={handleRowClick}
            isSelected={checkSelected(mapRowToExternalFormat(row), selectedRow)}
            isInteractive={Boolean(onRowClick)}
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
            isInteractive={Boolean(onRowClick)}
            verticalAlignBody={verticalAlignBody}
          />
        )
      })}

      {after > 0 && <FillerRow height={after} />}
    </tbody>
  )
}

export default TableBody
