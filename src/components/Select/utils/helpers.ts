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
  return options.reduce<SelectOptions>((acc, item) => {
    if ('options' in item) {
      const filteredInGroup = item.options.filter((option: SelectOption) =>
        filterOptionsFn(option, filterValue)
      )
      if (filteredInGroup.length) {
        acc.push({
          label: item.label,
          options: filteredInGroup
        })
      }
    } else if (filterOptionsFn(item, filterValue)) {
      acc.push(item)
    }
    return acc
  }, [])
}

const filterOptionsFn = (
  option: SelectOption,
  filterValue: string
): boolean => {
  const label =
    typeof option.label === 'string'
      ? option.label
      : reactNodeToString(option.label)

  const searchStr = filterValue.toLocaleLowerCase()
  const labelStr = label.toLocaleLowerCase()

  return labelStr.includes(searchStr)
}

export const getFlattenOptions = (options: SelectOptions): FlattenOption[] => {
  return options.flatMap((item) => {
    if ('options' in item) {
      return [{ groupLabel: item.label }, ...item.options]
    }
    return item
  })
}

export const isGroupLabel = (option: FlattenOption): boolean => {
  return 'groupLabel' in option
}

export const isGroupOption = (
  option: SelectOption | SelectOptionGroup
): boolean => {
  return 'options' in option
}
