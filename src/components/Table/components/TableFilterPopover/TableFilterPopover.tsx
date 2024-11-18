import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactElement,
  useState
} from 'react'
import { Popover } from 'Components/Popover'
import { ReactComponent as FilterIcon } from 'Icons/filter.svg'
import { ReactComponent as CalendarIcon } from 'Icons/calendar.svg'
import { ReactComponent as SearchIcon } from 'Icons/search.svg'
import cn from 'classnames'
import './TableFilterPopover.scss'

type IconVariant = 'search' | 'date' | 'filter'

export interface TableFilterPopoverProps
  extends ComponentPropsWithoutRef<'div'> {
  isTriggerActive?: boolean
  iconVariant?: IconVariant
  popoverWidth?: CSSProperties['width']
}

const TableFilterPopover = ({
  isTriggerActive,
  iconVariant = 'filter',
  popoverWidth = '300px',
  children
}: TableFilterPopoverProps): ReactElement => {
  const [isOpen, setOpen] = useState(false)

  const filterIcons: Record<
    IconVariant,
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  > = {
    search: SearchIcon,
    date: CalendarIcon,
    filter: FilterIcon
  }

  const FilterIconComponent = filterIcons[iconVariant]

  return (
    <Popover
      open={isOpen}
      placement="bottom-start"
      onOpenChange={(value) => setOpen(value)}
    >
      <Popover.Trigger>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setOpen((prev) => !prev)
          }}
          className={'inf-table-filter-popover__button'}
        >
          <FilterIconComponent
            className={cn('inf-table-filter-popover__icon', {
              'inf-table-filter-popover__icon--active': isTriggerActive
            })}
          />
        </button>
      </Popover.Trigger>

      <Popover.Content hasPadding={false} width={popoverWidth}>
        {children}
      </Popover.Content>
    </Popover>
  )
}

export default TableFilterPopover
