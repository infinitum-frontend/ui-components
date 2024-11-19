// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { MouseEvent, ReactElement, useState } from 'react'
import { Column, ColumnMeta, Header } from '@tanstack/react-table'
import { ReactComponent as SearchIcon } from 'Icons/search.svg'
import TableHeaderFilterSelect from './TableHeaderFilterSelect'
import {
  TableColumnFilter,
  TableColumnFilterValue,
  TableFilterDateOption,
  TableFilterSelectOption,
  TableFilterType
} from 'Components/Table/types'
import { Space } from 'Components/Space'
import { Button } from 'Components/Button'
import { Input } from 'Components/Input'
import { Icon } from 'Components/Icon'
import NativeDatePicker from 'Components/DatePicker/components/NaviteDatePicker/NativeDatePicker'
import { Form } from 'Components/Form'
import './TableHeaderFilter.scss'
import useUpdateEffect from 'Hooks/useUpdateEffect'
import cn from 'classnames'
import TableFilterPopover, {
  TableFilterPopoverProps
} from '../TableFilterPopover'

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
  const { filterType = 'search', filterItems } =
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
  // const handleWrapperClick = (e: MouseEvent): void => {
  //   e.stopPropagation()
  //   setOpen((prev) => !prev)
  // }

  const applyFilter = (): void => {
    setOpen(false)
    onChange?.(filterValue, filterType, header.column)
  }

  const applyReset = (): void => {
    setOpen(false)
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

  // ==================== render ====================
  const selected = Boolean(filterState?.value)
  const dateFrom =
    (filterType === 'date' && (filterValue as TableFilterDateOption).from) || ''
  const dateTo =
    (filterType === 'date' && (filterValue as TableFilterDateOption).to) || ''

  const applyButtonText = filterType === 'search' ? 'Поиск' : 'Применить'

  const iconVariant: Record<
    TableFilterType,
    TableFilterPopoverProps['iconVariant']
  > = {
    search: 'search',
    date: 'date',
    select: 'filter'
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
            <Input
              prefix={
                <Icon size="medium" color="primary">
                  <SearchIcon />
                </Icon>
              }
              onChange={(value) => setFilterValue(value)}
              value={filterValue as string}
            />
          )}

          {/* одиночный селект */}
          {filterType === 'select' && (
            <TableHeaderFilterSelect
              onChange={handleFilterSelectChange}
              selected={filterValue as TableFilterSelectOption}
              items={filterItems}
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

          {filterType !== 'select' && (
            <Space direction="horizontal" gap="small">
              <Button type="submit" size="small" variant="primary">
                {applyButtonText}
              </Button>
              <Button
                size="small"
                variant="ghost"
                type="button"
                onClick={applyReset}
              >
                Сбросить
              </Button>
            </Space>
          )}
        </Form>
      </div>
    </TableFilterPopover>
  )
}

export default TableHeaderFilter
