// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { CSSProperties, ReactElement, useRef } from 'react'
import { flexRender, Row } from '@tanstack/react-table'
import cn from 'classnames'
import { TableRow, TableVerticalAlignValue } from 'Components/Table/types'
import { mapRowToExternalFormat } from 'Components/Table/helpers'
import { Virtualizer, notUndefined } from '@tanstack/react-virtual'

interface TableBodyProps {
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

  const virtualItems = virtualizer?.getVirtualItems() || []

  const [before, after] =
    virtualItems.length > 0
      ? [
          notUndefined(virtualItems[0]).start -
            (virtualizer?.options.scrollMargin || 0),
          (virtualizer?.getTotalSize() || 0) -
            notUndefined(virtualItems[virtualItems.length - 1]).end
        ]
      : [0, 0]

  const rowsToRender = virtualizer ? virtualItems : rows

  return (
    <tbody>
      {before > 0 && (
        <tr>
          <td
            style={{
              height: `${before}px`,
              padding: 0,
              borderTop: 'none'
            }}
          />
        </tr>
      )}

      {rowsToRender.map((rowToRender) => {
        const row = virtualizer
          ? rows[rowToRender.index]
          : (rowToRender as Row<any>)

        return (
          <tr
            key={row.id}
            data-index={rowToRender.index}
            ref={virtualizer?.measureElement}
            className={cn(row.original.className, {
              [`inf-table--vertical-align-${verticalAlignBody as string}`]:
                verticalAlignBody,
              'inf-table__row--selected': checkSelected(
                mapRowToExternalFormat(row),
                selectedRow
              ),
              'inf-table__row--interactive': Boolean(onRowClick)
            })}
            style={row.original.style}
            onClick={(e) => handleRowClick(e, row)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        )
      })}

      {after > 0 && (
        <tr>
          <td
            style={{
              height: `${after}px`,
              padding: 0,
              borderTop: 'none'
            }}
          />
        </tr>
      )}

      {/*  // return grouping ? ( */}
      {/*  //   <Fragment key={row.id}> */}
      {/*  //     <tr className={'inf-table__group-label'}> */}
      {/*  //       /!* TODO: тут нужно кастомное поле *!/ */}
      {/*  //       <td>{row.original.row}</td> */}
      {/*  //       {Array.from({ length: columns.length - 1 }).map((item, index) => ( */}
      {/*  //         <td key={row.id + String(index)} /> */}
      {/*  //       ))} */}
      {/*  //     </tr> */}
      {/*  // */}
      {/*  //     {row.subRows.map((subRow) => ( */}
      {/*  //       <tr key={subRow.id}> */}
      {/*  //         {Object.keys(subRow.original).map((key, index) => ( */}
      {/*  //           <td key={subRow.id + String(index)}> */}
      {/*  //             {subRow.original[key]} */}
      {/*  //           </td> */}
      {/*  //         ))} */}
      {/*  //       </tr> */}
      {/*  //     ))} */}
      {/*  //   </Fragment> */}
      {/*  // ) : ( */}
      {/*  //   <tr key={row.id}> */}
      {/*  //     {row.getVisibleCells().map((cell, index) => ( */}
      {/*  //       <td key={cell.id}> */}
      {/*  //         {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
      {/*  //       </td> */}
      {/*  //     ))} */}
      {/*  //   </tr> */}
      {/*  // ) */}
      {/* // })} */}
    </tbody>
  )
}

export default TableBody
