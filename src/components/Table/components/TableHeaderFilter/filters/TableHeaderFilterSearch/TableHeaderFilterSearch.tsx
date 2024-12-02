import { ReactElement } from 'react'
import { InputProps, Input } from '~/src/components/Input'
import { Icon } from '~/src/components/Icon'
import { Space } from '~/src/components/Space'
import { Button } from '~/src/components/Button'
import { ReactComponent as SearchIcon } from 'Icons/search.svg'
import './TableHeaderFilterSearch.scss'

interface TableHeaderFilterSearchProps {
  value: InputProps['value']
  onChange: InputProps['onChange']
  onReset: () => void
}

const TableHeaderFilterSearch = ({
  value,
  onChange,
  onReset
}: TableHeaderFilterSearchProps): ReactElement => {
  return (
    <Space className="inf-table-header-filter-search" gap="small">
      <Input
        size="small"
        prefix={
          <Icon size="medium" color="primary">
            <SearchIcon />
          </Icon>
        }
        onChange={onChange}
        value={value}
      />
      <Space direction="horizontal" gap="small">
        <Button type="submit" size="small" variant="primary">
          Поиск
        </Button>
        <Button size="small" variant="ghost" type="button" onClick={onReset}>
          Сбросить
        </Button>
      </Space>
    </Space>
  )
}

export default TableHeaderFilterSearch
