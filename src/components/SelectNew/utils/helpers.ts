import { reactNodeToString } from '~/src/utils/helpers'
import {
  FlattenOption,
  SelectOption,
  SelectOptionGroup,
  SelectOptions
} from './types'

// TODO: поправить типы, убрать @ts-expect-error

export const getFilteredFlattenOptions = (
  options: FlattenOption[],
  filterValue: string
): SelectOption[] => {
  // @ts-expect-error
  return options.filter((option) => {
    if (isGroupLabel(option)) {
      return false
    }
    // @ts-expect-error
    return filterOptionsFn(option, filterValue)
  })
}

export const getFilteredGroupedOptions = (
  options: SelectOptions,
  filterValue: string
): SelectOptions => {
  const filtered: SelectOptions = []

  options.forEach((item) => {
    const isGroup = isGroupOption(item)

    if (isGroup) {
      // Фильтруем опции внутри группы
      // @ts-expect-error
      const filteredInGroup = item.options.filter((option) =>
        filterOptionsFn(option, filterValue)
      )
      if (filteredInGroup.length) {
        filtered.push({
          label: item.label,
          options: filteredInGroup
        })
      }
    } else {
      // Фильтруем обычную опцию
      // @ts-expect-error
      if (filterOptionsFn(item, filterValue)) {
        filtered.push(item)
      }
    }
  })

  return filtered
}

const filterOptionsFn = (
  option: SelectOption,
  filterValue: string
): boolean => {
  const label =
    typeof option.label === 'string'
      ? option.label
      : reactNodeToString(option.label)
  return label.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
}

export const getFlattenOptions = (options: SelectOptions): FlattenOption[] => {
  const flatList: FlattenOption[] = []

  options.forEach((item) => {
    const isGroup = 'options' in item

    if (isGroup) {
      flatList.push(
        ...[
          {
            groupLabel: item.label
          },
          ...item.options
        ]
      )
    } else {
      flatList.push(item)
    }
  })

  return flatList
}

export const isGroupLabel = (option: FlattenOption): boolean => {
  return 'groupLabel' in option
}

export const isGroupOption = (
  option: SelectOption | SelectOptionGroup
): boolean => {
  return 'options' in option
}
