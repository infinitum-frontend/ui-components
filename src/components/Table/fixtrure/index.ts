import { TableFilterSelectOption } from 'Components/Table'

export const TYPE_FILTER_ITEMS: TableFilterSelectOption[] = [
  {
    value: '-1',
    label: 'Все типы'
  },
  {
    value: '0',
    label: 'УВНР'
  },
  {
    value: '1',
    label: 'УВУН'
  },
  { value: '2', label: 'УВНУ' }
]
export interface Portfolio {
  portfolio: string
  mark: string
  type: string
  status: string
}
export const TABLE_DATA: Portfolio[] = [
  {
    portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
    mark: '2335',
    type: 'УВНР',
    status: 'Сформировано'
  },
  {
    portfolio: 'ОПИФ И Открытие — ИММВБ — высокая капитализация',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано'
  },
  {
    portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано'
  },
  {
    portfolio: 'ОПИФ И Открытие — ИММВБ — машиностроение',
    mark: '2206',
    type: 'УВНУ',
    status: 'На согласовании'
  }
]
