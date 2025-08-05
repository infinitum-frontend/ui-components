import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactElement,
  ReactNode
} from 'react'
import { Tooltip } from '~/src/components/Tooltip'
import cn from 'classnames'
import './TableHeaderCell.scss'
import useTextOverflowTooltip from '~/src/hooks/useTextOverflowTooltip'

export interface TableHeaderCellProps extends ComponentPropsWithoutRef<'th'> {
  interactive?: boolean
  width?: CSSProperties['width']
  minWidth?: CSSProperties['minWidth']
  maxWidth?: CSSProperties['maxWidth']
  slotSortButton: ReactNode
  slotFilterButton: ReactNode
}

const TableHeaderCell = ({
  children,
  interactive,
  width,
  minWidth,
  maxWidth,
  slotSortButton,
  slotFilterButton,
  ...restProps
}: TableHeaderCellProps): ReactElement => {
  const {
    isOpen: isTooltipOpen,
    onOpenChange: setTooltipOpen,
    handleMouseEnter,
    handleMouseLeave
  } = useTextOverflowTooltip()
  return (
    <th
      className={cn('inf-table-header-cell', {
        'inf-table-header-cell--interactive': interactive
      })}
      style={{ width, minWidth, maxWidth }}
      {...restProps}
    >
      <div className="inf-table-header-cell__content">
        <Tooltip
          open={isTooltipOpen}
          onOpenChange={setTooltipOpen}
          content={children}
          placement="bottom-start"
          offset={{
            mainAxis: 10,
            crossAxis: 0
          }}
          hasArrow={false}
          size="small"
        >
          <div
            data-selector="heading"
            className="inf-table-header-cell__heading"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>
        </Tooltip>
        <div className="inf-table-header-cell__buttons">
          {slotSortButton}
          {slotFilterButton}
        </div>
      </div>
    </th>
  )
}

export default TableHeaderCell
