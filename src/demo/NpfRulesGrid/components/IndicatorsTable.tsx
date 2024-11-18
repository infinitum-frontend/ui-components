import React, { ReactElement, useState } from 'react'
import { NPF_RULES_TABLE_DATA, NpfRule } from '../fixtures'
import { Table, TableColumnDef, getNextSorting } from 'Components/Table'
import { Input } from 'Components/Input'
import { Text } from 'Components/Text'
import {
  useReactTable,
  flexRender,
  getCoreRowModel
} from '@tanstack/react-table'

const IndicatorsTable = (): ReactElement => {
  const columns: Array<TableColumnDef<NpfRule, any>> = React.useMemo(
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
  // const [mandatoryAssignmentSettings, setMandatoryAssignmentSettings] =
  //   useState([])

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

          // @ts-expect-error
          const compareResult = a[id as keyof NpfRule].localeCompare(
            b[id as keyof NpfRule]
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
                <Input value={portfolioSearch} onChange={setPortfolioSearch} />
              </Table.FilterPopover>
            </Table.HeaderCell>

            {/* Название показателя */}
            <Table.HeaderCell
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
            <Table.HeaderCell minWidth="150px">
              {flexRender(
                headers[3].column.columnDef.header,
                headers[3].getContext()
              )}
            </Table.HeaderCell>

            {/* Обязательное выполнение */}
            <Table.HeaderCell>
              {flexRender(
                headers[4].column.columnDef.header,
                headers[4].getContext()
              )}
              <Table.FilterPopover
                isTriggerActive={Boolean(portfolioSearch)}
                popoverWidth="330px"
              >
                <Input value={portfolioSearch} onChange={setPortfolioSearch} />
              </Table.FilterPopover>
            </Table.HeaderCell>

            {/* Портфели */}
            <Table.HeaderCell>
              {flexRender(
                headers[5].column.columnDef.header,
                headers[5].getContext()
              )}
              <Table.HeaderSort
                active={sortingState[0]?.id === headers[5].id}
                desc={sortingState[0]?.desc}
              />
            </Table.HeaderCell>
          </Table.HeaderRow>
        ))}
      </Table.Header>

      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const content = flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )
              const isIdColumn = cell.column.id === 'id'

              return (
                <Table.Cell key={cell.id}>
                  {isIdColumn ? (
                    <Text variant="body-2" weight="bold">
                      {content}
                    </Text>
                  ) : (
                    content
                  )}
                </Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default IndicatorsTable
