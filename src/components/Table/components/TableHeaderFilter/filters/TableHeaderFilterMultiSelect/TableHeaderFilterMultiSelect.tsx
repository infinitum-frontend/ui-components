// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import Menu from 'Components/Menu/Menu'
import { TableFiltersOptions } from 'Components/Table/types'
import { Button } from 'Components/Button'
import { Checkbox } from 'Components/Checkbox'
import { checkIsValueExists } from '~/src/utils/helpers'
import './TableHeaderFilterMultiSelect.scss'
import { SelectOption } from '~/src/components/Select'

interface TableHeaderFilterMultiSelectProps {
  options?: TableFiltersOptions
  selectedOptions: SelectOption[]
  onChange: (selectedOptions: SelectOption[]) => void
  onReset: () => void
}

const MenuItem = ({
  option,
  selectedOptions,
  onChange,
  ...props
}: {
  option: SelectOption
  selectedOptions: TableHeaderFilterMultiSelectProps['selectedOptions']
  onChange: (checked: boolean, option: SelectOption) => void
}): ReactElement => {
  return (
    <Menu.Item as="label" {...props}>
      <Menu.Item.Icon>
        <Checkbox
          className="inf-combobox__checkbox"
          checked={checkIsValueExists(
            selectedOptions.find((i) => i.value === option.value)
          )}
          onChange={(checked) => onChange(checked, option)}
        />
      </Menu.Item.Icon>
      <Menu.Item.Content>{option.label}</Menu.Item.Content>
    </Menu.Item>
  )
}

const TableHeaderFilterMultiSelect = ({
  selectedOptions,
  options = [],
  onChange,
  onReset
}: TableHeaderFilterMultiSelectProps): ReactElement => {
  const handleChange = (checked: Boolean, option: SelectOption): void => {
    let newState: SelectOption[]

    if (checked) {
      newState = [...selectedOptions, option]
    } else {
      newState = selectedOptions.filter((opt) => opt.value !== option.value)
    }

    onChange?.(newState)
  }

  return (
    <div className="inf-table-header-filter-multi-select">
      <Menu
        className="inf-table-header-filter-multi-select__menu"
        maxHeight={340}
      >
        {/* TODO: ключи не уникальны */}
        {options?.map((option, index) => {
          // сгруппированные опции
          if ('options' in option) {
            return (
              <>
                <Menu.Label data-key={index} key={index}>
                  {option.label}
                </Menu.Label>
                {/* TODO: */}
                {/* @ts-expect-error */}
                {option.options.map((o) => (
                  <MenuItem
                    data-key={`${String(index)}-${o.value as string}`}
                    key={`${String(index)}-${o.value as string}`}
                    option={o}
                    selectedOptions={selectedOptions}
                    onChange={handleChange}
                  />
                ))}
              </>
            )
          }
          // опции без группы
          return (
            <MenuItem
              data-key={`${String(index)}-${option.value as string}`}
              key={`${String(index)}-${option.value as string}`}
              option={option}
              selectedOptions={selectedOptions}
              onChange={handleChange}
            />
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
