// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import Menu from 'Components/Menu/Menu'
import {
  TableFilterSelectValue,
  TableFiltersOptions
} from 'Components/Table/types'
import { Button } from 'Components/Button'
import { Checkbox } from 'Components/Checkbox'
import { checkIsValueExists } from '~/src/utils/helpers'
import './TableHeaderFilterMultiSelect.scss'

interface TableHeaderFilterMultiSelectProps {
  options?: TableFiltersOptions
  checkedList: TableFilterSelectValue[]
  onChange: (checkedList: TableFilterSelectValue[]) => void
  onReset: () => void
}

const TableHeaderFilterMultiSelect = ({
  checkedList,
  options = [],
  onChange,
  onReset
}: TableHeaderFilterMultiSelectProps): ReactElement => {
  const handleChange = (
    checked: Boolean,
    value: TableFilterSelectValue
  ): void => {
    let newState: TableFilterSelectValue[]
    if (checked) {
      newState = [...checkedList, value]
    } else {
      newState = checkedList.filter((i) => i !== value)
    }

    onChange?.(newState)
  }

  return (
    <div className="inf-table-header-filter-multi-select">
      <Menu maxHeight={280}>
        {options?.map((option) => {
          // сгруппированные опции
          if ('options' in option) {
            return (
              <>
                <Menu.Label key={option.label}>{option.label}</Menu.Label>
                {option.options.map((o) => (
                  <Menu.Item as="label" key={o.value}>
                    <Menu.Item.Icon>
                      <Checkbox
                        className="inf-combobox__checkbox"
                        checked={checkIsValueExists(
                          checkedList.find((i) => i === o.value)
                        )}
                        onChange={(checked) => handleChange(checked, o.value)}
                      />
                    </Menu.Item.Icon>
                    <Menu.Item.Content>{o.label}</Menu.Item.Content>
                  </Menu.Item>
                ))}
              </>
            )
          }
          // опции без группы
          return (
            <Menu.Item as="label" key={option.value}>
              <Menu.Item.Icon>
                <Checkbox
                  className="inf-combobox__checkbox"
                  checked={checkIsValueExists(
                    checkedList.find((i) => i === option.value)
                  )}
                  onChange={(checked) => handleChange(checked, option.value)}
                />
              </Menu.Item.Icon>
              <Menu.Item.Content>{option.label}</Menu.Item.Content>
            </Menu.Item>
          )
        })}
      </Menu>

      <div className="inf-table-header-filter-multi-select__bottom">
        <Button type="submit" variant="primary" size="small">
          Применить
        </Button>
        <Button type="button" variant="ghost" size="small" onClick={onReset}>
          Сбросить
        </Button>
      </div>
    </div>
  )
}

export default TableHeaderFilterMultiSelect
