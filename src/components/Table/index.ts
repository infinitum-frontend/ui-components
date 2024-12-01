import {
  CellContext,
  createColumnHelper,
  createColumn,
  createCell,
  SortingState
} from '@tanstack/react-table'
import Table from './Table'
import { OnChangeFn } from 'Utils/types'
import { TableColumnDef } from './types'

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
  TableColumnDef
}
