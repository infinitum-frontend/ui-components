import { ReactElement } from 'react'
import { FundPurposeTypeEnum, NpfRule, PortfolioTypeEnum } from '../types'
import {
  Table,
  TableColumnDef,
  TableColumnFiltersState,
  TableSortingState
} from 'Components/Table'
import { Space } from '~/src/components/Space'
import { Label } from '~/src/components/Label'

interface IndicatorsTableProps {
  indicators: NpfRule[]
  sorting: TableSortingState
  filters: TableColumnFiltersState
  onSortingChange: (sorting: TableSortingState) => void
  onFiltersChange: (filters: TableColumnFiltersState) => void
  emptyMessage: string
}

const columns: Array<TableColumnDef<NpfRule, any>> = [
  {
    header: 'ID',
    accessorKey: 'id',
    size: 75,
    meta: {
      filterType: 'search'
    },
    enableSorting: true
  },
  {
    header: 'Название показателя',
    accessorKey: 'shortName',
    size: 1000,
    meta: {
      filterType: 'search'
    },
    enableSorting: true
  },
  {
    header: 'Вид проверки',
    size: 150,
    accessorKey: 'type',
    enableSorting: true,
    meta: {
      filterType: 'multiSelect',
      filterOptions: [
        {
          label: 'Контроль структуры',
          value: 'Structure'
        },
        {
          label: 'Контроль состава',
          value: 'Composition'
        },
        {
          label: 'Иной контроль',
          value: 'Other'
        }
      ]
    }
  },
  {
    header: 'Дата автоматизации',
    size: 175,
    enableSorting: true,
    accessorFn: (row) =>
      row.verificationAutomationDate
        ? row.verificationAutomationDate
        : 'Неавтоматизирован'
  },
  {
    header: 'Обязательное выполнение',
    size: 200,
    enableSorting: true,
    cell: (context) => {
      const mandatorySettings =
        context.row.original.mandatoryAutoAssignmentSettings
      if (!mandatorySettings?.length) {
        return <span>—</span>
      }
      return (
        <Space direction="horizontal" wrap>
          {mandatorySettings.map((setting, index) => (
            <Label variant="info" tone="light" key={index}>
              {setting.fundPurposeType} - {setting.portfolioType}
            </Label>
          ))}
        </Space>
      )
    },
    accessorFn: (row) => row.mandatoryAutoAssignmentSettings,
    id: 'mandatoryAutoAssignmentSettings',
    meta: {
      filterType: 'multiSelect',
      filterOptions: [
        {
          label: 'Не предусмотрено',
          value: 'notMandatory'
        },
        {
          label: 'Вид СЦН',
          options: [
            {
              label: 'ПР',
              value: FundPurposeTypeEnum.PensionReserves
            },
            {
              label: 'ПН',
              value: FundPurposeTypeEnum.PensionSavings
            },
            {
              label: 'СС',
              value: FundPurposeTypeEnum.OwnFunds
            }
          ]
        },
        {
          label: 'Вид портфеля',
          options: [
            {
              label: 'Совокупный',
              value: PortfolioTypeEnum.Aggregate
            },
            {
              label: 'Инвестор без посредников',
              value: PortfolioTypeEnum.SelfManagement
            },
            {
              label: 'ДУ',
              value: PortfolioTypeEnum.TrustManagement
            }
          ]
        }
      ]
    }
  },
  {
    header: 'Портфели',
    enableSorting: true,
    size: 90,
    accessorKey: 'portfoliosCount'
  }
]

const IndicatorsTable = ({
  indicators,
  sorting,
  onSortingChange,
  filters,
  onFiltersChange,
  emptyMessage
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
      withFiltersTags
      virtualized
      estimateRowHeight={100}
      maxHeight="calc(100vh - 200px)"
      stickyHeader
      emptyMessage={emptyMessage}
    />
  )
}

export default IndicatorsTable
