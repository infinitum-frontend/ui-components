import {
  ComponentPropsWithoutRef,
  CSSProperties,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useRef,
  useState
} from 'react'
import { Tooltip } from '~/src/components/Tooltip'
import cn from 'classnames'
import './TableHeaderCell.scss'

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
  const [isTooltipOpen, setTooltipOpen] = useState(false)
  const hoverDelayTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e): void => {
    const element = e.currentTarget

    // показываем тултип с полным названием только если текст заголовка обрезался
    const isTextTruncated = element
      ? element.offsetWidth < element.scrollWidth
      : false

    if (isTextTruncated) {
      hoverDelayTimeout.current = setTimeout(() => {
        setTooltipOpen(true)
      }, 200)
    }
  }

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (): void => {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current)
    }

    handleHideTooltip()
  }

  const handleHideTooltip = (): void => {
    if (!isTooltipOpen) return
    setTooltipOpen(false)
  }

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
        <div
          className="inf-table-header-cell__buttons"
          // onMouseEnter={handleHideTooltip}
        >
          {slotSortButton}
          {slotFilterButton}
        </div>
      </div>
    </th>
  )
}

export default TableHeaderCell
