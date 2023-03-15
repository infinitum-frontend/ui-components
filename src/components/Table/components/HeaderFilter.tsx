// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { MouseEvent, ReactElement, useState } from 'react'
import { Column, flexRender, Header } from '@tanstack/react-table'
import { Popover } from 'Components/Popover'
import Text from '../../Text/Text'
import { ReactComponent as FilterIcon } from 'Icons/bx-filter.svg'
import { ReactComponent as SelectedFilterIcon } from 'Icons/bx-filter-selected.svg'
import HeaderFilterInput from 'Components/Table/components/HeaderFilterInput'
import HeaderFilterSelect from 'Components/Table/components/HeaderFilterSelect'

const TableHeaderFilter = ({
  header,
  onChange
}: {
  header: Header<any, any>
  onChange: (value: string, column: Column<any>) => void
}): ReactElement => {
  // ==================== state ====================
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [displayValue, setDisplayValue] = useState('')

  // ==================== handlers ====================
  const handleWrapperClick = (e: MouseEvent, column: Column<any>): void => {
    e.stopPropagation()
    setOpen((prev) => !prev)
  }

  const handleOpenChange = (open: boolean): void => {
    setOpen(open)
  }

  const handleFilterChange = (value: string): void => {
    setOpen(false)
    setDisplayValue(value)
    onChange(value, header.column)
  }

  const handleDropdownItemClick = (item: string): void => {
    // TODO: добавить проброс кастомного текста
    const newValue = item === 'Все' ? '' : item
    handleFilterChange(newValue)
  }

  // ==================== render ====================
  const controlType = header.column.columnDef.meta?.filterType

  const items =
    controlType === 'select'
      ? Array.from(header.column.getFacetedUniqueValues().keys())
      : null
  items?.unshift('Все')

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      placement={'bottom-start'}
    >
      <Popover.Trigger>
        <div
          onClick={(e) => handleWrapperClick(e, header.column)}
          className={'inf-table-header__filter-wrapper'}
        >
          {displayValue ? (
            <>
              <Text tone={'default'} size={'small'}>
                {displayValue}
              </Text>
              <SelectedFilterIcon />
            </>
          ) : (
            <>
              <Text size={'small'}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Text>
              <FilterIcon />
            </>
          )}
        </div>
      </Popover.Trigger>
      <Popover.Content hasPadding={false}>
        {controlType === 'input' ? (
          <HeaderFilterInput
            onSubmit={handleFilterChange}
            value={value}
            onChange={(value) => setValue(value)}
          />
        ) : (
          <HeaderFilterSelect
            onChange={handleDropdownItemClick}
            items={items}
          />
        )}
      </Popover.Content>
    </Popover>
  )
}

export default TableHeaderFilter
