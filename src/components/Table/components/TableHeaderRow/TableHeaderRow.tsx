import { ComponentPropsWithoutRef, ReactElement } from 'react'
import './TableHeaderRow.scss'

export interface TableHeaderRowProps extends ComponentPropsWithoutRef<'tr'> {}

const TableHeaderRow = ({ children }: TableHeaderRowProps): ReactElement => {
  return <tr className="inf-table-header-row">{children}</tr>
}

export default TableHeaderRow
