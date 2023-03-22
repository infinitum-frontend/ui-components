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
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  OnChangeFn,
  ColumnFiltersState,
  Column,
  getFacetedUniqueValues,
  RowSelectionState
} from '@tanstack/react-table'
import cn from 'classnames'
import TableHeader from 'Components/Table/components/Header'
import TableBody from 'Components/Table/components/Body'
import '../index.scss'
import { Checkbox } from 'Components/Checkbox'
import { getByText } from 'Components/Table/helpers'

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
  /** Событие изменения состояния сортировки */
  onSortingChange?: (sortingState: SortingState) => void
  // sortingState?: SortingState
  withFiltering?: boolean
  /** Событие изменения состояния фильтров */
  onFiltersChange?: (state: ColumnFiltersState) => void
  /** Начальное состояние фильтров */
  filtersState?: ColumnFiltersState
  /**
   * Режим фильтрации
   * @default auto
   * auto - таблица сама фильтрует среди всех своих данных,
   * manual - фильтры не устанавливаются, а только вызывается событие onFiltersChange с состоянием фильтров
   */
  filterMode?: 'auto' | 'manual'
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
  // /** Включена ли группировка */
  // // enableGrouping?: boolean
}

const Table = ({
  columns = [],
  rows,
  className,
  maxLength = 5,
  withSorting,
  onSortingChange,
  withFiltering,
  onFiltersChange,
  filtersState = [],
  filterMode = 'auto',
  withRowSelection,
  onChangeRowSelection,
  selectionState = {},
  selectedRow,
  onRowClick,
  // enableGrouping = false,
  // sortingMode = 'manual
  ...props
}: TableProps): ReactElement => {
  // ==================== state ====================
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    filtersState || []
  )
  // устанавливаем отдельной состояние фильтров для manual режима фильтрации
  const [manualFilters, setManualFilters] = useState<ColumnFiltersState>(
    filtersState || []
  )

  const [rowSelection, setRowSelection] = useState(selectionState)

  // ==================== handlers ====================
  const handleSortingChange: OnChangeFn<SortingState> = (fn) => {
    // @ts-expect-error
    onSortingChange?.(fn())
    setSorting(fn)
  }

  const handleFiltersChange: (value: string, column: Column<any>) => void = (
    value,
    column
  ) => {
    if (filterMode === 'auto') {
      column.setFilterValue(value)
    }

    if (filterMode === 'manual') {
      const newState = [
        ...manualFilters?.filter((item) => item.id !== column.id),
        value ? { id: column.id, value } : undefined
      ].filter((item) => Boolean(item)) as ColumnFiltersState
      setManualFilters(newState)
      onFiltersChange?.(newState)
    }
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
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      columnFilters,
      sorting
    },
    filterFns: {
      elIncludesString: (row, columnId, filterValue) => {
        return getByText(row, columnId, filterValue)
      }
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: handleSortingChange,
    onRowSelectionChange: handleRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
    // getSubRows: (row) => row?.subRows,
    // manualGrouping: enableGrouping,
  })

  const tableRows = table.getRowModel().rows.slice(0, maxLength)

  return (
    <table className={cn('inf-table', className)} {...props}>
      <TableHeader
        table={table}
        withSorting={withSorting}
        withFiltering={withFiltering}
        onFiltersChange={handleFiltersChange}
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
