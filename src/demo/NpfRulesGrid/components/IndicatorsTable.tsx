import { ReactElement } from 'react'
import { NpfRule } from '../types'
import {
  Table,
  TableColumnDef,
  TableColumnFiltersState,
  TableSortingState
} from 'Components/Table'

interface IndicatorsTableProps {
  indicators: NpfRule[]
  sorting: TableSortingState
  filters: TableColumnFiltersState
  onSortingChange: (sorting: TableSortingState) => void
  onFiltersChange: (filters: TableColumnFiltersState) => void
}

const columns: Array<TableColumnDef<NpfRule, any>> = [
  {
    header: 'ID',
    accessorKey: 'id',
    meta: {
      filterType: 'search'
    },
    enableSorting: true
  },
  {
    header: 'Название показателя',
    accessorKey: 'shortName',
    meta: {
      filterType: 'search'
    },
    enableSorting: true
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
]

const IndicatorsTable = ({
  indicators,
  sorting,
  onSortingChange,
  filters,
  onFiltersChange
}: IndicatorsTableProps): ReactElement => {
  return (
    <Table
      columns={columns}
      rows={indicators}
      withSorting
      sortingState={sorting}
      onSortingChange={onSortingChange}
      withFiltering
      filtersState={filters}
      onFiltersChange={onFiltersChange}
    />
  )
}

export default IndicatorsTable
