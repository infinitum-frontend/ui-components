// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { MouseEvent, ReactElement, useState } from 'react'
import { Column, ColumnMeta, Header } from '@tanstack/react-table'
import {
  TableColumnFilter,
  TableColumnFilterValue,
  TableFilterDateOption,
  TableFilterSelectOption,
  TableFilterSelectValue,
  TableFilterType
} from 'Components/Table/types'
import NativeDatePicker from 'Components/DatePicker/components/NaviteDatePicker/NativeDatePicker'
import { Form } from 'Components/Form'
import useUpdateEffect from 'Hooks/useUpdateEffect'
import cn from 'classnames'
import TableFilterPopover, {
  TableFilterPopoverProps
} from '../TableFilterPopover'
import TableHeaderFilterSearch from './filters/TableHeaderFilterSearch'
import TableHeaderFilterSelect from './filters/TableHeaderFilterSelect'
import './TableHeaderFilter.scss'
import TableHeaderFilterMultiSelect from './filters/TableHeaderFilterMultiSelect'

// TODO: filter default value
const getInitialValue = (
  type: TableFilterType,
  state?: TableColumnFilter<TableFilterType>
): TableColumnFilterValue => {
  if (state) {
    return state.value
  }

  switch (type) {
    case 'search':
      return ''
    case 'select':
    case 'date':
      return {}
    case 'multiSelect':
      return []
  }
}

const TableHeaderFilter = ({
  header,
  filterState,
  onChange
}: {
  header: Header<any, any>
  filterState?: TableColumnFilter<any>
  onChange: (
    value: TableColumnFilterValue,
    filterType: ColumnMeta<any, any>['filterType'],
    column: Column<any>
  ) => void
}): ReactElement => {
  const { filterType = 'search', filterOptions } =
    header.column.columnDef.meta || {}
  // ==================== state ====================
  const [filterValue, setFilterValue] = useState<TableColumnFilterValue>(
    getInitialValue(filterType, filterState)
  )

  const [isOpen, setOpen] = useState(false)

  useUpdateEffect(() => {
    setFilterValue(filterState?.value || getInitialValue(filterType))
  }, [filterState])

  // ==================== handlers ====================

  const applyFilter = (): void => {
    setOpen(false)
    onChange?.(filterValue, filterType, header.column)
  }

  const applyReset = (): void => {
    setOpen(false)
    setFilterValue(getInitialValue(filterType))
    onChange?.(undefined, filterType, header.column)
  }

  const setDateFilter = (value: string, type: 'from' | 'to'): void => {
    setFilterValue((prev) => {
      const result = { ...(prev as TableFilterDateOption) }
      result[type] = value

      return result
    })
  }

  const handleFilterSelectChange = (item: TableFilterSelectOption): void => {
    setOpen(false)
    setFilterValue(item)

    // TODO: а как работать с типом "все"? пока такой костыль, что ожидаем элемента со значением -1
    const value = item.value === '-1' ? undefined : item
    onChange?.(value, filterType, header.column)
  }

  const handleFilterMultiSelectChange = (
    checkedList: TableFilterSelectValue[]
  ): void => {
    setFilterValue(checkedList)
  }

  // ==================== render ====================
  const selected = Boolean(filterState?.value)
  const dateFrom =
    (filterType === 'date' && (filterValue as TableFilterDateOption).from) || ''
  const dateTo =
    (filterType === 'date' && (filterValue as TableFilterDateOption).to) || ''

  // const applyButtonText = filterType === 'search' ? 'Поиск' : 'Применить'

  const iconVariant: Record<
    TableFilterType,
    TableFilterPopoverProps['iconVariant']
  > = {
    search: 'search',
    date: 'date',
    select: 'filter',
    multiSelect: 'filter'
  }

  return (
    <TableFilterPopover
      isTriggerActive={selected}
      iconVariant={iconVariant[filterType]}
      open={isOpen}
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
              value={filterValue as string}
              onReset={applyReset}
            />
          )}

          {/* одиночный селект */}
          {filterType === 'select' && (
            <TableHeaderFilterSelect
              onChange={handleFilterSelectChange}
              selected={filterValue as TableFilterSelectOption}
              options={filterOptions}
            />
          )}

          {/* одиночный селект */}
          {filterType === 'multiSelect' && (
            <TableHeaderFilterMultiSelect
              onChange={handleFilterMultiSelectChange}
              checkedList={filterValue as TableFilterSelectValue[]}
              options={filterOptions}
              onReset={applyReset}
            />
          )}

          {/* дата от-до */}
          {filterType === 'date' && (
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
          )}
        </Form>
      </div>
    </TableFilterPopover>
  )
}

export default TableHeaderFilter
