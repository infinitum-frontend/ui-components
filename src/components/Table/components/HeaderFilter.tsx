// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { MouseEvent, ReactElement, useEffect, useState } from 'react'
import { Column, ColumnMeta, Header } from '@tanstack/react-table'
import { Popover } from 'Components/Popover'
import { ReactComponent as FilterIcon } from 'Icons/bx-filter.svg'
import { ReactComponent as SelectedFilterIcon } from 'Icons/bx-filter-selected.svg'
import HeaderFilterSelect from 'Components/Table/components/HeaderFilterSelect'
import {
  ColumnFilter,
  ColumnFilterValue,
  FilterDateOption,
  FilterSelectOption,
  FilterType
} from 'Components/Table'
import Space from 'Components/Space/Space'
import Button from '../../Button/Button'
import Input from '../../Input/Input'
import NativeDatePicker from 'Components/DatePicker/NativeDatePicker'
import Form from 'Components/Form/components/Form'
import '../style/header-filter.scss'
import useUpdateEffect from 'Hooks/useUpdateEffect'

// TODO: filter default value
const getInitialValue = (
  type: FilterType,
  state?: ColumnFilter<FilterType>
): ColumnFilterValue => {
  if (state) {
    return state.value
  }

  switch (type) {
    case 'input':
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
  filterState?: ColumnFilter<any>
  onChange: (
    value: ColumnFilterValue,
    filterType: ColumnMeta<any, any>['filterType'],
    column: Column<any>
  ) => void
}): ReactElement => {
  const { filterType = 'input', filterItems } =
    header.column.columnDef.meta || {}
  // ==================== state ====================
  const [open, setOpen] = useState(false)
  const [filterValue, setFilterValue] = useState<ColumnFilterValue>(
    getInitialValue(filterType, filterState)
  )

  useUpdateEffect(() => {
    setFilterValue(filterState?.value || getInitialValue(filterType))
  }, [filterState])

  // ==================== handlers ====================
  const handleWrapperClick = (e: MouseEvent): void => {
    e.stopPropagation()
    setOpen((prev) => !prev)
  }

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
      const result = { ...(prev as FilterDateOption) }
      result[type] = value

      return result
    })
  }

  const handleFilterSelectChange = (item: FilterSelectOption): void => {
    setOpen(false)
    setFilterValue(item)

    // TODO: а как работать с типом "все"? пока такой костыль, что ожидаем элемента со значением -1
    const value = item.value === '-1' ? undefined : item
    onChange?.(value, filterType, header.column)
  }

  // ==================== render ====================
  const selected = Boolean(filterState?.value)
  const dateFrom =
    (filterType === 'date' && (filterValue as FilterDateOption).from) || ''
  const dateTo =
    (filterType === 'date' && (filterValue as FilterDateOption).to) || ''

  return (
    <Popover
      open={open}
      onOpenChange={(value) => setOpen(value)}
      placement={'bottom-start'}
    >
      <Popover.Trigger>
        <span
          onClick={(e) => handleWrapperClick(e)}
          className={'inf-table-header-filter__wrapper'}
        >
          {selected ? (
            <SelectedFilterIcon className="inf-table-header-filter__icon" />
          ) : (
            <FilterIcon className="inf-table-header-filter__icon" />
          )}
        </span>
      </Popover.Trigger>
      <Popover.Content
        hasPadding={false}
        className="inf-table-header-filter__content"
      >
        <Form onSubmit={applyFilter}>
          {/* Инпут */}
          {filterType === 'input' && (
            <Input
              allowClear={true}
              onInput={(value) => setFilterValue(value)}
              value={filterValue as string}
            />
          )}

          {/* одиночный селект */}
          {filterType === 'select' && (
            <HeaderFilterSelect
              onChange={handleFilterSelectChange}
              selected={filterValue as FilterSelectOption}
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
            <Space
              direction={'horizontal'}
              justify={'space-between'}
              gap={'xsmall'}
            >
              <Button
                type={'submit'}
                size={'small'}
                variant={'secondary'}
                block
              >
                Применить
              </Button>
              <Button
                size={'small'}
                variant={'tertiary'}
                block
                onClick={applyReset}
              >
                Сбросить
              </Button>
            </Space>
          )}
        </Form>
      </Popover.Content>
    </Popover>
  )
}

export default TableHeaderFilter
