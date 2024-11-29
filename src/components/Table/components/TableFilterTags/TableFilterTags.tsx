import { ReactElement, ReactNode } from 'react'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import { Space } from 'Components/Space'
import { Tag } from 'Components/Tag'
import { Link } from 'Components/Link'
import { TableColumnFiltersState } from '../../types'
import { OnChangeFn } from 'Utils/types'
import { createDate } from '~/src/utils/date'

export interface TableFilterTagsProps {
  filtersState: TableColumnFiltersState
  onChange?: OnChangeFn<TableColumnFiltersState>
  totalColumnsCount: number
}

interface AppliedFilterValue {
  filterId: string
  label: ReactNode
  value: string | number
}

const TableFilterTags = ({
  filtersState,
  onChange,
  totalColumnsCount
}: TableFilterTagsProps): ReactElement => {
  const handleRemove = (valueObj: AppliedFilterValue): void => {
    const newFiltersState = filtersState.filter((item) => {
      const { filterId, value } = valueObj
      return item.id !== filterId && item.value !== value
    })
    onChange?.(newFiltersState)
  }

  const handleRemoveAll = (): void => {
    onChange?.([])
  }

  const appliedFilterValuesValues = filtersState.reduce<AppliedFilterValue[]>(
    (filtersAccumulator, currentFilter) => {
      // TODO: добавить типизацию (discriminated union?), убрать доп проверки на структуру данных
      if (
        currentFilter.filterType === 'multiSelect' &&
        Array.isArray(currentFilter.value)
      ) {
        currentFilter.value.forEach((v) => {
          filtersAccumulator.push({
            filterId: currentFilter.id,
            label: v.label,
            value: v.value
          })
        })
      } else if (
        currentFilter.filterType === 'select' &&
        typeof currentFilter.value === 'object' &&
        !Array.isArray(currentFilter.value)
      ) {
        filtersAccumulator.push({
          filterId: currentFilter.id,
          label: currentFilter.value.label,
          value: currentFilter.value.value
        })
      } else if (currentFilter.filterType === 'date') {
        filtersAccumulator.push({
          filterId: currentFilter.id,
          label: createDate(currentFilter.value as string).toLocaleDateString(
            'ru'
          ),
          value: currentFilter.value as string
        })
      } else {
        filtersAccumulator.push({
          filterId: currentFilter.id,
          label: currentFilter.value as string,
          value: currentFilter.value as string
        })
      }

      return filtersAccumulator
    },
    []
  )

  return (
    <TableRow hoverable={false}>
      <TableCell colSpan={totalColumnsCount}>
        <Space direction="horizontal" gap="small" align="center">
          {appliedFilterValuesValues?.map((valueObj) => (
            <Tag
              key={`${valueObj.filterId}-${valueObj.value}`}
              onRemove={onChange ? () => handleRemove(valueObj) : undefined}
            >
              {valueObj.label}
            </Tag>
          ))}

          {onChange && (
            <Link as="button" type="button" onClick={handleRemoveAll}>
              Сбросить
            </Link>
          )}
        </Space>
      </TableCell>
    </TableRow>
  )
}

export default TableFilterTags
