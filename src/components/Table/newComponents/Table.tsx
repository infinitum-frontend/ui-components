import { ComponentPropsWithoutRef, ReactElement } from 'react'
import TableBody from './TableBody'
import TableCell from './TableCell'
import TableFilterPopover from './TableFilterPopover'
import TableHeader from './TableHeader'
import TableHeaderCell from './TableHeaderCell'
import TableHeaderRow from './TableHeaderRow'
import TableRow from './TableRow'
import TableSort from './TableSort'

export interface TableProps extends ComponentPropsWithoutRef<'table'> {}

const Table = ({ children, ...restProps }: TableProps): ReactElement => {
  return (
    <table className="inf-new-table" {...restProps}>
      {children}
    </table>
  )
}

export default Object.assign(Table, {
  Header: TableHeader,
  HeaderCell: TableHeaderCell,
  HeaderRow: TableHeaderRow,
  Body: TableBody,
  Cell: TableCell,
  Row: TableRow,
  FilterPopover: TableFilterPopover,
  Sort: TableSort
})
