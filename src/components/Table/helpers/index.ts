import { Row } from '@tanstack/react-table'
import { ReactElement } from 'react'

// проверяем по наличию текста в реакт-элементе любой вложенности
// TODO: не работает вместе с группировкой
export function getByText(
  row: Row<any>,
  columnId: string,
  filterValue: string
): boolean {
  const element = row.original[columnId]
  return Boolean(findTextInElement(element, filterValue))
}

function findTextInElement(
  element: string | ReactElement | ReactElement[],
  value: string
): any {
  if (typeof element === 'string') {
    return element.toLowerCase().match(value?.toLowerCase())
  } else {
    if (Array.isArray(element)) {
      const result: any = []
      element.forEach((child) => {
        result.push(Boolean(findTextInElement(child.props.children, value)))
      })

      return result.filter(Boolean).length
    } else {
      const children = element.props.children
      return findTextInElement(children, value)
    }
  }
}
