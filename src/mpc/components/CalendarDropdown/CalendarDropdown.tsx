import React, { useCallback } from 'react'
import styles from './CalendarDropdown.module.css'
import inputStyles from '../Input/Input.module.css'

import cn from 'classnames'
import { defaultDate, getUrlDate } from '../../infrastructure/date/date'

function Dropdown(props: {
  role?: string
  chosenDate?: string
  borders?: { from?: string; to?: string }
  onChange?: (arg0: string) => void
  hasReset?: boolean
}): React.ReactElement {
  const {
    role = 'calendar-button',
    onChange = () => {
      /* default func */
    },
    chosenDate,
    borders,
    hasReset = false
  } = props

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      const formattedValue = value === '' && !hasReset ? defaultDate : value
      onChange(formattedValue)
    },
    [onChange, hasReset]
  )

  return (
    <div
      role={role}
      aria-label="action-open-dropdown"
      className={cn(styles.wrapper, styles.calendarIcon)}
    >
      <input
        className={cn(styles.dateInput, inputStyles.inputReset)}
        type="date"
        role="calendar"
        value={getUrlDate(chosenDate)}
        min={borders?.from}
        max={borders?.to}
        onChange={handleChange}
      />
    </div>
  )
}

export default Dropdown
