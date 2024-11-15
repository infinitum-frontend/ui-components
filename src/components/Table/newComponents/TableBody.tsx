import { ComponentPropsWithoutRef, ReactElement } from 'react'

export interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {}

const TableBody = ({ children }: TableBodyProps): ReactElement => {
  return <tbody className="inf-new-table-body">{children}</tbody>
}

export default TableBody
