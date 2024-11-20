// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import {
  Table,
  TableRow,
  TableColumnFiltersState,
  getNextSorting
} from './index'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import { Text } from '../Text'
import {
  Portfolio,
  TABLE_DATA,
  TYPE_FILTER_ITEMS,
  NPF_RULES_TABLE_DATA,
  NpfRule
} from './fixtures'
import { Button } from '../Button'
import { Space } from '../Space'
import { Checkbox } from '../Checkbox'
import { Input } from '../Input'
// import { Table as Table, getNextSorting } from './newComponents'
// import { Label } from '../Label'

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
    // для рендеринга html
    // cell: info => info.getValue(),
    // для фильтрации по тексту по вложенным реакт-элементам
    // filterFn: 'elIncludesString',
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
        },
        {
          label: 'Остальные',
          options: [
            {
              value: '3',
              label: 'На согласовании 3'
            },
            {
              value: '4',
              label: 'На согласовании 4'
            },
            {
              value: '5',
              label: 'На согласовании 5'
            },
            {
              value: '6',
              label: 'На согласовании 6'
            },
            {
              value: '7',
              label: 'На согласовании 7'
            },
            {
              value: '8',
              label: 'На согласовании 8'
            }
          ]
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

export const CompoundComponents: StoryObj<typeof Table> = {
  render: (args) => {
    const columns = [
      'ID',
      'Название показателя',
      'Вид проверки',
      'Дата автоматизации',
      'Обязательное выполнение',
      'Портфели'
    ]
    const data = NPF_RULES_TABLE_DATA

    return (
      <Space>
        <Text>
          Использование Compound компонентов таблицы для кастомной верстки
        </Text>

        <Table {...args}>
          <Table.Header>
            <Table.HeaderRow>
              {columns.map((column) => (
                <Table.HeaderCell key={column}>{column}</Table.HeaderCell>
              ))}
            </Table.HeaderRow>
          </Table.Header>
          <Table.Body>
            {data.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.shortName}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell>{item.verificationAutomationDate}</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>{item.portfoliosCount}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Space>
    )
  }
}

export const WithCustomFilters: StoryObj<typeof Table> = {
  render: (args) => {
    const columns: Array<ColumnDef<NpfRule, any>> = React.useMemo(
      () => [
        {
          header: 'ID',
          accessorKey: 'id'
        },
        {
          header: 'Название показателя',
          accessorKey: 'shortName'
        },
        {
          header: 'Вид проверки',
          accessorKey: 'type'
        },
        {
          header: 'Дата автоматизации',
          id: 'verificationAutomationDate',
          accessorFn: (row) =>
            row.verificationAutomationDate
              ? row.verificationAutomationDate
              : 'Неавтоматизирован'
        },
        {
          header: 'Обязательное выполнение',
          id: 'mandatoryAutoAssignmentSettings',
          cell: (context) => {
            return <div>mandatoryAutoAssignmentSettings</div>
          }
        },
        {
          header: 'Портфели',
          accessorKey: 'portfoliosCount'
        }
      ],
      []
    )

    const [data, setData] = useState(NPF_RULES_TABLE_DATA)
    const [sortingState, setSortingState] = useState([
      { id: 'status', desc: false }
    ])

    const [portfolioSearch, setPortfolioSearch] = useState('')

    // const [columnFilters, setColumnFilters] =
    //   React.useState<ColumnFiltersState>([])

    const handleSortingChange = (columnId: string): void => {
      const newSortingState = getNextSorting(sortingState, columnId)

      setSortingState(newSortingState)

      if (!newSortingState.length) {
        setData([...NPF_RULES_TABLE_DATA])
      } else {
        setData(
          // TODO: сделать хелпер функцию
          [...NPF_RULES_TABLE_DATA].sort((a, b) => {
            const { id, desc } = newSortingState[0]

            const compareResult = a[id as keyof Portfolio].localeCompare(
              b[id as keyof Portfolio]
            )
            return desc ? -compareResult : compareResult
          })
        )
      }
    }

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        sorting: sortingState
      }
      // filterFns: {},
      // onColumnFiltersChange: setColumnFilters,
      // getSortedRowModel: getSortedRowModel(),
    })

    console.log('table', table.getHeaderGroups())

    return (
      <Table>
        <Table.Header>
          {table.getHeaderGroups().map(({ id, headers }) => (
            <Table.HeaderRow key={id}>
              {/* ID */}
              <Table.HeaderCell
                interactive
                onClick={() => handleSortingChange(headers[0].id)}
                width="100px"
                maxWidth="100px"
              >
                {flexRender(
                  headers[0].column.columnDef.header,
                  headers[0].getContext()
                )}
                <Table.HeaderSort
                  active={sortingState[0]?.id === headers[0].id}
                  desc={sortingState[0]?.desc}
                />
                <Table.FilterPopover
                  isTriggerActive={Boolean(portfolioSearch)}
                  popoverWidth="330px"
                >
                  <Input
                    value={portfolioSearch}
                    onChange={setPortfolioSearch}
                  />
                </Table.FilterPopover>
              </Table.HeaderCell>

              {/* Название показателя */}
              <Table.HeaderCell
                key={headers[1].id}
                width="100%"
                interactive
                onClick={() => handleSortingChange(headers[1].id)}
              >
                {flexRender(
                  headers[1].column.columnDef.header,
                  headers[1].getContext()
                )}
                <Table.HeaderSort
                  active={sortingState[0]?.id === headers[1].id}
                  desc={sortingState[0]?.desc}
                />
              </Table.HeaderCell>

              {/* Вид проверки */}
              <Table.HeaderCell
                key={headers[2].id}
                minWidth="200px"
                interactive
                onClick={() => handleSortingChange(headers[2].id)}
              >
                {flexRender(
                  headers[2].column.columnDef.header,
                  headers[2].getContext()
                )}
                <Table.HeaderSort
                  active={sortingState[0]?.id === headers[2].id}
                  desc={sortingState[0]?.desc}
                />
              </Table.HeaderCell>

              {/* Дата автоматизации */}
              <Table.HeaderCell key={headers[3].id}>
                {flexRender(
                  headers[3].column.columnDef.header,
                  headers[3].getContext()
                )}
              </Table.HeaderCell>

              {/* Обязательное выполнение */}
              <Table.HeaderCell key={headers[4].id}>
                {flexRender(
                  headers[4].column.columnDef.header,
                  headers[4].getContext()
                )}
              </Table.HeaderCell>

              {/* Портфели */}
              <Table.HeaderCell key={headers[5].id}>
                {flexRender(
                  headers[5].column.columnDef.header,
                  headers[5].getContext()
                )}
                <Table.HeaderSort
                  active={sortingState[0]?.id === headers[1].id}
                  desc={sortingState[0]?.desc}
                />
              </Table.HeaderCell>
            </Table.HeaderRow>
          ))}
        </Table.Header>

        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export const Filtering: StoryObj<typeof Table> = {
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

    const [filters, setFilters] = useState<TableColumnFiltersState>([
      {
        id: 'date',
        filterType: 'date',
        value: {
          from: new Date(),
          to: new Date()
        }
      }
    ])

    const handleFiltersChange = (state: TableColumnFiltersState): void => {
      console.log('handleFiltersChange', state)
      let result = TABLE_DATA
      setFilters(state)
      state.forEach((filter) => {
        result = result.filter((item) => {
          if (filter.id === 'portfolio') {
            return item[filter.id].match(filter.value as string)
          }
          // if (filter.filterType === 'select') {
          //   const filterLabel = (filter as TableColumnFilter<'select'>).value
          //     .label
          //   if (filterLabel === 'Все типы') {
          //     return true
          //   }
          //   return Boolean(
          //     item[filter.id as keyof typeof item].match(filterLabel)
          //   )
          // }

          // if (filter.filterType === 'search') {
          //   return Boolean(
          //     item[filter.id as keyof typeof item].match(filter.value as string)
          //   )
          // }

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
          // withSorting
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

const longPortfolioRows: Portfolio[] = []

for (let i = 0; i < 300; i++) {
  longPortfolioRows.push({
    portfolio: `Портфель ${i + 1}`,
    mark: `Марк ${i + 1}`,
    type: `Тип ${i + 1}`,
    status: `Active`
  })
}

export const ScrollableAndVirtualized: StoryObj<typeof Table> = {
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
          maxHeight={400}
          rows={filteredData}
          estimateRowHeight={157}
          scrollable
          virtualized
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

export const WithFilterTags: StoryObj<typeof Table> = {
  render: (args) => {
    // const [search, setSearch] = useState('qwerqwer')

    // const filteredData = TABLE_DATA.filter((a) => a.portfolio.match(search))

    return (
      <Space fullHeight>
        {/* <Input value={search} onChange={setSearch} /> */}

        <Table {...args} columns={columns} rows={TABLE_DATA} />
      </Space>
    )
  },
  args: {
    filterTags: ['qwer', 'erwqerqw']
  }
}
