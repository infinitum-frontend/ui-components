import { ReactElement } from 'react'
import { TableBaseProps } from '../../types'
import cn from 'classnames'

const TableBase = ({
  className,
  children,
  ...props
}: TableBaseProps): ReactElement => {
  return (
    <table className={cn('inf-table', className)} {...props}>
      {children}
    </table>
  )
}

export default TableBase
