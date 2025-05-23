// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactElement, useMemo, forwardRef } from 'react'

import {
  Column,
  ColumnDef,
  ColumnMeta,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  useReactTable
} from '@tanstack/react-table'

import {
  TableProps,
  TableColumnFiltersState,
  TableColumnFilterValue
} from './types'

import { getNextSorting } from './helpers'

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
import useSelectionState from './hooks/useSelectionState'

/** Компонент многофункциональной таблицы */
const Table = forwardRef(
  <TRowData extends Record<string, any> = Record<string, any>>(
    {
      columns = [],
      rows = [],
      className,
      withSorting,
      onSortingChange,
      sortingState = [],
      withFiltering,
      onFiltersChange,
      filtersState = [],
      withRowSelection,
      onChangeRowSelection,
      selectionState = [],
      getRowId,
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
      meta,
      onScroll,
      ...props
    }: TableProps<TRowData>,
    ref: React.ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    // ==================== Простая таблица ====================
    if (children) {
      // TODO: scrollable
      return <TableBase {...props}>{children}</TableBase>
    }

    // ==================== Сложная таблица ====================
    const { tanstackSelectionState, handleRowSelection } = useSelectionState({
      selectionState
    })

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
      const hasValue = Array.isArray(value)
        ? value.length !== 0
        : Boolean(value)
      const newState = [
        ...filtersState?.filter((item) => item.id !== column.id),
        hasValue ? { id: column.id, filterType, value } : undefined
      ].filter((item) => Boolean(item)) as TableColumnFiltersState
      onFiltersChange?.(newState)
    }

    const canSort = (column: Column<any>): boolean => {
      return Boolean(withSorting) && Boolean(column.columnDef.enableSorting)
    }

    const canFilter = (column: Column<any>): boolean => {
      return (
        Boolean(withFiltering) && Boolean(column.columnDef.meta?.filterType)
      )
    }

    // ==================== init ====================

    const memoizedColumns = useMemo(() => {
      if (withRowSelection) {
        return [
          {
            id: 'checkbox',
            size: 49,
            header: ({ table }) => {
              return (
                <div className="inf-table__checkbox-cell-wrapper">
                  <Checkbox
                    checked={Boolean(table.getIsAllRowsSelected())}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(value, e) =>
                      table.getToggleAllRowsSelectedHandler().call({}, e)
                    }
                  />
                </div>
              )
            },
            cell: ({ row }) => {
              return (
                <div className="inf-table__checkbox-cell-wrapper">
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
      getRowId: (original, index) => {
        if (typeof getRowId === 'function') {
          return getRowId(original)
        }

        return String(index)
      },
      meta,
      state: {
        rowSelection: tanstackSelectionState,
        sorting: sortingState,
        columnVisibility
      },
      manualFiltering: true,
      // manualGrouping: enableGrouping,
      onRowSelectionChange: (callback) => {
        const nextTanstackSelectionState =
          typeof callback === 'function' ? callback(tanstackSelectionState) : {}

        handleRowSelection(
          nextTanstackSelectionState,
          table,
          onChangeRowSelection
        )
      },
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
        onScroll={(e) => onScroll?.(e)}
        ref={ref}
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
)

Table.displayName = 'Table'

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
