import { ReactElement } from 'react'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import { Space } from 'Components/Space'
import { Tag } from 'Components/Tag'
import { Link } from 'Components/Link'

export interface TableFilterTagsProps {
  colSpan: number
  values: string[]
  onChange: (values: string[]) => void
}

const TableFilterTags = ({
  colSpan,
  values,
  onChange
}: TableFilterTagsProps): ReactElement => {
  const handleRemove = (value: string): void => {
    const filtered = values.filter((v) => v !== value)
    onChange(filtered)
  }

  const handleRemoveAll = (): void => {
    onChange([])
  }

  return (
    <TableRow hoverable={false}>
      <TableCell colSpan={colSpan}>
        <Space direction="horizontal" gap="small" align="center">
          {values?.map((value) => (
            <Tag key={value} onRemove={() => handleRemove(value)}>
              {value}
            </Tag>
          ))}
          <Link as="button" type="button" onClick={handleRemoveAll}>
            Сбросить
          </Link>
        </Space>
      </TableCell>
    </TableRow>
  )
}

export default TableFilterTags
