import { Header, SortingState } from '@tanstack/react-table'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { ReactComponent as SortIcon } from 'Icons/sort.svg'

// TODO: manual sorting
const TableHeaderSort = ({
  header,
  sortingState
}: {
  header: Header<any, any>
  sortingState: SortingState
}): ReactElement => {
  return (
    <span className="inf-table-header__sort">
      {sortingState.length !== 0 && header.column.id === sortingState[0].id ? (
        sortingState[0].desc ? (
          <SortIcon />
        ) : (
          <SortIcon style={{ transform: 'rotate(180deg)' }} />
        )
      ) : (
        <SortIcon className={'inf-table-header__sort-icon'} />
      )}
    </span>
  )
}

export default TableHeaderSort
