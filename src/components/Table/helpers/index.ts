import { Column, Row, SortingState } from '@tanstack/react-table'
import { ReactElement } from 'react'
import { TableRow } from 'Components/Table/types'

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

// маппим данные ряда из формата танстака к нашему формату
export function mapRowToExternalFormat(row: Row<any>): TableRow<any> {
  return {
    id: row.id,
    rowData: row.original
  }
}

export function getNextSorting(
  sortingState: SortingState,
  column: Column<any, unknown>
): [{ id: string; desc: boolean }] | [] {
  if (sortingState.length === 0 || sortingState[0].id !== column.id) {
    return [{ id: column.id, desc: true }]
  } else if (sortingState[0].id === column.id && sortingState[0].desc) {
    return [{ id: column.id, desc: false }]
  } else {
    return []
  }
}
