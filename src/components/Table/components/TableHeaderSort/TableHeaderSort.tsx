// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentPropsWithoutRef, ReactElement } from 'react'
import ArrowUpDownIcon from 'Icons/arrow-up-down-sharp.svg?react'
import ArrowDownIcon from 'Icons/arrow-down-sharp.svg?react'
import ArrowUpIcon from 'Icons/arrow-up-sharp.svg?react'
import TableHeaderCellButton from '../TableHeaderCellButton'
import { TableTestAttributes } from '../../constants/testAttributes'

export interface TableHeaderSortProps
  extends ComponentPropsWithoutRef<'button'> {
  active: boolean
  desc: boolean
  className?: string
}

const TableHeaderSort = ({
  active,
  desc,
  className,
  ...restProps
}: TableHeaderSortProps): ReactElement => {
  return (
    <TableHeaderCellButton
      active={active}
      {...restProps}
      data-testid={TableTestAttributes.headerSortButton}
    >
      {active ? (
        desc ? (
          <ArrowDownIcon data-testid={TableTestAttributes.sortIsDescIcon} />
        ) : (
          <ArrowUpIcon data-testid={TableTestAttributes.sortIsAscIcon} />
        )
      ) : (
        <ArrowUpDownIcon
          data-testid={TableTestAttributes.sortIsNotSelectedIcon}
        />
      )}
    </TableHeaderCellButton>
  )
}

export default TableHeaderSort
