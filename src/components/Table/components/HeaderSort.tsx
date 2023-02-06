import { Header } from '@tanstack/react-table'
import { ReactElement } from 'react'
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
        asc: <SortIcon />,
        desc: <SortIcon style={{ transform: 'rotate(180deg)' }} />
      }[header.column.getIsSorted() as string] ?? (
        <SortIcon className={'inf-table-header__sort-icon'} />
      )}
    </span>
  )
}

export default TableHeaderSort
