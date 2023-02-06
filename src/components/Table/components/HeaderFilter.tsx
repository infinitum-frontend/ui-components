import { Column, flexRender, Header } from '@tanstack/react-table'
import { KeyboardEventHandler, MouseEvent, ReactElement, useState } from 'react'
import { Popover } from 'Components/Popover'
import Text from '../../Text/Text'
import { ReactComponent as FilterIcon } from 'Icons/bx-filter.svg'
import { ReactComponent as SelectedFilterIcon } from 'Icons/bx-filter-selected.svg'
import Input from '../../Input/Input'
import List from 'Components/List/components/List'

const TableHeaderFilter = ({
  header,
  onChange
}: {
  header: Header<any, any>
  onChange: (value: string, column: Column<any>) => void
}): ReactElement => {
  const controlType = header.column.columnDef.meta?.filterType

  const items =
    controlType === 'select'
      ? Array.from(header.column.getFacetedUniqueValues().keys())
      : null
  items?.unshift('Все')

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [displayValue, setDisplayValue] = useState('')
  const handleClick = (e: MouseEvent, column: Column<any>): void => {
    e.stopPropagation()
    setOpen((prev) => !prev)
  }

  const handleOpenChange = (open: boolean): void => {
    setOpen(open)
    setDisplayValue(value)
  }

  const handleInput = (val?: string): void => {
    if (!val) {
      setDisplayValue('')
    }
    setValue(val || '')
    onChange(val || '', header.column)
  }

  const handleClear = (): void => {
    setValue('')
    setDisplayValue('')
    setOpen(false)
    onChange('', header.column)
  }

  const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
    onChange(value, header.column)
    setOpen(false)
    setDisplayValue(value)
  }

  const handleDropdownItemClick = (item: string): void => {
    // TODO: добавить проброс кастомного текста
    const newValue = item === 'Все' ? '' : item
    setDisplayValue(newValue)
    setOpen(false)
    // header.column.setFilterValue(newValue)
    onChange(newValue, header.column)
  }

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      placement={'bottom-start'}
    >
      <Popover.Trigger>
        <div
          onClick={(e) => handleClick(e, header.column)}
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
          <Input
            allowClear={true}
            value={value}
            onInput={handleInput}
            onSubmit={handleSubmit}
            onClear={handleClear}
          />
        ) : (
          <List>
            {items?.map((item, index) => (
              <List.Item
                key={index}
                onClick={() => handleDropdownItemClick(item)}
              >
                {item}
              </List.Item>
            ))}
          </List>
        )}
      </Popover.Content>
    </Popover>
  )
}

export default TableHeaderFilter
