import {
  CSSProperties,
  ReactElement,
  TableHTMLAttributes,
  useState
} from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel
} from '@tanstack/react-table'
import cn from 'classnames'
import TableHeader from 'Components/Table/components/Header'
import TableBody from 'Components/Table/components/Body'
import '../index.scss'

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
  sortingState?: SortingState
  // /** Отображение чекбоксов в 1 колонке */
  // withRowSelection?: boolean
  // withFiltering?: boolean
  // /** Событие изменения чекбоксов */
  // onChangeRowSelection?: OnChangeFn<RowSelectionState>
  // /** Обьект с состоянием чекбоксов */
  // selectionValue?: RowSelectionState
  // onFiltersChange?: (state: ColumnFiltersState) => void
  // /** Начальное состояние фильтров */
  // filtersState?: ColumnFiltersState
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

const Table = ({
  columns = [],
  rows,
  className,
  maxLength = 5,
  // withRowSelection,
  withSorting,
  // withFiltering,
  // onChangeRowSelection,
  // selectionValue = {},
  // onFiltersChange,
  // filtersState = [],
  // enableGrouping = false,
  // filterMode = 'manual',
  // sortingMode = 'manual
  ...props
}: TableProps): ReactElement => {
  // const filterMode = 'manual'
  // const [rowSelection, setRowSelection] = useState(selectionValue)
  const [sorting, setSorting] = useState<SortingState>([])
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
  //   filtersState || []
  // )
  // const [manualFilters, setManualFilters] = useState<ColumnFiltersState>(
  //   filtersState || []
  // )

  // const memoizedColumns = useMemo(() => {
  //   if (withRowSelection) {
  //     const deepCopy: Array<ColumnDef<any>> = JSON.parse(
  //       JSON.stringify(columns)
  //     )
  //     deepCopy.unshift({
  //       id: 'checkbox',
  //       header: ({ table }) => {
  //         return (
  //           <Checkbox
  //             checked={Boolean(table.getIsAllRowsSelected())}
  //             indeterminate={table.getIsSomeRowsSelected()}
  //             onChange={(value, e) =>
  //               table.getToggleAllRowsSelectedHandler().call({}, e)
  //             }
  //           />
  //         )
  //       },
  //       cell: ({ row }) => {
  //         return (
  //           <div className="px-1">
  //             <Checkbox
  //               checked={row.getIsSelected()}
  //               indeterminate={row.getIsSomeSelected()}
  //               onChange={row.getToggleSelectedHandler()}
  //             />
  //           </div>
  //         )
  //       }
  //     })
  //
  //     return deepCopy
  //   }
  //
  //   return columns
  // }, [...columns, withRowSelection])

  // const handleRowSelection: OnChangeFn<RowSelectionState> = (callback) => {
  //   const newState =
  //     typeof callback === 'function' ? callback(rowSelection) : {}
  //   setRowSelection(newState)
  //   onChangeRowSelection?.(newState)
  // }
  //
  // const handleFiltersChange: (value: string, column: Column<any>) => void = (
  //   value,
  //   column
  // ) => {
  // if (filterMode === 'auto') {
  //   column.setFilterValue(value)
  // }

  //   if (filterMode === 'manual') {
  //     const newState = [
  //       ...manualFilters?.filter((item) => item.id !== column.id),
  //       value ? { id: column.id, value } : undefined
  //     ].filter((item) => Boolean(item)) as ColumnFiltersState
  //     setManualFilters(newState)
  //     onFiltersChange?.(newState)
  //   }
  // }

  const table = useReactTable({
    data: rows,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      // rowSelection,
      // columnFilters,
      sorting
    },
    // filterFns: {
    //   elIncludesString: (row, columnId, filterValue) => {
    //     return getByText(row, columnId, filterValue)
    //   }
    // },
    // onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    // getSubRows: (row) => row?.subRows,
    // manualGrouping: enableGrouping,
    // onRowSelectionChange: handleRowSelection,
    getSortedRowModel: getSortedRowModel()
    // getFacetedRowModel: getFacetedRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
    // getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const tableRows = table.getRowModel().rows.slice(0, maxLength)

  return (
    <table className={cn('inf-table', className)} {...props}>
      <TableHeader
        table={table}
        withSorting={withSorting}
        // withFiltering={withFiltering}
        // onFiltersChange={handleFiltersChange}
      />
      <TableBody
        rows={tableRows}
        // grouping={enableGrouping}
      />
    </table>
  )
}

export default Table
