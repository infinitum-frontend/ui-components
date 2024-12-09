// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { Table, TableColumnDef, TableRow } from './index'
import { SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import { Text } from '../Text'
import { Portfolio, TABLE_DATA } from './fixtures'
import { Button } from '../Button'
import { Space } from '../Space'
import { Checkbox } from '../Checkbox'
import { Input } from '../Input'
import { Label } from '../Label'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  args: {
    resizeMode: undefined
  }
}

const columns: Array<TableColumnDef<Portfolio, any>> = [
  {
    header: 'Портфель',
    id: 'portfolio',
    cell: (context) => {
      return (
        <div>
          <Text>{context.row.original.portfolio}</Text>
        </div>
      )
    },
    enableSorting: true
  },
  {
    header: 'Показатель',
    id: 'mark',
    accessorKey: 'mark',
    enableSorting: true
  },
  {
    header: 'Тип',
    id: 'type',
    accessorKey: 'type',
    enableSorting: true
  },
  {
    header: 'Статус',
    id: 'status',
    cell: (context) => {
      return (
        <Space>
          <Label variant="success">{context.row.original.status}</Label>
          <Label variant="success">{context.row.original.status}</Label>
          <Label variant="success">{context.row.original.status}</Label>
        </Space>
      )
    },
    enableSorting: true
  },
  {
    header: 'Дата',
    id: 'date',
    accessorKey: 'date',
    enableSorting: true
  },
  {
    header: 'Скрытая видимость колонки',
    id: 'hidden',
    accessorKey: 'hidden',
    enableSorting: true,
    isHidden: true
  }
]

export default meta

export const Base: StoryObj<typeof Table> = {
  render: (args) => {
    return <Table {...args} columns={columns} rows={TABLE_DATA} />
  }
}

// export const Filtering: StoryObj<typeof Table> = {
//   render: (args) => {
//     const [filters, setFilters] = useState<TableColumnFiltersState>([
//       {
//         id: 'date',
//         filterType: 'date',
//         value: {
//           from: new Date(),
//           to: new Date()
//         }
//       }
//     ])
//
//     const [resData, setResData] = useState(TABLE_DATA)
//
//     const handleFiltersChange = (state: TableColumnFiltersState): void => {
//       let result = TABLE_DATA
//       setFilters(state)
//       state.forEach((filter) => {
//         result = result.filter((item) => {
//           if (filter.filterType === 'select') {
//             const filterLabel = (filter as TableColumnFilter<'select'>).value
//               .label
//             if (filterLabel === 'Все типы') {
//               return true
//             }
//             return Boolean(
//               item[filter.id as keyof typeof item].match(filterLabel)
//             )
//           }
//
//           if (filter.filterType === 'input') {
//             return Boolean(
//               item[filter.id as keyof typeof item].match(filter.value as string)
//             )
//           }
//
//           return false
//         })
//       })
//
//       setResData(result)
//     }
//     return (
//       <div>
//         <Button
//           style={{ marginBottom: '20px' }}
//           onClick={() => {
//             setFilters([])
//             setResData(TABLE_DATA)
//           }}
//         >
//           Сбросить фильтры
//         </Button>
//         <Table
//           {...args}
//           withFiltering
//           withSorting
//           onFiltersChange={handleFiltersChange}
//           filtersState={filters}
//           columns={columns}
//           rows={resData}
//         />
//       </div>
//     )
//   }
// }

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
          {columns
            .filter((column) => !column.isHidden)
            .map((column) => (
              <Checkbox
                key={column.id}
                // @ts-expect-error
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

const longPortfolioRows: Portfolio[] = []

for (let i = 0; i < 300; i++) {
  longPortfolioRows.push({
    portfolio: `Портфель ${i + 1}`,
    mark: `Марк ${i + 1}`,
    type: `Тип ${i + 1}`,
    status: `Active`
  })
}

export const Scrollable: StoryObj<typeof Table> = {
  render: (args) => {
    const [search, setSearch] = useState('')

    return (
      <Space style={{ height: '100%' }}>
        <Input value={search} onChange={setSearch} />

        <Table
          {...args}
          columns={columns}
          maxHeight={400}
          rows={longPortfolioRows.filter((a) => a.portfolio.match(search))}
          estimateRowHeight={157}
          scrollable
        />
      </Space>
    )
  }
}
