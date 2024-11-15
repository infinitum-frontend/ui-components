import { ComponentPropsWithoutRef, ReactElement } from 'react'

export interface TableHeaderRowProps extends ComponentPropsWithoutRef<'tr'> {}

const TableHeaderRow = ({ children }: TableHeaderRowProps): ReactElement => {
  return <tr className="inf-new-table-header-row">{children}</tr>
}

export default TableHeaderRow
