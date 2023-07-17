import { ReactElement } from 'react'
import { Button } from '~/src'
import { ReactComponent as IconArrowLeft } from 'Icons/arrow-left.svg'
import cn from 'classnames'
import { ReactComponent as IconArrowRight } from 'Icons/arrow-right.svg'
import './DateCalendarHeader.scss'
import { capitalize } from 'Utils/helpers'

export interface CalendarHeaderProps {
  onArrowLeftClick: () => void
  onArrowRightClick: () => void
  selectedView: 'day' | 'month' | 'year'
  onSelectedViewChange: (view: 'day' | 'month' | 'year') => void
  date: Date
}

const DateCalendarHeader = ({
  onArrowLeftClick,
  onArrowRightClick,
  onSelectedViewChange,
  selectedView,
  date
}: CalendarHeaderProps): ReactElement => {
  return (
    <div className="inf-calendar-header">
      <Button
        variant="ghost"
        size="small"
        icon={<IconArrowLeft />}
        onClick={onArrowLeftClick}
        className={
          selectedView === 'year' ? 'inf-calendar-header__arrow--hidden' : ''
        }
      />

      <div className="inf-calendar-header__wrapper">
        <span
          className={cn('inf-calendar-header__control', {
            'inf-calendar-header__control--selected': selectedView === 'month'
          })}
          onClick={() =>
            onSelectedViewChange(selectedView === 'month' ? 'day' : 'month')
          }
        >
          {capitalize(date.toLocaleDateString('ru-Ru', { month: 'long' }))}
        </span>
        <span
          className={cn('inf-calendar-header__control', {
            'inf-calendar-header__control--selected': selectedView === 'year'
          })}
          onClick={() =>
            onSelectedViewChange(selectedView === 'year' ? 'day' : 'year')
          }
        >
          {date.toLocaleDateString('ru-Ru', { year: 'numeric' })}
        </span>
      </div>

      <Button
        variant="ghost"
        className={
          selectedView === 'year' ? 'inf-calendar-header__arrow--hidden' : ''
        }
        size="small"
        icon={<IconArrowRight />}
        onClick={onArrowRightClick}
      />
    </div>
  )
}

export default DateCalendarHeader
