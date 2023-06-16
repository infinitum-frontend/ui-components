import { ReactElement, TableHTMLAttributes } from 'react'
import cn from 'classnames'

export interface TableBaseProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Отображение границ ячеек */
  bordered?: boolean
}

const TableBase = ({
  bordered,
  className,
  children,
  ...props
}: TableBaseProps): ReactElement => {
  return (
    <table
      className={cn('inf-table', className, {
        'inf-table--bordered': bordered
      })}
      {...props}
    >
      {children}
    </table>
  )
}

export default TableBase
