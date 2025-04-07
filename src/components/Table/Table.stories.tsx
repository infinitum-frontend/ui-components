// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StoryObj, Meta } from '@storybook/react'
import { Table, TableRow, TableColumnFiltersState } from './index'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import { Text } from '../Text'
import {
  Portfolio,
  TABLE_COLUMNS,
  TABLE_DATA,
  TYPE_FILTER_ITEMS
} from './fixtures'
import { Button } from '../Button'
import { Space } from '../Space'
import { Checkbox } from '../Checkbox'
import { Input } from '../Input'
import { Form } from '../Form'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  args: {
    resizeMode: undefined
  }
}

export default meta

export const Base: StoryObj<typeof Table> = {
  render: (args) => {
    return <Table {...args} columns={TABLE_COLUMNS} rows={TABLE_DATA} />
  }
}

export const Selection: StoryObj<typeof Table> = {
  render: (args) => {
    const [rows, setRows] = useState(TABLE_DATA)
    const [selection, setSelection] = useState<Array<TableRow<Portfolio>>>([])
    const [filters, setFilters] = useState<TableColumnFiltersState>([])
    const handleChange = (data: Array<TableRow<Portfolio>>): void => {
      console.log(data)
      setSelection(data)
    }

    const handleFiltersChange = (filters: TableColumnFiltersState): void => {
      const portfolioFilter = filters.find((f) => f.id === 'portfolio')

      if (portfolioFilter) {
        setRows(
          TABLE_DATA.filter((row) => {
            return row.portfolio
              .toLowerCase()
              .match((portfolioFilter.value as string)?.toLocaleLowerCase())
          })
        )
      } else {
        setRows(TABLE_DATA)
      }

      setFilters(filters)
    }

    return (
      <Space>
        <Table
          withRowSelection={true}
          onChangeRowSelection={handleChange}
          selectionState={selection}
          withFiltering
          filtersState={filters}
          getRowId={(row) => row.portfolio}
          withFiltersTags
          onFiltersChange={handleFiltersChange}
          columns={TABLE_COLUMNS}
          rows={rows}
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

    const handleRowClick = (row: TableRow<Portfolio>): void => {
      console.log(row.rowData)
      setSelected(row.id)
    }

    return (
      <Space>
        <Table<Portfolio>
          columns={TABLE_COLUMNS}
          selectedRow={selected}
          onRowClick={(row) => {
            handleRowClick(row)
          }}
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
          columns={TABLE_COLUMNS}
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
          columns={TABLE_COLUMNS}
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
          columns={TABLE_COLUMNS}
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
          columns={TABLE_COLUMNS}
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

        <Table {...args} columns={TABLE_COLUMNS} rows={filteredData} />
      </Space>
    )
  },
  args: {
    emptyMessage: 'Поиск не дал результатов'
  }
}

export const Resizing: StoryObj<typeof Table> = {
  render: (args) => {
    return (
      <Table
        resizeMode={'onChange'}
        columns={TABLE_COLUMNS}
        rows={TABLE_DATA}
      />
    )
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
          {TABLE_COLUMNS.map((column) => (
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
          columns={TABLE_COLUMNS}
          rows={TABLE_DATA}
          columnVisibility={columnVisibility}
        />
      </Space>
    )
  }
}

const columnsWithAction = [
  ...TABLE_COLUMNS,
  {
    id: 'actionButton',
    cell: () => (
      <Button variant="secondary" size="small">
        Action
      </Button>
    ),
    meta: {
      visibleOnRowHover: true
    }
  }
]

export const CellVisibleOnRowHover: StoryObj<typeof Table> = {
  render: (args) => {
    return (
      <Space>
        <Text>
          Содержимое колонки с кнопкой отображается только при наведении мыши на
          ряд таблицы. Нужно в конфиг колонки добавить meta.visibleOnRowHover =
          true
        </Text>

        <Table columns={columnsWithAction} rows={TABLE_DATA} />
      </Space>
    )
  }
}

const headerTextOverflowColumns = [
  {
    header: 'Ключ портфеля',
    accessorKey: 'key',
    meta: {
      filterType: 'search'
    },
    enableSorting: true
  },
  {
    header: 'Название портфеля',
    accessorKey: 'title',
    meta: {
      filterType: 'search'
    },
    enableSorting: true
  },
  {
    header: 'Вид СЦН',
    accessorKey: 'fundPurposeType',
    meta: {
      filterType: 'select',
      filterOptions: TYPE_FILTER_ITEMS
    },
    enableSorting: true
  },
  {
    header: 'Вид Портфеля',
    id: 'portfolioType',
    accessorKey: 'portfolioType',
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
    header: 'Дата начала',
    accessorKey: 'startDate',
    enableSorting: true
  },
  {
    header: 'Дата окончания',
    accessorKey: 'endDate',
    enableSorting: true
  },
  {
    header: 'Опердень открыт',
    accessorKey: 'openDate',
    enableSorting: true
  },
  {
    header: 'Запустите контрольную процедуру',
    accessorKey: 'startProcedureDate',
    enableSorting: true
  },
  {
    header: 'Заполните результаты',
    accessorKey: 'enterResultsDate',
    enableSorting: true
  },
  {
    header: 'Отправьте уведомления',
    accessorKey: 'notificationDate',
    enableSorting: true
  }
]

const portfolios = Array.from({ length: 15 }, () => ({
  key: Math.random().toString(36).substring(7), // случайная строка как ключ
  title: `Portfolio ${Math.floor(Math.random() * 1000)}`, // случайное название
  fundPurposeType: ['Investment', 'Savings', 'Pension'][
    Math.floor(Math.random() * 3)
  ], // случайный тип назначения фонда
  portfolioType: ['Private', 'Corporate', 'Government'][
    Math.floor(Math.random() * 3)
  ], // случайный тип портфеля
  startDate: getRandomDate(), // случайная дата начала
  endDate: getRandomDate(), // случайная дата окончания
  openDate: getRandomDate(), // случайная дата открытия
  startProcedureDate: getRandomDate(), // случайная дата начала процедуры
  enterResultsDate: getRandomDate(), // случайная дата ввода результатов
  notificationDate: getRandomDate() // случайная дата уведомления
}))

function getRandomDate(): string {
  const start = new Date(2020, 0, 1) // начальная дата
  const end = new Date(2024, 11, 31) // конечная дата
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
  return date.toISOString().split('T')[0] // возвращаем строку даты в формате YYYY-MM-DD
}

export const HeaderTextOverflow: StoryObj<typeof Table> = {
  render: (args) => {
    const defaultSorting = [{ id: 'status', desc: false }]
    const [sortedItems, setSortedItems] = useState(portfolios)
    const [sorting, setSorting] = useState(defaultSorting)
    const [filters, setFilters] = useState<TableColumnFiltersState>([])

    const handleSortingChange = (state: SortingState): void => {
      setSorting(state)
      setSortedItems([...portfolios])
    }

    const handleFiltersChange = (state: TableColumnFiltersState): void => {
      setFilters(state)
      setSortedItems(portfolios)
    }

    return (
      <div>
        <Table
          columns={headerTextOverflowColumns}
          withFiltering
          withFiltersTags
          onFiltersChange={handleFiltersChange}
          filtersState={filters}
          withSorting
          sortingState={sorting}
          onSortingChange={handleSortingChange}
          rows={sortedItems}
          withCollapsibleHeaderCellActions
          tableLayout="fixed"
        />
      </div>
    )
  }
}

interface CustomTableMeta {
  groupId: string
}

const columnsWithUsingMeta: Array<ColumnDef<Portfolio>> = [
  {
    header: 'Портфель',
    cell: (cell) => {
      const meta = cell.table.options.meta as CustomTableMeta
      return (
        <Text>
          {meta.groupId} {cell.row.original.portfolio}
        </Text>
      )
    }
  }
]
export const WithMeta: StoryObj<typeof Table> = {
  render: (args) => {
    const [groupId, setGroupId] = useState('')
    return (
      <Space>
        <Space direction="horizontal" align="center">
          <Form.Label>
            Изменить номер группы. Контекст будет передан во все ячейки таблицы
          </Form.Label>
          <Input value={groupId} onChange={setGroupId} />
        </Space>

        <Table
          {...args}
          columns={columnsWithUsingMeta}
          rows={TABLE_DATA}
          meta={{
            groupId
          }}
        />
      </Space>
    )
  }
}
