// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ReactNode } from 'react'
import Menu from 'Components/Menu/Menu'
import { TableFiltersOptions, TableSelectOption } from 'Components/Table/types'
import { ReactComponent as IconTick } from 'Icons/tick.svg'
import { Icon } from 'Components/Icon'
import './TableHeaderFilterSelect.scss'

interface TableHeaderFilterSelectProps {
  onChange: (item: any) => void
  options?: TableFiltersOptions
  selected: TableSelectOption
}

const MenuItemContent = ({
  label,
  active
}: {
  label: string | ReactNode
  active: boolean
}): ReactElement => {
  return (
    <>
      <Menu.Item.Content>{label}</Menu.Item.Content>
      {active && (
        <Menu.Item.Button>
          <Icon color="secondary">
            <IconTick />
          </Icon>
        </Menu.Item.Button>
      )}
    </>
  )
}

const TableHeaderFilterSelect = ({
  selected,
  options = [],
  onChange
}: TableHeaderFilterSelectProps): ReactElement => {
  const isChecked = (
    selectedValue: string | number,
    optionValue: string | number
  ): boolean => {
    return selectedValue !== '-1' && optionValue === selectedValue
  }

  return (
    <div className="inf-table-header-filter-select">
      <Menu className="inf-table-header-filter-select__menu" maxHeight={340}>
        {options?.map((option) => {
          // сгруппированные опции
          if ('options' in option) {
            return (
              <>
                {/* TODO: типизация и уникальность ключей */}
                <Menu.Label key={option.label}>{option.label}</Menu.Label>
                {option.options.map((o) => (
                  <Menu.Item key={o.value} onClick={() => onChange(o)}>
                    <MenuItemContent
                      label={o.label}
                      active={isChecked(selected.value, o.value)}
                    />
                  </Menu.Item>
                ))}
              </>
            )
          }
          // опции без группы
          return (
            <Menu.Item key={option.value} onClick={() => onChange(option)}>
              <MenuItemContent
                label={option.label}
                active={isChecked(selected.value, option.value)}
              />
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
}

export default TableHeaderFilterSelect
