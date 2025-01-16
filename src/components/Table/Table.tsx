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
  useReactTable
} from '@tanstack/react-table'

import {
  TableProps,
  TableColumnFiltersState,
  TableColumnFilterValue,
  TableRow as TableRowType
} from './types'

import { getNextSorting, mapRowToExternalFormat } from './helpers'

import TableBase from './components/TableBase'
import TableHeaderFilter from './components/TableHeaderFilter'
import TableHeaderSort from './components/TableHeaderSort'
import TableHeaderCell from './components/TableHeaderCell'
import TableHeaderRow from './components/TableHeaderRow'
import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'
import TableFilterTags from './components/TableFilterTags'
import TableBodyContent from './components/TableBodyContent'
import TableScrollContainer from './components/TableScrollContainer'
import { Checkbox } from 'Components/Checkbox'
import cn from 'classnames'

import './Table.scss'

/** Компонент многофункциональной таблицы */
const Table = ({
  columns = [],
  rows = [],
  className, // TODO: не работает
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
  tableLayout,
  // enableGrouping = false,
  children,
  virtualized,
  height,
  maxHeight,
  stickyHeader,
  estimateRowHeight = 100,
  emptyMessage,
  withFiltersTags,
  withCollapsibleHeaderCellActions,
  ...props
}: TableProps): ReactElement => {
  // ==================== Простая таблица ====================
  if (children) {
    // TODO: scrollable
    return <TableBase {...props}>{children}</TableBase>
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
    const hasValue = Array.isArray(value) ? value.length !== 0 : Boolean(value)
    const newState = [
      ...filtersState?.filter((item) => item.id !== column.id),
      hasValue ? { id: column.id, filterType, value } : undefined
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

  const canSort = (column: Column<any>): boolean => {
    return Boolean(withSorting) && Boolean(column.columnDef.enableSorting)
  }

  const canFilter = (column: Column<any>): boolean => {
    return Boolean(withFiltering) && Boolean(column.columnDef.meta?.filterType)
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
    <TableScrollContainer
      height={height}
      maxHeight={maxHeight}
      stickyHeader={stickyHeader}
      rowsCount={tableRows.length}
      estimateRowHeight={estimateRowHeight}
      enabled={virtualized}
    >
      {({ virtualizer }) => (
        <table
          className={cn(
            'inf-table',
            className,
            {
              [`inf-table--layout-${tableLayout as string}`]: tableLayout
            },
            {
              'inf-table--collapsible-header-cell-actions':
                withCollapsibleHeaderCellActions
            }
          )}
          {...props}
        >
          {/* HEADER */}
          <TableHeader sticky={stickyHeader}>
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
                    slotSortButton={
                      canSort(header.column) ? (
                        <TableHeaderSort
                          active={
                            sortingState.length !== 0 &&
                            header.column.id === sortingState[0].id
                          }
                          desc={sortingState[0]?.desc}
                        />
                      ) : (
                        <></>
                      )
                    }
                    slotFilterButton={
                      canFilter(header.column) && (
                        <TableHeaderFilter
                          column={header.column}
                          filterState={filtersState.find(
                            (filter) => filter.id === header.column.id
                          )}
                          onChange={handleFilterChange}
                        />
                      )
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </TableHeaderCell>
                ))}
              </TableHeaderRow>
            ))}
            {/* Теги фильтров */}
            {withFiltersTags && filtersState?.length !== 0 && (
              <TableFilterTags
                totalColumnsCount={totalColumnsCount}
                filtersState={filtersState}
                onChange={onFiltersChange}
                sticky={stickyHeader}
              />
            )}
          </TableHeader>

          {/* BODY */}
          <TableBody>
            <TableBodyContent
              rows={tableRows}
              selectedRow={selectedRow}
              onRowClick={onRowClick}
              // grouping={enableGrouping}
              virtualizer={virtualizer}
              totalColumnsCount={totalColumnsCount}
              emptyMessage={emptyMessage}
            />
          </TableBody>
        </table>
      )}
    </TableScrollContainer>
  )
}

export default Table

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
// лагает в МПК НПФ сильнее чем прошлая версsия, особенно если ховерить на шапку предварительно
// TODO: прокидывание размеров для вспылвающего окна filter height и width
// borderless нужен ли вообще?
// если применить scrollable без virtualized, то у таблицы пропадают бордеры --borderless
// если ряд выбран через selection, то он должен иметь стиль --selected
// multiSelect value должен быть типа SelectOpion[]
// filterType date и dateRange
