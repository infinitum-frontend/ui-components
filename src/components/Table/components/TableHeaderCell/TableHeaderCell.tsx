import { ComponentPropsWithoutRef, CSSProperties, ReactElement } from 'react'
import cn from 'classnames'
import './TableHeaderCell.scss'

export interface TableHeaderCellProps extends ComponentPropsWithoutRef<'th'> {
  interactive?: boolean
  width?: CSSProperties['width']
  minWidth?: CSSProperties['minWidth']
  maxWidth?: CSSProperties['maxWidth']
}

const TableHeaderCell = ({
  children,
  interactive,
  width,
  minWidth,
  maxWidth,
  ...restProps
}: TableHeaderCellProps): ReactElement => {
  return (
    <th
      className={cn('inf-table-header-cell', {
        'inf-table-header-cell--interactive': interactive
      })}
      style={{ width, minWidth, maxWidth }}
      {...restProps}
    >
      <div className="inf-table-header-cell__content">{children}</div>
    </th>
  )
}

export default TableHeaderCell
