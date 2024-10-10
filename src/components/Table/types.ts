import { ColumnMeta, RowData, ColumnDef } from '@tanstack/react-table'
import { ColumnFilter as TanstackColumnFilter } from '@tanstack/table-core/build/lib/features/Filters'
import { CSSProperties } from 'react'

// ФИЛЬТРАЦИЯ
export interface TableFilterSelectOption {
  label: string
  value: string
}

export interface TableFilterDateOption {
  /** Дата или строка в формате YYYY-MM-DD */
  from?: Date | string
  /** Дата или строка в формате YYYY-MM-DD */
  to?: Date | string
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

// РЯДЫ
interface BaseRow {
  className?: string
  style?: CSSProperties
}

export type TableRowData<T extends Record<any, any> = Record<any, any>> =
  BaseRow & T

export interface TableRow<T extends Record<any, any> = Record<any, any>> {
  id: string
  rowData: TableRowData<T>
}

// СЕЛЕКЦИЯ
export type TableSelectionState<T extends Record<any, any>> = Array<TableRow<T>>

// ВЫБРАННЫЙ РЯД
export type TableSelectedRow =
  | string
  | number
  | ((row: TableRow<any>) => boolean)

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

export type TableVerticalAlignValue = Extract<
  | 'baseline'
  | 'bottom'
  | 'middle'
  | 'sub'
  | 'super'
  | 'text-bottom'
  | 'text-top'
  | 'top',
  CSSProperties['verticalAlign']
>

export type TableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  isHidden?: boolean
}
