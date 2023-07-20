import {
  CellContext,
  createColumnHelper,
  createColumn,
  createCell,
  SortingState,
  ColumnDef
} from '@tanstack/react-table'
import Table from './Table'
import { OnChangeFn } from 'Utils/types'

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
  ColumnDef as TableColumnDef
}
