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
import TableHeaderFilter from '../TableHeaderFilter'
import TableHeaderSort from '../TableHeaderSort'
import TableHeaderCell from '../TableHeaderCell'
import TableHeaderRow from '../TableHeaderRow'

import {
  TableColumnFiltersState,
  TableColumnFilterValue,
  TableVerticalAlignValue
} from 'Components/Table/types'
import { getNextSorting } from '../../helpers'
import './TableHeader.scss'

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
  filterTags?: string[]
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
  sticky,
  filterTags
}: TableHeaderProps): ReactElement => {
  const canSort = (column: Column<any>): boolean => {
    return withSorting && Boolean(column.columnDef.enableSorting)
  }

  const handleColumnClick = (e: MouseEvent, column: Column<any>): void => {
    if (canSort(column)) {
      onSortingChange(getNextSorting(sortingState, column.id))
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
        <TableHeaderRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHeaderCell
              interactive={canSort(header.column)}
              key={header.id}
              colSpan={header.colSpan}
              style={{
                // обработка ширины столбцов
                width: header.getSize()
              }}
              onClick={(e) => handleColumnClick(e, header.column)}
            >
              {header.isPlaceholder ? null : (
                <>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {canSort(header.column) && (
                    <TableHeaderSort
                      active={
                        sortingState.length !== 0 &&
                        header.column.id === sortingState[0].id
                      }
                      desc={sortingState[0]?.desc}
                    />
                  )}
                  {canFilter(header.column) && (
                    <TableHeaderFilter
                      header={header}
                      filterState={filtersState.find(
                        (filter) => filter.id === header.column.id
                      )}
                      onChange={handleFilterChange}
                    />
                  )}
                </>
              )}
            </TableHeaderCell>
          ))}
        </TableHeaderRow>
      ))}
    </thead>
  )
}

export default TableHeader
