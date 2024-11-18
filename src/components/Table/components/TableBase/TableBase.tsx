import { ReactElement } from 'react'
import { TableBaseProps } from '../../types'
import cn from 'classnames'

const TableBase = ({
  borderRadius,
  verticalAlignHead,
  verticalAlignBody,
  className,
  children,
  ...props
}: TableBaseProps): ReactElement => {
  return (
    <table
      className={cn('inf-table', className, {
        [`inf-table--border-radius-${borderRadius as string}`]: borderRadius,
        [`inf-table-header--vertical-align-${verticalAlignHead as string}`]:
          verticalAlignHead,
        [`inf-table--vertical-align-${verticalAlignBody as string}`]:
          verticalAlignBody
      })}
      {...props}
    >
      {children}
    </table>
  )
}

export default TableBase
