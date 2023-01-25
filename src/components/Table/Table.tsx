import { Fragment, ReactElement, TableHTMLAttributes, useMemo } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  RowSelectionState,
  useReactTable
} from '@tanstack/react-table'
import './index.scss'
import * as React from 'react'
import { Checkbox } from 'Components/Checkbox'
import cn from 'classnames'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  columns: any
  data: Array<Record<string, any>>
  withRowSelection?: boolean
  onChangeRowSelection?: OnChangeFn<RowSelectionState>
  /** Обьект с состоянием чекбоксов */
  selectionValue?: RowSelectionState
  enableGrouping?: boolean
}

const Table = ({
  columns,
  data,
  withRowSelection,
  onChangeRowSelection,
  selectionValue = {},
  enableGrouping = false,
  className,
  ...props
}: TableProps): ReactElement => {
  const [rowSelection, setRowSelection] = React.useState(selectionValue)

  let resultColumns = columns
  if (withRowSelection) {
    resultColumns = useMemo(() => {
      const deepCopy: Array<ColumnDef<any>> = JSON.parse(
        JSON.stringify(columns)
      )
      deepCopy.unshift({
        id: 'checkbox',
        header: ({ table }) => {
          return (
            <Checkbox
              checked={Boolean(table.getIsAllRowsSelected())}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          )
        },
        cell: ({ row }) => {
          return (
            <div className="px-1">
              <Checkbox
                checked={row.getIsSelected()}
                variant={row.getIsSomeSelected() ? 'indeterminate' : 'primary'}
                onChange={row.getToggleSelectedHandler()}
              />
            </div>
          )
        }
      })

      return deepCopy
    }, [...columns])
  }

  const handleRowSelection: OnChangeFn<RowSelectionState> = (callback) => {
    const newState =
      typeof callback === 'function' ? callback(rowSelection) : {}
    setRowSelection(newState)
    onChangeRowSelection?.(newState)
  }

  const table = useReactTable({
    data,
    columns: resultColumns,
    state: {
      rowSelection
    },
    getSubRows: (row) => row?.subRows,
    manualGrouping: enableGrouping,
    onRowSelectionChange: handleRowSelection,
    getCoreRowModel: getCoreRowModel()
  })

  const rows = table.getRowModel().rows

  return (
    <table className={cn('inf-table', className)} {...props}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => {
          return enableGrouping ? (
            <Fragment key={row.id}>
              <tr className={'inf-table__group-label'}>
                <td>{row.original.date}</td>
                {Array.from({ length: columns.length - 1 }).map(
                  (item, index) => (
                    <td key={row.id + String(index)} />
                  )
                )}
              </tr>

              {row.subRows.map((subRow) => (
                <tr key={subRow.id}>
                  {Object.keys(subRow.original).map((key, index) => (
                    <td key={subRow.id + String(index)}>
                      {subRow.original[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ) : (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
