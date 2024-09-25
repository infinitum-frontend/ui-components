import {
  CellContext,
  createColumnHelper,
  createColumn,
  createCell,
  SortingState,
  ColumnDef,
  RowData
} from '@tanstack/react-table'
import Table from './Table'
import { OnChangeFn } from 'Utils/types'

type MyColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  isInvisible?: boolean
}

// TODO: стандартизировать список экспортов. Добавить нужные при необходимости
export * from './types'
export {
  Table,
  createColumnHelper as createTableColumnHelper,
  createCell as createTableCell,
  createColumn as createTableColumn
}
export type {
  OnChangeFn,
  CellContext as TableCellContext,
  SortingState as TableSortingState,
  MyColumnDef as TableColumnDef
}
