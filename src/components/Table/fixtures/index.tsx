import { ColumnDef } from '@tanstack/react-table'
import { SelectOption } from '../../Select'
import { TableRowData } from '../types'
import { formatDateToISO } from '~/src/utils/date'
import { Button } from '../../Button'

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

export const TABLE_DATA_WITH_SUB_ROWS: Array<
  TableRowData<Portfolio & { subRows: Portfolio[] }>
> = [
  {
    portfolio: 'ОПИФ Открытие',
    mark: '2335',
    type: 'УВНР',
    status: 'Сформировано',
    date: '2024-10-31',
    subRows: [
      {
        portfolio: 'ОПИФ Открытие 1',
        mark: '2335',
        type: 'УВНР',
        status: 'Сформировано',
        date: '2024-10-31'
      },
      {
        portfolio: 'ОПИФ Открытие 2',
        mark: '2335',
        type: 'УВНР',
        status: 'Сформировано',
        date: '2024-10-31'
      }
    ]
  },
  {
    portfolio:
      'ЗПИФ И Открытие — ИММВБ — высокая капитализация ОПИФ И Открытие — ИММВБ — высокая капитализация ОПИФ И Открытие — ИММВБ — высокая капитализация ОПИФ И Открытие — ИММВБ — высокая капитализация',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано',
    date: '2024-10-31',
    subRows: [
      {
        portfolio: 'ЗПИФ И Открытие — ИММВБ — высокая капитализация 1',
        mark: '2335',
        type: 'УВУН',
        status: 'Сформировано',
        date: '2024-10-31'
      },
      {
        portfolio: 'ЗПИФ И Открытие — ИММВБ — высокая капитализация 2',
        mark: '2335',
        type: 'УВУН',
        status: 'Сформировано',
        date: '2024-10-31'
      }
    ]
  },
  {
    portfolio: 'Закрытие — Telecommunicaton Index',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано',
    date: '2020-01-01',
    subRows: [
      {
        portfolio: 'Закрытие — Telecommunicaton Index 1',
        mark: '2335',
        type: 'УВУН',
        status: 'Сформировано',
        date: '2024-10-31'
      },
      {
        portfolio: 'Закрытие — Telecommunicaton Index 2',
        mark: '2335',
        type: 'УВУН',
        status: 'Сформировано',
        date: '2024-10-31'
      }
    ]
  }
]

export const TABLE_COLUMNS_WITH_SUB_ROWS: Array<ColumnDef<Portfolio, any>> = [
  {
    header: 'Портфель',
    accessorKey: 'portfolio',

    cell: ({ row, getValue }) => {
      if (row.getCanExpand()) {
        return formatDateToISO(new Date(row.original.date as string))
      } else {
        return getValue()
      }
    }
  }
]

export const TABLE_COLUMNS_WITH_SUB_ROWS_COLLAPSIBLE: Array<
  ColumnDef<Portfolio, any>
> = [
  {
    header: 'Портфель',
    accessorKey: 'portfolio',

    cell: ({ row, getValue }) => {
      if (row.getCanExpand()) {
        return (
          <Button
            variant="secondary"
            size="small"
            onClick={row.getToggleExpandedHandler()}
          >
            {row.getIsExpanded() ? 'Свернуть' : 'Развернуть'}
          </Button>
        )
      } else {
        return getValue()
      }
    }
  }
]
