import { ReactElement, ReactNode } from 'react'
import { Space } from 'Components/Space'
import { Tag } from 'Components/Tag'
import { Link } from 'Components/Link'
import { TableColumnFilter, TableColumnFiltersState } from '../../types'
import { OnChangeFn } from 'Utils/types'
import { createDate } from '~/src/utils/date'
import { produce } from 'immer'
import './TableFilterTags.scss'
import cn from 'classnames'

export interface TableFilterTagsProps {
  filtersState: TableColumnFiltersState
  onChange?: OnChangeFn<TableColumnFiltersState>
  totalColumnsCount: number
  sticky?: boolean
}

interface AppliedFilterValue {
  filterId: TableColumnFilter['id']
  label: ReactNode
  value: string | number
  filterType: TableColumnFilter['filterType']
}

export const TABLE_FILTER_TAGS_HEIGHT = 48 // TODO: избавиться

const TableFilterTags = ({
  filtersState,
  onChange,
  totalColumnsCount,
  sticky
}: TableFilterTagsProps): ReactElement => {
  const handleRemove = (appliedFilter: AppliedFilterValue): void => {
    // TODO: отрефакторить это если сможешь
    const newFiltersState = produce(filtersState, (draft) => {
      const filterIndex = draft.findIndex(
        (f) => f.id === appliedFilter.filterId
      )
      const filter = draft[filterIndex]

      if (filter?.filterType === 'multiSelect') {
        filter.value = filter.value.filter(
          (f) => f.value !== appliedFilter.value
        )
        if (filter.value.length === 0) {
          draft.splice(filterIndex, 1)
        }
      } else {
        return draft.filter((filter) => {
          const { filterId, value } = appliedFilter
          return filter.id !== filterId && filter.value !== value
        })
      }
    })

    onChange?.(newFiltersState)
  }

  const handleRemoveAll = (): void => {
    onChange?.([])
  }

  const appliedFilterValuesValues = filtersState.reduce<AppliedFilterValue[]>(
    (filtersAccumulator, currentFilter) => {
      if (currentFilter.filterType === 'multiSelect') {
        currentFilter.value.forEach((v) => {
          filtersAccumulator.push({
            filterId: currentFilter.id,
            label: v.label,
            value: v.value,
            filterType: currentFilter.filterType
          })
        })
      } else if (currentFilter.filterType === 'select') {
        filtersAccumulator.push({
          filterId: currentFilter.id,
          label: currentFilter.value.label,
          value: currentFilter.value.value,
          filterType: currentFilter.filterType
        })
      } else if (currentFilter.filterType === 'date') {
        filtersAccumulator.push({
          filterId: currentFilter.id,
          label: createDate(currentFilter.value).toLocaleDateString('ru'),
          value: currentFilter.value,
          filterType: currentFilter.filterType
        })
      } else {
        filtersAccumulator.push({
          filterId: currentFilter.id,
          label: currentFilter.value,
          value: currentFilter.value,
          filterType: currentFilter.filterType
        })
      }

      return filtersAccumulator
    },
    []
  )

  return (
    <tr
      className={cn('inf-table-filter-tags', {
        'inf-table-filter-tags--sticky': sticky
      })}
    >
      <td className="inf-table-filter-tags__cell" colSpan={totalColumnsCount}>
        <Space direction="horizontal" gap="small" align="center" wrap>
          {appliedFilterValuesValues?.map((appliedFilter) => (
            <Tag
              key={`${appliedFilter.filterId}-${appliedFilter.value}`}
              onRemove={
                onChange ? () => handleRemove(appliedFilter) : undefined
              }
            >
              {appliedFilter.label}
            </Tag>
          ))}

          {onChange && (
            <Link as="button" type="button" onClick={handleRemoveAll}>
              Сбросить
            </Link>
          )}
        </Space>
      </td>
    </tr>
  )
}

export default TableFilterTags
