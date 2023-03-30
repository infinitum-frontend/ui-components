import {
  ColumnMeta,
  RowData,
  ColumnFilter as TanstackColumnFilter
} from '@tanstack/react-table'

export { default as Table } from './components/Table'

export interface FilterSelectOption {
  label: string
  value: string
}

export interface FilterDateOption {
  from?: string
  to?: string
}

export type FilterType = ColumnMeta<any, any>['filterType']

export interface ColumnFilterValues {
  input: string
  select: FilterSelectOption
  date: FilterDateOption
}

export type ColumnFilterValue =
  | ColumnFilterValues[keyof ColumnFilterValues]
  | undefined

export interface ColumnFilter<T extends FilterType>
  extends TanstackColumnFilter {
  value: ColumnFilterValues[T]
  filterType: FilterType
}

export type ColumnFiltersState = Array<ColumnFilter<FilterType>>

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType: 'input' | 'select' | 'date'
    filterItems?: FilterSelectOption[]
  }

  // interface FilterFns {
  //   elIncludesString: FilterFn<unknown>
  // }
}
