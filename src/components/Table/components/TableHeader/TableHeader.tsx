// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { CSSProperties, MouseEvent, ReactElement } from 'react'
import {
  Column,
  ColumnMeta,
  ColumnResizeMode,
  flexRender,
  SortingState,
  Table
} from '@tanstack/react-table'
import cn from 'classnames'
import TableHeaderFilter from './TableHeaderFilter'
import TableHeaderSort from './TableHeaderSort'
import './TableHeader.scss'
import {
  TableColumnFiltersState,
  TableColumnFilterValue,
  TableVerticalAlignValue
} from 'Components/Table/types'
import { getNextSorting } from '../../helpers'

interface TableHeaderProps {
  table: Table<any>
  withSorting?: boolean
  withFiltering?: boolean
  sortingState: SortingState
  onSortingChange: (state: SortingState) => void
  filtersState: TableColumnFiltersState
  onFiltersChange?: (
    value: TableColumnFilterValue,
    filterType: ColumnMeta<any, any>['filterType'],
    column: Column<any>
  ) => void
  resizeMode?: ColumnResizeMode
  verticalAlignHead?: TableVerticalAlignValue
  sticky?: boolean
}

const TableHeader = ({
  table,
  withSorting = false,
  withFiltering = false,
  sortingState = [],
  onSortingChange,
  filtersState = [],
  onFiltersChange,
  resizeMode,
  verticalAlignHead,
  sticky
}: TableHeaderProps): ReactElement => {
  const canSort = (column: Column<any>): boolean => {
    return withSorting && Boolean(column.columnDef.enableSorting)
  }

  const handleColumnClick = (e: MouseEvent, column: Column<any>): void => {
    if (canSort(column)) {
      onSortingChange(getNextSorting(sortingState, column))
    }
  }

  const handleFilterChange: (
    value: TableColumnFilterValue,
    filterType: ColumnMeta<any, any>['filterType'],
    column: Column<any>
  ) => void = (value, filterType, column) => {
    onFiltersChange?.(value, filterType, column)
  }

  const canFilter = (column: Column<any>): boolean => {
    return (
      withFiltering &&
      column.getCanFilter() &&
      Boolean(column.columnDef.meta?.filterType)
    )
  }

  return (
    <thead
      className={cn('inf-table-header', {
        [`inf-table-header--vertical-align-${verticalAlignHead as string}`]:
          verticalAlignHead,
        'inf-table-header--sticky': sticky
      })}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{
                // обработка ширины столбцов
                width: header.getSize()
              }}
            >
              {header.isPlaceholder ? null : (
                <>
                  <div
                    className={cn('inf-table-header__item', {
                      'inf-table-header__item--interactive': canSort(
                        header.column
                      )
                    })}
                  >
                    <span
                      className={'inf-table-header__wrapper'}
                      onClick={(e) => handleColumnClick(e, header.column)}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {canSort(header.column) && (
                        <TableHeaderSort
                          header={header}
                          sortingState={sortingState}
                        />
                      )}
                    </span>
                    {canFilter(header.column) && (
                      <TableHeaderFilter
                        header={header}
                        filterState={filtersState.find(
                          (filter) => filter.id === header.column.id
                        )}
                        onChange={handleFilterChange}
                      />
                    )}
                  </div>
                  {Boolean(resizeMode) && (
                    <div
                      className={cn('inf-table-header__resizer', {
                        'inf-table-header__resizer--active':
                          header.column.getIsResizing()
                      })}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      style={{
                        transform:
                          resizeMode === 'onEnd' &&
                          header.column.getIsResizing()
                            ? `translateX(${
                                table.getState().columnSizingInfo
                                  .deltaOffset as number
                              }px)`
                            : ''
                      }}
                    />
                  )}
                </>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

export default TableHeader
