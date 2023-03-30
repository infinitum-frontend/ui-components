import { StoryFn, Meta } from '@storybook/react'
import { Table, ColumnFiltersState, ColumnFilter } from './index'
import {
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
  SortingState
} from '@tanstack/react-table'
import { useState } from 'react'
import { Text } from '../Text'
import { Row } from './components/Table'
import { Portfolio, TABLE_DATA, TYPE_FILTER_ITEMS } from './fixtrure'
import { Button } from '../Button'

const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,
  args: {
    resizeMode: undefined
  }
}

const columns: Array<ColumnDef<Portfolio, any>> = [
  {
    header: 'Портфель',
    id: 'portfolio',
    accessorKey: 'portfolio',
    // для рендеринга html
    // cell: info => info.getValue(),
    // для фильтрации по тексту по вложенным реакт-элементам
    // filterFn: 'elIncludesString',
    meta: {
      filterType: 'input'
    }
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
      filterItems: TYPE_FILTER_ITEMS
    }
  },
  {
    header: 'Статус',
    id: 'status',
    accessorKey: 'status',
    meta: {
      filterType: 'select'
    }
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

export default meta

export const Base: StoryFn<typeof Table> = (args) => {
  return <Table {...args} columns={columns} rows={TABLE_DATA} />
}

export const Filtering: StoryFn<typeof Table> = (args) => {
  const [filters, setFilters] = useState<ColumnFiltersState>([])
  const [resData, setResData] = useState(TABLE_DATA)

  const handleFiltersChange = (state: ColumnFiltersState): void => {
    let result = TABLE_DATA
    setFilters(state)
    state.forEach((filter) => {
      result = result.filter((item) => {
        if (filter.filterType === 'select') {
          const filterLabel = (filter as ColumnFilter<'select'>).value.label
          if (filterLabel === 'Все типы') {
            return true
          }
          return Boolean(
            item[filter.id as keyof typeof item].match(filterLabel)
          )
        }

        if (filter.filterType === 'input') {
          return Boolean(
            item[filter.id as keyof typeof item].match(filter.value as string)
          )
        }

        return false
      })
    })

    setResData(result)
  }
  return (
    <div>
      <Button
        onClick={() => {
          setFilters([])
          setResData(TABLE_DATA)
        }}
      >
        Сбросить фильтры
      </Button>
      <Table
        {...args}
        withFiltering
        withSorting
        onFiltersChange={handleFiltersChange}
        filtersState={filters}
        columns={columns}
        rows={resData}
      />
    </div>
  )
}

export const Selection: StoryFn<typeof Table> = (args) => {
  const [selected, setSelected] = useState<{}>({})
  const handleChange: OnChangeFn<RowSelectionState> = (data) => {
    setSelected(data)
  }

  return (
    <>
      <Table
        withRowSelection={true}
        onChangeRowSelection={handleChange}
        columns={columns}
        rows={TABLE_DATA}
      />
      <Text>Выбранные ряды: {Object.keys(selected)}</Text>
    </>
  )
}

export const WithSelectedRow: StoryFn<typeof Table> = (args) => {
  const [selected, setSelected] = useState(undefined)

  const handleRowClick = (row: Row<any>): void => {
    console.log(row)
    setSelected(row.id)
  }

  return (
    <>
      <Table
        columns={columns}
        selectedRow={selected}
        onRowClick={handleRowClick}
        rows={TABLE_DATA}
      />
      <Text>Выбранный ряд: {selected}</Text>
    </>
  )
}
WithSelectedRow.args = {
  selectedRow: '3'
}

export const WithSorting: StoryFn<typeof Table> = (args) => {
  const defaultSorting = [{ id: 'status', desc: false }]
  const [sortedItems, setSortedItems] = useState(TABLE_DATA)

  const handleSortingChange = (state: SortingState): void => {
    if (!state.length) {
      setSortedItems([...TABLE_DATA])
    } else {
      setSortedItems([
        ...TABLE_DATA.sort((a, b) => {
          const { id, desc } = state[0]

          const compareResult = a[id as keyof Portfolio].localeCompare(
            b[id as keyof Portfolio]
          )
          return desc ? compareResult : -compareResult
        })
      ])
    }
  }

  return (
    <Table
      withSorting
      defaultSorting={defaultSorting}
      onSortingChange={handleSortingChange}
      columns={columns}
      rows={sortedItems}
    />
  )
}

export const Resizing: StoryFn<typeof Table> = (args) => {
  return <Table resizeMode={'onChange'} columns={columns} rows={TABLE_DATA} />
}
// export const GroupSeparators: StoryFn<typeof Table> = (args) => {
//   const groupedByDate = [
//     {
//       row: '25.01 Среда',
//       subRows: [
//         {
//           portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
//           mark: '2335',
//           type: 'УВНР',
//           status: 'Сформировано'
//         }
//       ]
//     },
//     {
//       row: '22.01 Воскресенье',
//       subRows: [
//         {
//           portfolio: 'ОПИФ И Открытие — ИММВБ — высокая капитализация',
//           mark: '2206',
//           type: 'УВУН',
//           status: 'Сформировано'
//         },
//         {
//           portfolio: 'ОПИФ И Открытие — ИММВБ — машиностроение',
//           mark: '2206',
//           type: 'УВНУ',
//           status: 'На согласовании'
//         }
//       ]
//     },
//     {
//       row: '24.01 Вторник',
//       subRows: [
//         {
//           portfolio: 'ОПИФ Открытие — Telecommunicaton Index',
//           mark: '2206',
//           type: 'УВУН',
//           status: 'Сформировано'
//         }
//       ]
//     }
//   ]
//   return (
//     <Table
//       {...args}
//       columns={columns}
//       data={groupedByDate}
//       enableGrouping={true}
//     />
//   )
// }
