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

interface FilterValueObject {
  filterId: string
  label: ReactNode
  value: string | number
}

const TableFilterTags = ({
  filtersState,
  onChange,
  totalColumnsCount
}: TableFilterTagsProps): ReactElement => {
  const handleRemove = (valueObj: FilterValueObject): void => {
    const newFiltersState = filtersState.filter((item) => {
      const { filterId, value } = valueObj
      return item.id !== filterId && item.value !== value
    })
    onChange?.(newFiltersState)
  }

  const handleRemoveAll = (): void => {
    onChange?.([])
  }

  const filtersValues = filtersState.reduce<FilterValueObject[]>((acc, cur) => {
    // TODO: добавить типизацию (discriminated union?), убрать доп проверки на структуру данных
    if (cur.filterType === 'multiSelect' && Array.isArray(cur.value)) {
      cur.value.forEach((v) => {
        acc.push({
          filterId: cur.id,
          label: v.label,
          value: v.value
        })
      })
    } else if (
      cur.filterType === 'select' &&
      typeof cur.value === 'object' &&
      !Array.isArray(cur.value)
    ) {
      acc.push({
        filterId: cur.id,
        label: cur.value.label,
        value: cur.value.value
      })
    } else if (cur.filterType === 'date') {
      acc.push({
        filterId: cur.id,
        label: createDate(cur.value as string).toLocaleDateString('ru'),
        value: cur.value as string
      })
    } else {
      acc.push({
        filterId: cur.id,
        label: cur.value as string,
        value: cur.value as string
      })
    }

    return acc
  }, [])

  return (
    <TableRow hoverable={false}>
      <TableCell colSpan={totalColumnsCount}>
        <Space direction="horizontal" gap="small" align="center">
          {filtersValues?.map((valueObj) => (
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
