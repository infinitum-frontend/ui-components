import {
  SelectOption,
  DefaultSelectOption,
  FormatterOptions
} from './interface'
import { ReactNode } from 'react'

type ResultElement<T extends Record<string, T[keyof T]>> =
  | DefaultSelectOption
  | SelectOption<T>

/**
 * Хелпер для форматирования массива к формату опций компонента Select
 * @param options
 */
function selectDataFormatter<
  T extends Record<string, T[keyof T]> = Record<string, any>
>(options: FormatterOptions<T>): SelectOption[] {
  const standardizedArray: Array<SelectOption<T>> = []

  const { array, label, value, rest } = options

  const arrayCopy: T[] = JSON.parse(JSON.stringify(array))

  function checkErrors(item: T, index: number): void {
    if (item[value] === undefined) {
      console.error(`Отстутсвует ключ ${value}. Индекс элемента ${index}`)
    }

    if (item[label] === undefined) {
      console.error(`Отстутсвует ключ ${label}. Индекс элемента ${index}`)
    }
  }

  if (arrayCopy) {
    arrayCopy.forEach((item, index) => {
      checkErrors(item, index)
      let standardizedElement: ResultElement<T> = {
        value: item[value] as string | number,
        label: item[label] as string | ReactNode
      }

      // Если передан параметр rest, удаляем дублирующиеся поля и добавляем все остальные
      if (rest) {
        /* eslint-disable @typescript-eslint/no-dynamic-delete */
        delete item[value]
        delete item[label]
        standardizedElement = { ...standardizedElement, ...item }
      }
      standardizedArray.push(standardizedElement as SelectOption<T>)
    })
  }

  return rest
    ? (standardizedArray as Array<ResultElement<T>>)
    : (standardizedArray as DefaultSelectOption[])
}

export default selectDataFormatter
