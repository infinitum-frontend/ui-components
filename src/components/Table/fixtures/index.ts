import { ColumnDef } from '@tanstack/react-table'
import { SelectOption } from '../../Select'

export const TYPE_FILTER_ITEMS: SelectOption[] = [
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
  date?: string
}

export const TABLE_DATA: Portfolio[] = [
  {
    portfolio: 'ОПИФ Открытие',
    mark: '2335',
    type: 'УВНР',
    status: 'Сформировано',
    date: '2024-10-31'
  },
  {
    portfolio:
      'ЗПИФ И Открытие — ИММВБ — высокая капитализация ОПИФ И Открытие — ИММВБ — высокая капитализация ОПИФ И Открытие — ИММВБ — высокая капитализация ОПИФ И Открытие — ИММВБ — высокая капитализация',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано'
  },
  {
    portfolio: 'Закрытие — Telecommunicaton Index',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано',
    date: '2020-01-01'
  },
  {
    portfolio: 'ЯРА И Открытие — ИММВБ — машиностроение',
    mark: '2206',
    type: 'УВНУ',
    status: 'На согласовании'
  }
]

export const TABLE_COLUMNS: Array<ColumnDef<Portfolio, any>> = [
  {
    header: 'Портфель',
    id: 'portfolio',
    accessorKey: 'portfolio',
    meta: {
      filterType: 'search'
    },
    enableSorting: true
  },
  {
    header: 'Показатель',
    id: 'mark',
    accessorKey: 'mark'
  },
  {
    header: 'Тип',
    id: 'type',
    accessorKey: 'type',
    meta: {
      filterType: 'select',
      filterOptions: TYPE_FILTER_ITEMS
    }
  },
  {
    header: 'Статус',
    id: 'status',
    accessorKey: 'status',
    meta: {
      filterType: 'multiSelect',
      filterOptions: [
        {
          value: '1',
          label: 'Сформировано'
        },
        {
          value: '2',
          label: 'На согласовании'
        }
      ]
    },
    enableSorting: true
  },
  {
    header: 'Дата',
    id: 'date',
    accessorKey: 'date',
    meta: {
      filterType: 'date'
    }
  }
]
