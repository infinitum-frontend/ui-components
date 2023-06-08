import { Header } from '@tanstack/react-table'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import { ReactComponent as SortIcon } from 'Icons/sort.svg'

// TODO: manual sorting
const TableHeaderSort = ({
  header
}: {
  header: Header<any, any>
}): ReactElement => {
  return (
    <span>
      {{
        asc: <SortIcon style={{ transform: 'rotate(180deg)' }} />,
        desc: <SortIcon />
      }[header.column.getIsSorted() as string] ?? (
        <SortIcon className={'inf-table-header__sort-icon'} />
      )}
    </span>
  )
}

export default TableHeaderSort