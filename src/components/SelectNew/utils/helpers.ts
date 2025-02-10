import reactNodeToString from '~/src/utils/helpers'
import {
  FlattenOption,
  SelectOption,
  SelectOptionGroup,
  SelectOptions
} from './types'

export const getFilteredFlattenOptions = (
  options: FlattenOption[],
  filterValue: string
): SelectOption[] => {
  console.log('HEAVY: getFilteredFlattenOptions')
  // @ts-expect-error
  return options.filter((option) => {
    if (isGroupLabel(option)) {
      return false
    }
    // @ts-expect-error
    return filterOptionsFn(option, filterValue)
  })
}

/**
 * Фильтрация списка опций по строке поиска
 */
export const getFilteredGroupedOptions = (
  options: SelectOptions,
  filterValue: string
): SelectOptions => {
  console.log('HEAVY: getFilteredOptions')
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
  console.log('HEAVY: getFlattenOptions')
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

// ======= ЧЕРНОВИК =======

// import { produce } from 'immer'
// import reactNodeToString from '~/src/utils/helpers'
// import { SelectOption, SelectOptions, SelectValue } from '../types'

// /**
//  * Фильтрация списка опций по строке поиска
//  */
// export const filterOptions = (
//   options: SelectOptions,
//   filterValue: string
// ): SelectOptions => {
//   const filtered: SelectOptions = []

//   options.forEach((item) => {
//     const isGroup = 'options' in item

//     if (isGroup) {
//       // Фильтруем опции внутри группы
//       const filteredInGroup = item.options.filter((option) =>
//         filterOptionsFn(option, filterValue)
//       )
//       if (filteredInGroup.length) {
//         filtered.push({
//           label: item.label,
//           options: filteredInGroup
//         })
//       }
//     } else {
//       // Фильтруем обычную опцию
//       if (filterOptionsFn(item, filterValue)) {
//         filtered.push(item)
//       }
//     }
//   })

//   return filtered

//   // return produce(options, (draft) => {
//   //   draft = draft.filter((item) => {
//   //     const isGroup = 'options' in item

//   //     if (isGroup) {
//   //       // Фильтруем опции внутри группы
//   //       item.options = item.options.filter((option) =>
//   //         filterOptionsFn(option, filterValue)
//   //       )
//   //       // Сохраняем группу, если хотя бы одна опция прошла фильтрацию
//   //       return item.options.length > 0
//   //     } else {
//   //       // Фильтруем обычную опцию
//   //       return filterOptionsFn(item, filterValue)
//   //     }
//   //   })
//   // })
// }

// const filterOptionsFn = (
//   option: SelectOption,
//   filterValue: string
// ): boolean => {
//   const label =
//     typeof option.label === 'string'
//       ? option.label
//       : reactNodeToString(option.label)
//   return label.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
// }

// /**
//  * Получаем из списка опций с вложенными в группы опциями плоский список для более простого рендеринга в jsx
//  */
// export const getFlatOptionsForRender = (
//   options: SelectOptions
// ): Array<SelectOption | { isGroup: true; groupLabel: string }> => {
//   const flatList: Array<SelectOption | { isGroup: true; groupLabel: string }> =
//     []

//   options.forEach((item) => {
//     const isGroup = 'options' in item

//     if (isGroup) {
//       flatList.push(
//         ...[
//           {
//             isGroup: true,
//             groupLabel: item.label
//           },
//           ...item.options
//         ]
//       )
//     } else {
//       flatList.push(item)
//     }
//   })

//   return flatList
// }

// export const getFlatOptions = (options: SelectOptions): SelectOption[] => {
//   const flatList: SelectOption[] = []

//   options.forEach((item) => {
//     const isGroup = 'options' in item

//     if (isGroup) {
//       flatList.push(...item.options)
//     } else {
//       flatList.push(item)
//     }
//   })

//   return flatList
// }

// const checkHasSelectedValue = (value: SelectValue): boolean => {
//   if (Array.isArray(value)) {
//     return value.length > 0
//   }
//   if (typeof value === 'number') {
//     return Number.isInteger(value)
//   }
//   return Boolean(value)
// }

// export const getDisplayValue = (
//   options: SelectOption[],
//   value: SelectValue | SelectValue[]
// ): string => {
//   const hasValue = checkHasSelectedValue(value)

//   if (hasValue) {
//     if (Array.isArray(value)) {
//       return options
//         .filter((option) => value?.includes(option.value))
//         .map((option) => option.label)
//         .join(', ')
//     } else {
//       return String(options.find((option) => option.value === value)?.value)
//     }
//   } else {
//     return ''
//   }

//   // if (multiple) {
//   //   ;``
//   //   displayValue = options
//   //     .filter((option) => value?.includes(option.value))

//   //     .map((i) => i.label)
//   //     .join(', ')
//   // } else {
//   //   displayValue = getItemByValue(value as string | number, options)?.label
//   // }
// }
