// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, useMemo } from 'react'

import {
  Column,
  ColumnDef,
  ColumnMeta,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  OnChangeFn as TanstackOnChangeFn,
  RowSelectionState,
  useReactTable,
  Row
} from '@tanstack/react-table'

import {
  TableProps,
  TableColumnFiltersState,
  TableColumnFilterValue,
  TableRow as TableRowType
} from './types'

import {
  checkIsRowSelected,
  getNextSorting,
  mapRowToExternalFormat
} from './helpers'

import TableBase from './components/TableBase'
import TableHeaderFilter from './components/TableHeaderFilter'
import TableHeaderSort from './components/TableHeaderSort'
import TableHeaderCell from './components/TableHeaderCell'
import TableHeaderRow from './components/TableHeaderRow'
import TableWithVirtualRows from './components/TableWithVirtualRows'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import TableCell from './components/TableCell'
import TableEmpty from './components/TableEmpty'
import TableBody from './components/TableBody'
import { Checkbox } from 'Components/Checkbox'

import cn from 'classnames'

import './Table.scss'
import TableFilterPopover from './components/TableFilterPopover'
import TableFilterTags from './components/TableFilterTags'

/** Компонент многофункциональной таблицы */
const Table = ({
  columns = [],
  rows = [],
  className,
  borderRadius = 'small',
  verticalAlignHead = 'top',
  verticalAlignBody,
  withSorting,
  onSortingChange,
  sortingState = [],
  withFiltering,
  onFiltersChange,
  filtersState = [],
  withRowSelection,
  onChangeRowSelection,
  selectionState = [],
  selectedRow,
  onRowClick,
  resizeMode,
  columnVisibility = {},
  // enableGrouping = false,
  children,
  scrollable,
  maxHeight,
  estimateRowHeight = 100,
  emptyMessage,
  filterTags,
  ...props
}: TableProps): ReactElement => {
  // ==================== Простая таблица ====================
  if (children) {
    return (
      <TableBase
        verticalAlignBody={verticalAlignBody}
        verticalAlignHead={verticalAlignHead}
        borderRadius={borderRadius}
        {...props}
      >
        {children}
      </TableBase>
    )
  }

  // ==================== Сложная таблица ====================

  // Приводим состояние селекции столбцом к формату танстака(объект ключ-id ряда, значение-boolean)
  const tanstackSelectionState = useMemo(
    () =>
      selectionState?.reduce<RowSelectionState>((accumulator, currentValue) => {
        accumulator[currentValue.id] = true
        return accumulator
      }, {}),
    [selectionState]
  )

  // ==================== handlers ====================

  const handleSortingChange = (column: Column<any>): void => {
    if (canSort(column)) {
      const newSortingState = getNextSorting(sortingState, column.id)
      onSortingChange?.(newSortingState)
    }
  }

  const handleFilterChange: (
    value: TableColumnFilterValue,
    filterType: ColumnMeta<any, any>['filterType'],
    column: Column<any>
  ) => void = (value, filterType, column) => {
    const newState = [
      ...filtersState?.filter((item) => item.id !== column.id),
      value ? { id: column.id, filterType, value } : undefined
    ].filter((item) => Boolean(item)) as TableColumnFiltersState
    onFiltersChange?.(newState)
  }

  // маппим данные ряда из формата танстака к нашему формату
  const handleRowSelection: TanstackOnChangeFn<RowSelectionState> = (
    callback
  ) => {
    const newTanstackSelectionState =
      typeof callback === 'function' ? callback(tanstackSelectionState) : {}
    const rowSelectionState: Array<TableRowType<any>> = []
    Object.keys(newTanstackSelectionState).forEach((key) => {
      const row = mapRowToExternalFormat(table.getRow(key))
      rowSelectionState.push(row)
    })
    onChangeRowSelection?.(rowSelectionState)
  }

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

  const canSort = (column: Column<any>): boolean => {
    return Boolean(withSorting) && Boolean(column.columnDef.enableSorting)
  }

  const canFilter = (column: Column<any>): boolean => {
    return (
      Boolean(withFiltering) &&
      column.getCanFilter() &&
      Boolean(column.columnDef.meta?.filterType)
    )
  }

  // ==================== init ====================

  const memoizedColumns = useMemo(() => {
    if (withRowSelection) {
      return [
        {
          id: 'checkbox',
          size: 20,
          header: ({ table }) => {
            return (
              <Checkbox
                checked={Boolean(table.getIsAllRowsSelected())}
                indeterminate={table.getIsSomeRowsSelected()}
                onClick={(e) => e.stopPropagation()}
                onChange={(value, e) =>
                  table.getToggleAllRowsSelectedHandler().call({}, e)
                }
              />
            )
          },
          cell: ({ row }) => {
            return (
              <div>
                <Checkbox
                  checked={row.getIsSelected()}
                  indeterminate={row.getIsSomeSelected()}
                  onClick={(e) => e.stopPropagation()}
                  onChange={row.getToggleSelectedHandler()}
                />
              </div>
            )
          }
        },
        ...columns
      ] as Array<ColumnDef<any>>
    }

    return columns
  }, [columns, withRowSelection])

  const table = useReactTable({
    data: rows,
    columns: memoizedColumns,
    columnResizeMode: resizeMode,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: tanstackSelectionState,
      sorting: sortingState,
      columnVisibility
    },
    manualFiltering: true,
    // manualGrouping: enableGrouping,
    onRowSelectionChange: handleRowSelection,
    getFacetedUniqueValues: getFacetedUniqueValues()
    // getSubRows: (row) => row?.subRows,
  })

  // ==================== vars ====================

  const tableRows = table.getRowModel().rows

  const totalColumnsCount = memoizedColumns?.length

  return (
    <TableWithVirtualRows
      rowsCount={tableRows.length}
      borderRadius={borderRadius}
      estimateRowHeight={estimateRowHeight}
      maxHeight={maxHeight}
      enabled={scrollable}
    >
      {({ virtualizer }) => (
        <table
          className={cn('inf-table', className, {
            [`inf-table--border-radius-${borderRadius as string}`]:
              borderRadius,
            // Для того, чтобы избежать проблем с border таблицы при фиксированной шапке и скролле,
            // убираем внешние бордеры у таблицы
            'inf-table--borderless': scrollable // TODO: добавить внешний проп borderless
          })}
          {...props}
        >
          {/* HEADER */}
          <TableHeader sticky={scrollable}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableHeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    interactive={canSort(header.column)}
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      // обработка ширины столбцов
                      width: header.getSize()
                    }}
                    onClick={() => handleSortingChange(header.column)}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {canSort(header.column) && (
                          <TableHeaderSort
                            active={
                              sortingState.length !== 0 &&
                              header.column.id === sortingState[0].id
                            }
                            desc={sortingState[0]?.desc}
                          />
                        )}
                        {canFilter(header.column) && (
                          <TableHeaderFilter
                            header={header}
                            filterState={filtersState.find(
                              (filter) => filter.id === header.column.id
                            )}
                            onChange={handleFilterChange}
                          />
                        )}
                      </>
                    )}
                  </TableHeaderCell>
                ))}
              </TableHeaderRow>
            ))}
            {/* {filterTags?.length && <TableFilterTags values={filterTags} />} */}
          </TableHeader>
          {/* BODY */}
          <TableBody>
            {tableRows?.length ? (
              tableRows.map((row) => {
                const isRowInteractive = Boolean(onRowClick)

                return (
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableEmpty colSpan={totalColumnsCount} message={emptyMessage} />
            )}
          </TableBody>
        </table>
      )}
    </TableWithVirtualRows>
  )
}

export default Object.assign(Table, {
  Header: TableHeader,
  HeaderCell: TableHeaderCell,
  HeaderRow: TableHeaderRow,
  HeaderSort: TableHeaderSort,
  FilterPopover: TableFilterPopover,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Empty: TableEmpty,
  FilterTags: TableFilterTags
})

// TODO:
// TableHeader => TableHead - его экспортировать как UI, а TableHeader оставить для обработки логики внутри
// TableHeaderRow => TableRow
// TableEmpty - не отображается при использовании с scrollable
// прокидывание ширины колонки как CSS property
// fixed высота tablehead - при этом высота tr в head должна = высоте tr в body
// verticalAlignHead
// resizer
// прокидывание style и className
// virtualizer
// вынести логики сортировки, фильтрации, селекции и пр. в хуки
// если экспортировать TableWithVirtualRows, то будет ли с ним тащиться react-virtual, даже если мы его не будем использоваться
