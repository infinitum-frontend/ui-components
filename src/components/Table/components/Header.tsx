import { MouseEvent, ReactElement } from 'react'
import { Column, flexRender, Table } from '@tanstack/react-table'
import cn from 'classnames'
import TableHeaderFilter from './HeaderFilter'
import TableHeaderSort from 'Components/Table/components/HeaderSort'
import '../style/header.scss'

export interface TableHeaderProps {
  table: Table<any>
  withSorting?: boolean
  withFiltering?: boolean
  onFiltersChange?: (value: string, column: Column<any>) => void
}

const TableHeader = ({
  table,
  withSorting = false,
  withFiltering = false,
  onFiltersChange
}: TableHeaderProps): ReactElement => {
  const handleColumnClick = (e: MouseEvent, column: Column<any>): void => {
    if (withSorting) {
      column.getToggleSortingHandler()?.call({}, e)
    }
  }

  const handleFilterChange: (value: string, column: Column<any>) => void = (
    value,
    column
  ) => {
    onFiltersChange?.(value, column)
  }

  const canSort = (column: Column<any>): boolean => {
    return withSorting && column.getCanSort()
  }

  const canFilter = (column: Column<any>): boolean => {
    return withFiltering && column.getCanFilter()
  }

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{
                // обработка ширины столбцов
                width:
                  header.column.columnDef.size === 150
                    ? 'auto'
                    : `${header.getSize()}%`
              }}
            >
              {header.isPlaceholder ? null : (
                <div
                  onClick={(e) => handleColumnClick(e, header.column)}
                  className={cn('inf-table-header', {
                    'inf-table-header--interactive':
                      canSort(header.column) || canFilter(header.column)
                  })}
                >
                  {canFilter(header.column) ? (
                    <TableHeaderFilter
                      header={header}
                      onChange={handleFilterChange}
                    />
                  ) : (
                    <div className={'inf-table-header__wrapper'}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {canSort(header.column) && (
                        <TableHeaderSort header={header} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

export default TableHeader
