import { StoryFn, Meta } from '@storybook/react'
import { Table } from './index'
import { ColumnDef, OnChangeFn, RowSelectionState } from '@tanstack/react-table'

const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table
}

interface Portfolio {
  portfolio: string
  mark: string
  type: string
  status: string
}
const columns: Array<ColumnDef<Portfolio>> = [
  {
    header: 'Портфель',
    id: 'portfolio',
    accessorKey: 'portfolio'
  },
  {
    header: 'Показатель',
    id: 'mark',
    accessorKey: 'mark'
  },
  {
    header: 'Тип',
    id: 'type',
    accessorKey: 'type'
  },
  {
    header: 'Статус',
    id: 'status',
    accessorKey: 'status'
  }
]
const data: Portfolio[] = [
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

export default meta

export const Base: StoryFn<typeof Table> = (args) => {
  return <Table {...args} columns={columns} data={data} />
}

export const WithSelection: StoryFn<typeof Table> = (args) => {
  const handleChange: OnChangeFn<RowSelectionState> = (data) => {
    console.log('handleChange', data)
  }
  return (
    <Table
      columns={columns}
      data={data}
      withRowSelection={true}
      onChangeRowSelection={handleChange}
    />
  )
}

export const WithGroupSeparators: StoryFn<typeof Table> = (args) => {
  const groupedByDate = [
    {
      date: '25.01 Среда',
      subRows: [
        {
          portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
          mark: '2335',
          type: 'УВНР',
          status: 'Сформировано'
        }
      ]
    },
    {
      date: '22.01 Воскресенье',
      subRows: [
        {
          portfolio: 'ОПИФ И Открытие — ИММВБ — высокая капитализация',
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
    },
    {
      date: '24.01 Вторник',
      subRows: [
        {
          portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
          mark: '2206',
          type: 'УВУН',
          status: 'Сформировано'
        }
      ]
    }
  ]
  return <Table columns={columns} data={groupedByDate} enableGrouping={true} />
}
