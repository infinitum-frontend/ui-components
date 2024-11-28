import { Header, SortingState } from '@tanstack/react-table'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { ReactComponent as ArrowUpDownIcon } from 'Icons/arrow-up-down-sharp.svg'
import { ReactComponent as ArrowDownIcon } from 'Icons/arrow-down-sharp.svg'
import './TableHeaderSort.scss'
import cn from 'classnames'

// TODO: manual sorting
const TableHeaderSort = ({
  header,
  sortingState,
  className
}: {
  header: Header<any, any>
  sortingState: SortingState
  className?: string
}): ReactElement => {
  return (
    <button className={cn('inf-table-header-sort', className)}>
      {sortingState.length !== 0 && header.column.id === sortingState[0].id ? (
        sortingState[0].desc ? (
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
