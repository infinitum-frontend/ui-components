import { ReactElement } from 'react'
import { Menu } from '~/src/components/Menu'
import {
  FlattenOption,
  SelectOption as SelectOptionType
} from '../../utils/types'
import SelectOption from '../SelectOption'

interface SelectOptionsProps {
  options: FlattenOption[]
  checkOptionSelection: (option: SelectOptionType) => boolean
  onSelect: (option: SelectOptionType) => void
  multiple?: boolean
}

const SelectOptions = ({
  options,
  checkOptionSelection,
  multiple,
  onSelect
}: SelectOptionsProps): ReactElement => {
  return options.length > 0 ? (
    <Menu>
      {options.map((option, index) => {
        return 'groupLabel' in option ? ( // TODO : использовать хелпер isGroupLabel
          <Menu.Label key={index}>{option.groupLabel}</Menu.Label>
        ) : (
          <SelectOption
            key={index}
            selected={checkOptionSelection(option)}
            selectionIndicator={multiple ? 'checkbox' : 'tick'}
            onSelect={() => {
              console.log('onSelect', option)
              onSelect(option)
            }}
          >
            {option.label}
          </SelectOption>
        )
      })}
    </Menu>
  ) : (
    <div>Ничего не найдено</div>
  )
}

export default SelectOptions
