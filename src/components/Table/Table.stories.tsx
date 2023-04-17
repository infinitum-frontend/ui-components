import { StoryObj, Meta } from '@storybook/react'
import { Table, ColumnFiltersState, ColumnFilter } from './index'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import { Text } from '../Text'
import { Row, SelectionStateItem } from './components/Table'
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

export const Base: StoryObj<typeof Table> = {
  render: (args) => {
    return <Table {...args} columns={columns} rows={TABLE_DATA} />
  }
}

export const Filtering: StoryObj<typeof Table> = {
  render: (args) => {
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
}

export const Selection: StoryObj<typeof Table> = {
  render: (args) => {
    const [selection, setSelection] = useState<SelectionStateItem[]>([])
    const handleChange = (data: SelectionStateItem[]): void => {
      setSelection(data)
      console.log(data)
    }

    return (
      <>
        <Table
          withRowSelection={true}
          onChangeRowSelection={handleChange}
          selectionState={selection}
          columns={columns}
          rows={TABLE_DATA}
        />
        <Text>Выбранные ряды: {selection.map((item) => item.id)}</Text>
        <Button onClick={() => handleChange([])}>Сбросить</Button>
      </>
    )
  }
}

export const WithSelectedRow: StoryObj<typeof Table> = {
  render: (args) => {
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
  },

  args: {
    selectedRow: '3'
  }
}

export const WithSorting: StoryObj<typeof Table> = {
  render: (args) => {
    const defaultSorting = [{ id: 'status', desc: false }]
    const [sortedItems, setSortedItems] = useState(TABLE_DATA)
    const [sorting, setSorting] = useState(defaultSorting)

    const handleSortingChange = (state: SortingState): void => {
      setSorting(state)
      if (!state.length) {
        setSortedItems([...TABLE_DATA])
      } else {
        setSortedItems(
          [...TABLE_DATA].sort((a, b) => {
            const { id, desc } = state[0]

            const compareResult = a[id as keyof Portfolio].localeCompare(
              b[id as keyof Portfolio]
            )
            return desc ? -compareResult : compareResult
          })
        )
      }
    }

    return (
      <>
        <Table
          withSorting
          sortingState={sorting}
          onSortingChange={handleSortingChange}
          columns={columns}
          rows={sortedItems}
        />
        <Button
          onClick={() => {
            handleSortingChange([])
          }}
        >
          Сброс сортировки
        </Button>
      </>
    )
  }
}

export const Resizing: StoryObj<typeof Table> = {
  render: (args) => {
    return <Table resizeMode={'onChange'} columns={columns} rows={TABLE_DATA} />
  }
}
