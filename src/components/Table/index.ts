import {
  ColumnMeta,
  RowData,
  ColumnFilter as TanstackColumnFilter
} from '@tanstack/react-table'
import { CSSProperties } from 'react'

export * from '@tanstack/react-table'

export { default as Table } from './components/Table'

export interface TableFilterSelectOption {
  label: string
  value: string
}

export interface TableFilterDateOption {
  from?: string
  to?: string
}

export type TableFilterType = ColumnMeta<any, any>['filterType']

export interface TableColumnFilterValues {
  input: string
  select: TableFilterSelectOption
  date: TableFilterDateOption
}

export type TableColumnFilterValue =
  | TableColumnFilterValues[keyof TableColumnFilterValues]
  | undefined

export interface TableColumnFilter<T extends TableFilterType>
  extends TanstackColumnFilter {
  value: TableColumnFilterValues[T]
  filterType: TableFilterType
}

export type TableColumnFiltersState = Array<TableColumnFilter<TableFilterType>>

interface BaseRow {
  className?: string
  style?: CSSProperties
}

export type TableRow<T extends Record<any, any>> = BaseRow & T

export type TableSelectionStateItem = TableRow<{ id: string; rowData: any }>

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType: 'input' | 'select' | 'date'
    filterItems?: TableFilterSelectOption[]
  }

  // interface FilterFns {
  //   elIncludesString: FilterFn<unknown>
  // }
}

export type { TableProps } from './components/Table'
