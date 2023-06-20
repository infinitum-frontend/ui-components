// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import Menu from 'Components/Menu/Menu'
import { TableFilterSelectOption } from 'Components/Table/types'

interface HeaderFilterSelectProps {
  onChange: (item: any) => void
  items?: TableFilterSelectOption[]
  selected: TableFilterSelectOption
}

const TableHeaderFilterSelect = ({
  selected,
  items = [],
  onChange
}: HeaderFilterSelectProps): ReactElement => {
  return (
    <Menu>
      {items?.map((item) => (
        <Menu.Item
          key={item.value}
          onClick={() => onChange(item)}
          active={selected.value !== '-1' && item.value === selected.value}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default TableHeaderFilterSelect
