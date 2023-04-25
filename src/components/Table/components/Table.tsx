// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, TableHTMLAttributes, useMemo } from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  OnChangeFn,
  Column,
  getFacetedUniqueValues,
  RowSelectionState,
  ColumnResizeMode,
  ColumnMeta
} from '@tanstack/react-table'
import cn from 'classnames'
import TableHeader from 'Components/Table/components/Header'
import TableBody from 'Components/Table/components/Body'
import '../index.scss'
import { Checkbox } from 'Components/Checkbox'
import {
  TableColumnFiltersState,
  TableColumnFilterValue,
  TableRow,
  TableSelectionStateItem
} from 'Components/Table'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Массив с данными для построения шапки таблицы */
  columns: Array<ColumnDef<any, any>>
  /** Массив с данными для построения тела таблицы */
  rows: Array<TableRow<any>>
  /** Максимальное количество отображаемых элементов */
  maxLength?: number
  /** Включение сортировки по столбцам */
  withSorting?: boolean
  /** Начальное состояние сортировки */
  sortingState?: SortingState
  /** Событие изменения состояния сортировки */
  onSortingChange?: (sortingState: SortingState) => void
  // TODO: sorting mode auto
  withFiltering?: boolean
  /** Событие изменения состояния фильтров */
  onFiltersChange?: (state: TableColumnFiltersState) => void
  /** Начальное состояние фильтров */
  filtersState?: TableColumnFiltersState
  /** Отображение чекбоксов в 1 колонке */
  withRowSelection?: boolean
  /** Событие изменения чекбоксов */
  onChangeRowSelection?: (selectionState: TableSelectionStateItem[]) => void
  /** Состояние выбора рядов через чекбокс */
  selectionState?: TableSelectionStateItem[]
  /**
   * Выбранный ряд. Если передается строка или число, идет сравнение аргумента с id столбца.
   */
  selectedRow?: string | number | ((row: TableRow<any>) => boolean)
  onRowClick?: (row: TableRow<any>) => void
  resizeMode?: ColumnResizeMode
  // /** Включена ли группировка */
  // // enableGrouping?: boolean
}

const Table = ({
  columns = [],
  rows,
  className,
  maxLength,
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
  // enableGrouping = false,
  ...props
}: TableProps): ReactElement => {
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
  const handleSortingChange: OnChangeFn<SortingState> = (state) => {
    let newState
    if (typeof state === 'function') {
      newState = state(sortingState)
    } else {
      newState = state
    }
    onSortingChange?.(newState)
  }
  const handleFiltersChange: (
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

  const handleRowSelection: OnChangeFn<RowSelectionState> = (callback) => {
    const newTanstackSelectionState =
      typeof callback === 'function' ? callback(tanstackSelectionState) : {}

    const rowSelectionState: TableSelectionStateItem[] = []
    Object.keys(newTanstackSelectionState).forEach((key) => {
      const { id, original } = table.getRow(key)
      rowSelectionState.push({ id, rowData: original })
    })

    onChangeRowSelection?.(rowSelectionState)
  }

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
      sorting: sortingState
    },
    manualFiltering: true,
    manualSorting: true,
    // manualGrouping: enableGrouping,
    onSortingChange: handleSortingChange,
    onRowSelectionChange: handleRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
    // getSubRows: (row) => row?.subRows,
  })

  const tableRows = maxLength
    ? table.getRowModel().rows.slice(0, maxLength)
    : table.getRowModel().rows

  return (
    <table className={cn('inf-table', className)} {...props}>
      <TableHeader
        table={table}
        withSorting={withSorting}
        withFiltering={withFiltering}
        filtersState={filtersState}
        onFiltersChange={handleFiltersChange}
        resizeMode={resizeMode}
      />
      <TableBody
        rows={tableRows}
        selectedRow={selectedRow}
        onRowClick={onRowClick}
        // grouping={enableGrouping}
      />
    </table>
  )
}

export default Table
