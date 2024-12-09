// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { Table, TableRow, TableColumnFiltersState } from './index'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import { Text } from '../Text'
import { Portfolio, TABLE_DATA, TYPE_FILTER_ITEMS } from './fixtures'
import { Button } from '../Button'
import { Space } from '../Space'
import { Checkbox } from '../Checkbox'
import { Input } from '../Input'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
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

export default meta

export const Base: StoryObj<typeof Table> = {
  render: (args) => {
    return <Table {...args} columns={columns} rows={TABLE_DATA} />
  }
}

export const Selection: StoryObj<typeof Table> = {
  render: (args) => {
    const [selection, setSelection] = useState<Array<TableRow<Portfolio>>>([])
    const handleChange = (data: Array<TableRow<Portfolio>>): void => {
      setSelection(data)
      console.log(data)
    }

    return (
      <Space>
        <Table
          withRowSelection={true}
          onChangeRowSelection={handleChange}
          selectionState={selection}
          columns={columns}
          rows={TABLE_DATA}
        />
        <Text>Выбранные ряды: {selection.map((item) => item.id)}</Text>
        <Button onClick={() => handleChange([])}>Сбросить</Button>
      </Space>
    )
  }
}

export const WithSelectedRow: StoryObj<typeof Table> = {
  render: (args) => {
    const [selected, setSelected] = useState('')

    const handleRowClick = (row: TableRow<any>): void => {
      console.log(row)
      setSelected(row.id)
    }

    return (
      <Space>
        <Table
          columns={columns}
          selectedRow={selected}
          onRowClick={handleRowClick}
          rows={TABLE_DATA}
        />
        <Text>Выбранный ряд: {selected}</Text>
      </Space>
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
      <Space>
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
      </Space>
    )
  }
}

const longPortfolioRows: Portfolio[] = []

for (let i = 0; i < 300; i++) {
  longPortfolioRows.push({
    portfolio: `Портфель ${i + 1}`,
    mark: `Марк ${i + 1}`,
    type: `Тип ${i + 1}`,
    status: `Active`
  })
}

// TODO: описать в Documentation.mdx
export const Filtering: StoryObj<typeof Table> = {
  render: (args) => {
    const defaultSorting = [{ id: 'status', desc: false }]
    const [sortedItems, setSortedItems] = useState(TABLE_DATA)
    const [sorting, setSorting] = useState(defaultSorting)
    const [filters, setFilters] = useState<TableColumnFiltersState>([])

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

    const handleFiltersChange = (state: TableColumnFiltersState): void => {
      let result = TABLE_DATA

      setFilters(state)

      state.forEach((filter) => {
        result = result.filter((item) => {
          const value = item[filter.id]
          if (filter.id === 'portfolio' && filter.filterType === 'search') {
            return value.toLowerCase().match(filter.value.toLowerCase())
          }
          if (filter.id === 'type' && filter.filterType === 'select') {
            return filter.value.value === '-1'
              ? true
              : value === filter.value.label
          }
          if (filter.id === 'status' && filter.filterType === 'multiSelect') {
            const selectedValues = filter.value.map((v) => v.label)
            return selectedValues.includes(value)
          }
          if (filter.id === 'date' && filter.filterType === 'date') {
            console.log('v', filter.value, value)
            return filter.value === value
          }

          return true
        })
      })

      setSortedItems(result)
    }
    return (
      <div>
        <Button
          style={{ marginBottom: '20px' }}
          onClick={() => {
            setFilters([])
            setSortedItems(TABLE_DATA)
          }}
        >
          Сбросить фильтры
        </Button>
        <Table
          {...args}
          withFiltering
          withFiltersTags
          onFiltersChange={handleFiltersChange}
          filtersState={filters}
          withSorting
          sortingState={sorting}
          onSortingChange={handleSortingChange}
          columns={columns}
          rows={sortedItems}
        />
      </div>
    )
  }
}

export const Scrollable: StoryObj<typeof Table> = {
  render: (args) => {
    const [search, setSearch] = useState('')

    const filteredData = longPortfolioRows.filter((a) =>
      a.portfolio.match(search)
    )

    return (
      <Space style={{ height: '100%' }}>
        <Input value={search} onChange={setSearch} />

        <Table
          {...args}
          columns={columns}
          rows={filteredData}
          maxHeight={400}
          stickyHeader
        />
      </Space>
    )
  }
}

export const VirtualizedRows: StoryObj<typeof Table> = {
  render: (args) => {
    const [search, setSearch] = useState('')

    const filteredData = longPortfolioRows.filter((a) =>
      a.portfolio.match(search)
    )

    return (
      <Space style={{ height: '100%' }}>
        <Input value={search} onChange={setSearch} />

        <Table
          {...args}
          columns={columns}
          rows={filteredData}
          maxHeight={400}
          stickyHeader
          virtualized
          estimateRowHeight={157}
        />
      </Space>
    )
  }
}

export const Empty: StoryObj<typeof Table> = {
  render: (args) => {
    const [search, setSearch] = useState('qwerqwer')

    const filteredData = TABLE_DATA.filter((a) => a.portfolio.match(search))

    return (
      <Space fullHeight>
        <Input value={search} onChange={setSearch} />

        <Table {...args} columns={columns} rows={filteredData} />
      </Space>
    )
  },
  args: {
    emptyMessage: 'Поиск не дал результатов'
  }
}

export const Resizing: StoryObj<typeof Table> = {
  render: (args) => {
    return <Table resizeMode={'onChange'} columns={columns} rows={TABLE_DATA} />
  }
}

const getDefaultColumnsVisibility = (): Record<string, boolean> => {
  const result: Record<string, boolean> = {}
  columns.forEach((column) => {
    result[column.id as string] = true
  })

  return result
}

export const ColumnVisibility: StoryObj<typeof Table> = {
  render: (args) => {
    const [columnVisibility, setColumnVisibility] = useState(
      getDefaultColumnsVisibility()
    )
    return (
      <Space>
        <Space direction="horizontal">
          {columns.map((column) => (
            <Checkbox
              key={column.id}
              checked={columnVisibility[column.id]}
              onChange={(value) =>
                setColumnVisibility((prev) => ({
                  ...prev,
                  [column.id as string]: value
                }))
              }
            >
              {column.header as string}
            </Checkbox>
          ))}
        </Space>
        <Table
          columns={columns}
          rows={TABLE_DATA}
          columnVisibility={columnVisibility}
        />
      </Space>
    )
  }
}
