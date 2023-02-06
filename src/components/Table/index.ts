import { FilterFn, RowData } from '@tanstack/react-table'

export { default as Table } from './components/Table'

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType: 'input' | 'select'
  }

  interface FilterFns {
    elIncludesString: FilterFn<unknown>
  }
}
