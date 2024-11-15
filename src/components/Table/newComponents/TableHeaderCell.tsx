import { ComponentPropsWithoutRef, CSSProperties, ReactElement } from 'react'
import cn from 'classnames'

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
      className={cn('inf-new-table-header-cell', {
        'inf-new-table-header-cell--interactive': interactive
      })}
      style={{ width, minWidth, maxWidth }}
      {...restProps}
    >
      <div className="inf-new-table-header-cell__content">{children}</div>
    </th>
  )
}

export default TableHeaderCell
