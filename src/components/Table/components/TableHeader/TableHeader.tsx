import React, { ComponentPropsWithoutRef } from 'react'
import './TableHeader.scss'
import cn from 'classnames'

export interface TableHeaderProps extends ComponentPropsWithoutRef<'thead'> {
  className?: string
  sticky?: boolean
}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, sticky, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          'inf-table-header',
          {
            'inf-table-header--sticky': sticky
          },
          className
        )}
        {...props}
      >
        {children}
      </thead>
    )
  }
)

TableHeader.displayName = 'TableHeader'

export default TableHeader
