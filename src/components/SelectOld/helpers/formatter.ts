import { produce } from 'immer'
import {
  DefaultSelectOption,
  SelectDataFormatterOptions,
  SelectOption
} from '../types'

type ResultElement<T> = DefaultSelectOption | SelectOption<T>

/**
 * Хелпер для форматирования массива к формату опций компонента Select
 */

function selectDataFormatter<T extends Record<string, any>>(
  options: SelectDataFormatterOptions<T>
): DefaultSelectOption[]

function selectDataFormatter<T extends Record<string, any>>(
  options: SelectDataFormatterOptions<T>,
  rest?: boolean
): Array<SelectOption<T>>

function selectDataFormatter<T extends Record<string, any>>(
  options: SelectDataFormatterOptions<T>,
  rest?: boolean
): Array<ResultElement<T>> {
  const { array, value, label } = options

  function checkErrors(item: T, index: number): void {
    if (item[value] === undefined) {
      console.error(
        `Отстутсвует ключ ${value as string}. Индекс элемента ${index}`
      )
    }

    if (item[label] === undefined) {
      console.error(
        `Отстутсвует ключ ${label as string}. Индекс элемента ${index}`
      )
    }
  }

  return array.reduce<Array<ResultElement<T>>>(
    (accumulator, currentValue, index) => {
      checkErrors(currentValue, index)

      if (rest) {
        accumulator.push({
          value: currentValue[value],
          label: currentValue[label],
          ...produce(currentValue, (draft) => draft)
        })
      } else {
        accumulator.push({
          value: currentValue[value],
          label: currentValue[label]
        })
      }

      return accumulator
    },
    []
  )
}

export default selectDataFormatter
