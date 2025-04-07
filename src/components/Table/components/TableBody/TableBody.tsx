import React, { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'

export interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {
  className?: string
}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody ref={ref} className={cn('inf-table-body', className)} {...props}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

export default TableBody
