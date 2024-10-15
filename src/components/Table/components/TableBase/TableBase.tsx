import { ReactElement, TableHTMLAttributes } from 'react'
import cn from 'classnames'
import { TableVerticalAlignValue } from '../../types'

export interface TableBaseProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Скругление границ таблицы */
  borderRadius?: 'xsmall' | 'small' | 'medium' | 'large'
  /** CSS свойство vertical-align для шапки */
  verticalAlignHead?: TableVerticalAlignValue
  /** CSS свойство vertical-align для рядов */
  verticalAlignBody?: TableVerticalAlignValue
}

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
