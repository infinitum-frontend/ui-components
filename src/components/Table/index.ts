import {
  CellContext,
  createColumnHelper,
  createColumn,
  createCell,
  SortingState,
  ColumnDef,
  useReactTable,
  getCoreRowModel
} from '@tanstack/react-table'
import Table from './Table'
import { OnChangeFn } from 'Utils/types'
import { getNextSorting } from './helpers'

// TODO: стандартизировать список экспортов. Добавить нужные при необходимости
export * from './types'
export {
  Table,
  createColumnHelper as createTableColumnHelper,
  createCell as createTableCell,
  createColumn as createTableColumn,
  useReactTable as useTable,
  getCoreRowModel,
  getNextSorting
}
export type {
  OnChangeFn,
  CellContext as TableCellContext,
  SortingState as TableSortingState,
  ColumnDef as TableColumnDef
}
