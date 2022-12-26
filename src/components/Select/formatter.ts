import { StandardizedListItemDefault, StandardizedListItem, FormatterOptions } from './interface'

type ResultElement<T extends Record<string, T[keyof T]>> = StandardizedListItemDefault | StandardizedListItem<T>

function selectDataFormatter<T extends Record<string, T[keyof T]>>(options: FormatterOptions<T>): StandardizedListItemDefault[] | Array<StandardizedListItem<T>> {
  const standardizedArray: Array<ResultElement<T>> = []

  const { array, text, value, subtext, rest } = options

  const arrayCopy: T[] = JSON.parse(JSON.stringify(array))

  function checkErrors(item: T, index: number): void {
    if (!item[text] || typeof item.text !== 'string') {
      console.error(`Отстутсвует ключ text или данный ключ имеет неподходящий формат. Индекс элемента ${index}`)
    }

    if (!item[value] || typeof item.value !== 'number') {
      console.error(`Отстутсвует ключ value или данный ключ имеет неподходящий формат. Индекс элемента ${index}`)
    }
  }

  if (arrayCopy) {
    arrayCopy.forEach((item, index) => {
      checkErrors(item, index)
      let standardizedElement: ResultElement<T> = {
        text: String(item[text]),
        value: item[value] as number,
        subtext: subtext ? String(item[subtext]) : ''
      }

      // Если передан параметр rest, удаляем дублирующиеся поля и добавляем все остальные
      if (rest) {
        /* eslint-disable @typescript-eslint/no-dynamic-delete */
        delete item[text]
        delete item[value]
        subtext && delete item[subtext]
        standardizedElement = { ...standardizedElement, ...item }
      }
      standardizedArray.push(standardizedElement as StandardizedListItem<T>)
    })
  }

  return rest ? standardizedArray as Array<StandardizedListItem<T>> : standardizedArray as StandardizedListItemDefault[]
}

export default selectDataFormatter
