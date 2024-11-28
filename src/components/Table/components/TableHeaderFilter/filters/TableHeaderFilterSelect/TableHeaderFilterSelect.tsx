// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import Menu from 'Components/Menu/Menu'
import { TableFiltersOptions } from 'Components/Table/types'
// import { Button } from '~/src/components/Button'
import './TableHeaderFilterSelect.scss'
import { SelectOption } from '~/src/components/Select'

interface TableHeaderFilterSelectProps {
  onChange: (item: any) => void
  options?: TableFiltersOptions
  selected: SelectOption
}

const TableHeaderFilterSelect = ({
  selected,
  options = [],
  onChange
}: TableHeaderFilterSelectProps): ReactElement => {
  return (
    <div className="inf-table-header-filter-select">
      <Menu maxHeight={340}>
        {options?.map((option) => {
          // сгруппированные опции
          if ('options' in option) {
            return (
              <>
                {/* TODO: типизация и уникальность ключей */}
                {/* @ts-expect-error */}
                <Menu.Label key={option.label}>{option.label}</Menu.Label>
                {/* @ts-expect-error */}
                {option.options.map((o) => (
                  <Menu.Item
                    key={o.value}
                    onClick={() => onChange(o)}
                    active={
                      selected.value !== '-1' && o.value === selected.value
                    }
                  >
                    {o.label}
                  </Menu.Item>
                ))}
              </>
            )
          }
          // опции без группы
          return (
            <Menu.Item
              key={option.value}
              onClick={() => onChange(option)}
              active={
                selected.value !== '-1' && option.value === selected.value
              }
            >
              {option.label}
            </Menu.Item>
          )
        })}
      </Menu>

      {/* <div className="inf-table-header-filter-select__bottom">
        <Button variant="primary" size="small">
          Применить
        </Button>
        <Button variant="ghost" size="small">
          Сбросить
        </Button>
      </div> */}
    </div>
  )
}

export default TableHeaderFilterSelect
