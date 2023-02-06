import { ReactElement, TableHTMLAttributes, useMemo, useState } from 'react'
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { Checkbox } from 'Components/Checkbox'
import cn from 'classnames'
import TableHeader from 'Components/Table/components/Header'
import TableBody from 'Components/Table/components/Body'
import { getByText } from 'Components/Table/helpers'
import '../index.scss'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Массив с данными для построения шапки таблицы */
  columns: Array<ColumnDef<any>>
  /** Массив с данными для построения тела таблицы */
  data: Array<Record<string, any>>
  /** Включение сортировки по столбцам */
  withSorting?: boolean
  sortingState?: SortingState
  /** Отображение чекбоксов в 1 колонке */
  withRowSelection?: boolean
  withFiltering?: boolean
  /** Событие изменения чекбоксов */
  onChangeRowSelection?: OnChangeFn<RowSelectionState>
  /** Обьект с состоянием чекбоксов */
  selectionValue?: RowSelectionState
  onFiltersChange?: (state: ColumnFiltersState) => void
  /** Начальное состояние фильтров */
  filtersState?: ColumnFiltersState
  // /**
  //  * Режим фильтрации
  //  * @default auto
  //  * auto - таблица сама фильтрует среди всех своих данных,
  //  * manual - фильтры не устанавливаются, а только вызывается событие onFiltersChange с состоянием фильтров
  //  */
  // // filterMode?: 'auto' | 'manual'
  // /** Включена ли группировка */
  // // enableGrouping?: boolean
}

// TODO: applyFilterButton
const Table = ({
  columns = [],
  data,
  withRowSelection,
  withSorting,
  withFiltering,
  onChangeRowSelection,
  selectionValue = {},
  className,
  onFiltersChange,
  filtersState = [],
  // enableGrouping = false,
  // filterMode = 'manual',
  // sortingMode = 'manual
  ...props
}: TableProps): ReactElement => {
  const filterMode = 'manual'
  const [rowSelection, setRowSelection] = useState(selectionValue)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    filtersState || []
  )
  const [manualFilters, setManualFilters] = useState<ColumnFiltersState>(
    filtersState || []
  )

  const memoizedColumns = useMemo(() => {
    if (withRowSelection) {
      const deepCopy: Array<ColumnDef<any>> = JSON.parse(
        JSON.stringify(columns)
      )
      deepCopy.unshift({
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
      })

      return deepCopy
    }

    return columns
  }, [...columns, withRowSelection])

  const handleRowSelection: OnChangeFn<RowSelectionState> = (callback) => {
    const newState =
      typeof callback === 'function' ? callback(rowSelection) : {}
    setRowSelection(newState)
    onChangeRowSelection?.(newState)
  }

  const handleFiltersChange: (value: string, column: Column<any>) => void = (
    value,
    column
  ) => {
    // if (filterMode === 'auto') {
    //   column.setFilterValue(value)
    // }

    if (filterMode === 'manual') {
      const newState = [
        ...manualFilters?.filter((item) => item.id !== column.id),
        value ? { id: column.id, value } : undefined
      ].filter((item) => Boolean(item)) as ColumnFiltersState
      setManualFilters(newState)
      onFiltersChange?.(newState)
    }
  }

  const table = useReactTable({
    data,
    columns: memoizedColumns,
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
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    // getSubRows: (row) => row?.subRows,
    // manualGrouping: enableGrouping,
    onRowSelectionChange: handleRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const rows = table.getRowModel().rows

  return (
    <table className={cn('inf-table', className)} {...props}>
      <TableHeader
        table={table}
        withSorting={withSorting}
        withFiltering={withFiltering}
        onFiltersChange={handleFiltersChange}
      />
      <TableBody
        rows={rows}
        columns={memoizedColumns}
        // grouping={enableGrouping}
      />
    </table>
  )
}

export default Table
