// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { ReactComponent as ArrowUpDownIcon } from 'Icons/arrow-up-down-sharp.svg'
import { ReactComponent as ArrowDownIcon } from 'Icons/arrow-down-sharp.svg'
import cn from 'classnames'
import './TableHeaderSort.scss'

export interface TableHeaderSortProps
  extends ComponentPropsWithoutRef<'button'> {
  active: boolean
  desc: boolean
  className?: string
}

const TableHeaderSort = ({
  active,
  desc,
  className,
  ...restProps
}: TableHeaderSortProps): ReactElement => {
  return (
    <button
      className={cn(
        'inf-table-header-sort',
        {
          'inf-table-header-sort--active': active
        },
        className
      )}
      {...restProps}
    >
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

export default TableHeaderSort
