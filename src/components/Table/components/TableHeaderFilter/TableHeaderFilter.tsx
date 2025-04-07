// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { CSSProperties, ReactElement, useState } from 'react'
import { Column } from '@tanstack/react-table'
import {
  TableColumnFilter,
  TableFilterType,
  TableSelectOption
} from 'Components/Table/types'
import { Form } from 'Components/Form'
import useUpdateEffect from 'Hooks/useUpdateEffect'
import cn from 'classnames'
import TableFilterPopover, {
  TableFilterPopoverProps
} from '../TableFilterPopover'
import TableHeaderFilterSearch from './filters/TableHeaderFilterSearch'
import TableHeaderFilterSelect from './filters/TableHeaderFilterSelect'
import TableHeaderFilterMultiSelect from './filters/TableHeaderFilterMultiSelect'
import TableHeaderFilterDate from './filters/TableHeaderFilterDate'
import { defaultSelectItem } from '~/src/components/Select'
import './TableHeaderFilter.scss'

// TODO: filter default value
const getInitialValue = (
  type: TableColumnFilter['filterType'],
  state?: TableColumnFilter
): TableColumnFilter['value'] => {
  if (state) {
    return state.value
  }

  switch (type) {
    case 'search':
    case 'date':
      return ''
    case 'select':
      return defaultSelectItem
    case 'multiSelect':
      return []
  }
}

const TableHeaderFilter = ({
  column,
  filterState,
  onChange
}: {
  column: Column<any>
  filterState?: TableColumnFilter
  onChange: (
    value: TableColumnFilter['value'] | undefined,
    filterType: TableColumnFilter['filterType'],
    column: Column<any>
  ) => void
}): ReactElement => {
  const {
    filterType = 'search',
    filterOptions,
    filterPopoverWidth
  } = column.columnDef.meta || {}
  // ==================== state ====================
  const [filterValue, setFilterValue] = useState<TableColumnFilter['value']>(
    getInitialValue(filterType, filterState)
  )

  const [isOpen, setOpen] = useState(false)

  useUpdateEffect(() => {
    setFilterValue(filterState?.value || getInitialValue(filterType))
  }, [filterState])

  // ==================== handlers ====================

  const applyFilter = (): void => {
    setOpen(false)
    onChange?.(filterValue, filterType, column)
  }

  const applyReset = (): void => {
    setOpen(false)
    setFilterValue(getInitialValue(filterType))
    onChange?.(undefined, filterType, column)
  }

  // const setDateFilter = (value: string, type: 'from' | 'to'): void => {
  //   setFilterValue((prev) => {
  //     const result = { ...(prev as TableFilterDateOption) }
  //     result[type] = value

  //     return result
  //   })
  // }

  const handleFilterSelectChange = (item: TableSelectOption): void => {
    setOpen(false)
    setFilterValue(item)

    // TODO: а как работать с типом "все"? пока такой костыль, что ожидаем элемента со значением -1
    const value = item.value === -1 ? undefined : item
    onChange?.(value, filterType, column)
  }

  const handleFilterMultiSelectChange = (
    selectedOptions: TableSelectOption[]
  ): void => {
    setFilterValue(selectedOptions)
  }

  // ==================== render ====================
  const selected = Boolean(filterState?.value)
  // const dateFrom =
  //   (filterType === 'date' && (filterValue as TableFilterDateOption).from) || ''
  // const dateTo =
  //   (filterType === 'date' && (filterValue as TableFilterDateOption).to) || ''

  const iconVariant: Record<
    TableColumnFilter['filterType'],
    TableFilterPopoverProps['iconVariant']
  > = {
    search: 'search',
    date: 'date',
    select: 'filter',
    multiSelect: 'filter'
  }

  const defaultPopoverWidth: Record<TableFilterType, CSSProperties['width']> = {
    search: '300px',
    date: '264px',
    select: '300px',
    multiSelect: '300px'
  }

  return (
    <TableFilterPopover
      isTriggerActive={selected}
      iconVariant={iconVariant[filterType]}
      open={isOpen}
      popoverWidth={filterPopoverWidth || defaultPopoverWidth[filterType]}
      onOpenChange={(value) => {
        setOpen(value)
      }}
    >
      <div
        className={cn(
          'inf-table-header-filter__content',
          `inf-table-header-filter__content--${filterType}`
        )}
      >
        <Form onSubmit={applyFilter} gap="small">
          {/* Поиск */}
          {filterType === 'search' && (
            <TableHeaderFilterSearch
              onChange={(value) => setFilterValue(value)}
              value={filterValue as string} // TODO:
              onReset={applyReset}
            />
          )}

          {/* одиночный селект */}
          {filterType === 'select' && (
            <TableHeaderFilterSelect
              onChange={handleFilterSelectChange}
              selected={filterValue as TableSelectOption} // TODO:
              options={filterOptions}
            />
          )}

          {/* одиночный селект */}
          {filterType === 'multiSelect' && (
            <TableHeaderFilterMultiSelect
              onChange={handleFilterMultiSelectChange}
              selectedOptions={filterValue as TableSelectOption[]} // TODO:
              options={filterOptions}
              onReset={applyReset}
            />
          )}

          {/* дата */}
          {filterType === 'date' && (
            <TableHeaderFilterDate
              value={filterValue as string} // TODO:
              onChange={(value) => setFilterValue(value)}
              onReset={applyReset}
            />
          )}

          {/* TODO: дата от-до */}
          {/* {filterType === 'dateRange' && (
            <>
              <NativeDatePicker
                value={dateFrom}
                onChange={(value) => setDateFilter(value, 'from')}
                max={dateTo}
              />
              <NativeDatePicker
                value={dateTo}
                onChange={(value) => setDateFilter(value, 'to')}
                min={dateFrom}
              />
            </>
          )} */}
        </Form>
      </div>
    </TableFilterPopover>
  )
}

export default TableHeaderFilter
