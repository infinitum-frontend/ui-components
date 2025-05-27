// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ReactElement,
  useMemo,
  useState,
  forwardRef,
  ForwardedRef
} from 'react'

import {
  Column,
  ColumnDef,
  ColumnMeta,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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

function BaseTable<TRowData extends Record<string, any> = Record<string, any>>(
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
    withSubRows,
    expandAll,
    getSubRows,
    ...props
  }: TableProps<TRowData>,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  // ==================== Простая таблица ====================
  if (children) {
    // TODO: scrollable
    return <TableBase {...props}>{children}</TableBase>
  }

  const [expanded, setExpanded] = useState<ExpandedState>(expandAll ? true : {})

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
    const hasValue = Array.isArray(value) ? value.length !== 0 : Boolean(value)
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
    return Boolean(withFiltering) && Boolean(column.columnDef.meta?.filterType)
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
    getRowId: (original, index, parent) => {
      if (typeof getRowId === 'function') {
        return getRowId(original)
      }

      if (parent?.id) {
        return `${parent.id}.${index}`
      }

      return String(index)
    },
    meta,
    state: {
      rowSelection: tanstackSelectionState,
      sorting: sortingState,
      columnVisibility,
      expanded: withSubRows ? expanded : undefined
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
    onExpandedChange: setExpanded,
    getSubRows: (row) => {
      if (typeof getSubRows === 'function') {
        return getSubRows(row)
      }

      return row?.subRows
    },
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  // ==================== vars ====================

  const tableRows = table.getRowModel().rows

  const totalColumnsCount = memoizedColumns?.length

  // если передан expandAll, значит мы хотим отображать группировку всегда(ряд-лейбл с названием группы)
  const withGroupLabel = withSubRows && expandAll

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
              withGroupLabel={withGroupLabel}
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
/** Компонент многофункциональной таблицы */
const Table = forwardRef(BaseTable)

// https://github.com/storybookjs/storybook/issues/9511#issuecomment-575608291
export { Table }

export default Table as typeof BaseTable

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
