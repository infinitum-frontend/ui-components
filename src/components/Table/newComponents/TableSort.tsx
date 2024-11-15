// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { ReactComponent as ArrowUpDownIcon } from 'Icons/arrow-up-down-sharp.svg'
import { ReactComponent as ArrowDownIcon } from 'Icons/arrow-down-sharp.svg'
import cn from 'classnames'

export interface TableSortProps extends ComponentPropsWithoutRef<'button'> {
  active: boolean
  desc: boolean
  className?: string
}

const TableSort = ({
  active,
  desc,
  className,
  ...restProps
}: TableSortProps): ReactElement => {
  return (
    <button className={cn('inf-table-header-sort', className)} {...restProps}>
      {active ? (
        desc ? (
          <ArrowDownIcon className="inf-table-header-sort__icon inf-table-header-sort__icon--active" />
        ) : (
          <ArrowDownIcon className="inf-table-header-sort__icon inf-table-header-sort__icon--active inf-table-header-sort__icon--reversed" />
        )
      ) : (
        <ArrowUpDownIcon className="inf-table-header-sort__icon" />
      )}
    </button>
  )
}

export default TableSort
