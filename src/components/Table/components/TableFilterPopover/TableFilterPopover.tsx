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
import TableHeaderCellButton from '../TableHeaderCellButton'

type IconVariant = 'search' | 'date' | 'filter'

export interface TableFilterPopoverProps
  extends ComponentPropsWithoutRef<'div'> {
  isTriggerActive?: boolean
  iconVariant?: IconVariant
  popoverWidth?: CSSProperties['width']
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

const TableFilterPopover = ({
  isTriggerActive,
  iconVariant = 'filter',
  popoverWidth,
  open,
  onOpenChange,
  children
}: TableFilterPopoverProps): ReactElement => {
  const isControlled = open !== undefined && onOpenChange !== undefined
  // для uncontrolled
  const [localOpen, setLocalOpen] = useState(isControlled ? undefined : false)

  const handleOpenChange = (value: boolean): void => {
    if (isControlled) {
      onOpenChange(value)
    } else {
      setLocalOpen(value)
    }
  }

  const isModalOpen = isControlled ? open : localOpen

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
      open={isModalOpen}
      placement="bottom-end"
      onOpenChange={handleOpenChange}
      offset={{ mainAxis: 16 }}
    >
      <Popover.Trigger>
        <TableHeaderCellButton
          active={isTriggerActive || isModalOpen}
          onClick={(e) => {
            e.stopPropagation()
            handleOpenChange(!isModalOpen)
          }}
        >
          <FilterIconComponent />
        </TableHeaderCellButton>
      </Popover.Trigger>

      <Popover.Content hasPadding={false} width={popoverWidth}>
        {children}
      </Popover.Content>
    </Popover>
  )
}

export default TableFilterPopover
