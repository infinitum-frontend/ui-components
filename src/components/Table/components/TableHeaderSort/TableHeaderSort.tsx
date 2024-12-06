// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { ReactComponent as ArrowUpDownIcon } from 'Icons/arrow-up-down-sharp.svg'
import { ReactComponent as ArrowDownIcon } from 'Icons/arrow-down-sharp.svg'
import { ReactComponent as ArrowUpIcon } from 'Icons/arrow-up-sharp.svg'
import TableHeaderCellButton from '../TableHeaderCellButton'

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
    <TableHeaderCellButton active={active} {...restProps}>
      {active ? (
        desc ? (
          <ArrowDownIcon />
        ) : (
          <ArrowUpIcon />
        )
      ) : (
        <ArrowUpDownIcon />
      )}
    </TableHeaderCellButton>
  )
}

export default TableHeaderSort
