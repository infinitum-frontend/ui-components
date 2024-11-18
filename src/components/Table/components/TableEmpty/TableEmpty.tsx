import { ReactElement } from 'react'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import { Text } from 'Components/Text'

export interface TableEmptyProps {
  message?: string
  colSpan: number
}

const TableEmpty = ({ colSpan, message }: TableEmptyProps): ReactElement => {
  return (
    <TableRow hoverable={false}>
      <TableCell colSpan={colSpan}>
        <Text alignment="center" variant="body-2" color="tertiary">
          {message || 'Нет данных'}
        </Text>
      </TableCell>
    </TableRow>
  )
}

export default TableEmpty
