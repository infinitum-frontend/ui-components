import { ComponentPropsWithoutRef, ReactElement } from 'react'

export interface TableHeaderProps extends ComponentPropsWithoutRef<'thead'> {}

const TableHeader = ({ children }: TableHeaderProps): ReactElement => {
  return <thead className="inf-new-table-header">{children}</thead>
}

export default TableHeader
