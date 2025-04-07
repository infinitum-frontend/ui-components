import React, { ComponentPropsWithoutRef } from 'react'
import './TableHeaderCellButton.scss'
import cn from 'classnames'

export interface TableHeaderCellButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  className?: string
  active?: boolean
  rotated?: boolean
}

const TableHeaderCellButton = React.forwardRef<
  HTMLButtonElement,
  TableHeaderCellButtonProps
>(({ className, active, rotated, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn('inf-table-header-cell-button', className, {
        'inf-table-header-cell-button--active': active,
        'inf-table-header-cell-button--rotated': rotated
      })}
      {...props}
    >
      {children}
    </button>
  )
})

TableHeaderCellButton.displayName = 'TableHeaderCellButton'

export default TableHeaderCellButton

// import { ComponentPropsWithoutRef, ReactElement } from 'react'
// import cn from 'classnames'
// import './TableHeaderCellButton.scss'

// export interface TableHeaderCellButtonProps
//   extends ComponentPropsWithoutRef<'button'> {
//   active?: boolean
//   rotated?: boolean
// }

// const TableHeaderCellButton = ({
//   active,
//   rotated,
//   children,
//   ...props
// }: TableHeaderCellButtonProps): ReactElement => {
//   return (
//     <button
//       className={cn('inf-table-header-cell-button', {
//         'inf-table-header-cell-button--active': active,
//         'inf-table-header-cell-button--rotated': rotated
//       })}
//       {...props}
//     >
//       {children}
//     </button>
//   )
// }

// export default TableHeaderCellButton
