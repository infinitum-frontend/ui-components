// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import Menu from 'Components/Menu/components/Menu'
import { FilterSelectOption } from 'Components/Table'

export interface HeaderFilterSelectProps {
  onChange: (item: any) => void
  items?: FilterSelectOption[]
  selected: FilterSelectOption
}

const HeaderFilterSelect = ({
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

export default HeaderFilterSelect
