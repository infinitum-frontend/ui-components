// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import Menu from 'Components/Menu/components/Menu'

export interface HeaderFilterSelectProps {
  onChange: (item: any) => void
  items: any[] | null
}

const HeaderFilterSelect = ({
  items = [],
  onChange
}: HeaderFilterSelectProps): ReactElement => {
  return (
    <Menu>
      {items?.map((item, index) => (
        <Menu.Item key={index} onClick={() => onChange(item)}>
          {item}
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default HeaderFilterSelect
