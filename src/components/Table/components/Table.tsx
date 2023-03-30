// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  CSSProperties,
  ReactElement,
  TableHTMLAttributes,
  useMemo,
  useState
} from 'react'
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
import { ColumnFiltersState, ColumnFilterValue } from 'Components/Table'
import useUpdateEffect from 'Hooks/useUpdateEffect'

interface BaseRow {
  className?: string
  style?: CSSProperties
}

export type Row<T extends Record<any, any>> = BaseRow & T
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Массив с данными для построения шапки таблицы */
  columns: Array<ColumnDef<any, any>>
  /** Массив с данными для построения тела таблицы */
  rows: Array<Row<any>>
  /** Максимальное количество отображаемых элементов */
  maxLength?: number
  /** Включение сортировки по столбцам */
  withSorting?: boolean
  /** Начальное состояние сортировки */
  defaultSorting?: SortingState
  /** Событие изменения состояния сортировки */
  onSortingChange?: (sortingState: SortingState) => void
  // TODO: sorting mode auto
  withFiltering?: boolean
  /** Событие изменения состояния фильтров */
  onFiltersChange?: (state: ColumnFiltersState) => void
  /** Начальное состояние фильтров */
  filtersState?: ColumnFiltersState
  /** Отображение чекбоксов в 1 колонке */
  withRowSelection?: boolean
  /** Событие изменения чекбоксов */
  onChangeRowSelection?: OnChangeFn<RowSelectionState>
  /** Начальное состояние чекбоксов */
  selectionState?: RowSelectionState
  /**
   * Выбранный ряд. Если передается строка или число, идет сравнение аргумента с id столбца.
   */
  selectedRow?: string | number | ((row: Row<any>) => boolean)
  onRowClick?: (row: Row<any>) => void
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
  defaultSorting = [],
  withFiltering,
  onFiltersChange,
  filtersState = [],
  withRowSelection,
  onChangeRowSelection,
  selectionState = {},
  selectedRow,
  onRowClick,
  resizeMode,
  // enableGrouping = false,
  // sortingMode = 'manual
  ...props
}: TableProps): ReactElement => {
  // ==================== state ====================
  const [sorting, setSorting] = useState<SortingState>(defaultSorting)

  const [rowSelection, setRowSelection] = useState(selectionState)

  // обработка сортировки
  useUpdateEffect(() => {
    onSortingChange?.(sorting)
  }, [sorting])

  // ==================== handlers ====================
  const handleFiltersChange: (
    value: ColumnFilterValue,
    filterType: ColumnMeta<any, any>['filterType'],
    column: Column<any>
  ) => void = (value, filterType, column) => {
    const newState = [
      ...filtersState?.filter((item) => item.id !== column.id),
      value ? { id: column.id, filterType, value } : undefined
    ].filter((item) => Boolean(item)) as ColumnFiltersState
    onFiltersChange?.(newState)
  }

  const handleRowSelection: OnChangeFn<RowSelectionState> = (callback) => {
    const newState =
      typeof callback === 'function' ? callback(rowSelection) : {}
    setRowSelection(() => newState)
    onChangeRowSelection?.(newState)
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
              <div className="px-1">
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
      rowSelection,
      sorting
    },
    manualFiltering: true,
    manualSorting: true,
    // manualGrouping: enableGrouping,
    onSortingChange: setSorting,
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
