import { ReactElement } from 'react'
import { Menu } from '~/src/components/Menu'
import {
  FlattenOption,
  SelectOption as SelectOptionType
} from '../../utils/types'
import SelectOption from '../SelectOption'
import SelectEmpty from '../SelectEmpty'

interface SelectOptionsProps {
  options: FlattenOption[]
  checkOptionSelection: (option: SelectOptionType) => boolean
  onSelect: (option: SelectOptionType) => void
  multiple?: boolean
  maxItemsCount: number
}

const SelectOptions = ({
  options,
  checkOptionSelection,
  multiple,
  onSelect,
  maxItemsCount = 12
}: SelectOptionsProps): ReactElement => {
  const maxHeight = maxItemsCount * 32 + 4 + 2

  return options.length > 0 ? (
    <Menu maxHeight={maxHeight}>
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
    <SelectEmpty />
  )
}

export default SelectOptions
