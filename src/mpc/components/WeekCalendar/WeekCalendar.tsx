import dayjs from 'dayjs'
import React from 'react'

import {
  reducer,
  init,
  generateShowedDates,
  getPrevWeek,
  getNextWeek
} from './domain'
import { ActionTypesEnum } from './domain/Week.reducer'

import { useGetDates } from './hooks'

import cn from 'classnames'
import styles from './WeekCalendar.module.css'

import { CurrentActivitiesEnum } from './enums/currentActivities'

import DateBlock from './components/DateBlock'

import CalendarDropdown from '../CalendarDropdown/CalendarDropdown'
// import Skeleton from '../Skeleton';

import { canSeeNextWeek } from './domain/Week.domain'
import { prevDayOfWeek } from './hooks/useSetPrevWeek'
import { nextDayOfWeek } from './hooks/useSetNextWeek'
import { DateFormat } from '../../infrastructure/date/date'

export default function WeekCalendar(props: {
  className?: string
  role?: string
  chosenDate?: string
  onChange?: (arg0: string) => void
}): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const {
    className,
    role = 'weekCalendar',
    chosenDate = dayjs().format(DateFormat),
    onChange = () => {},
    ...attributes
  } = props

  const [state, dispatch] = React.useReducer(reducer, init())

  useGetDates(
    dispatch,
    { chosenDate },
    state.currentActivity === CurrentActivitiesEnum.bootstrap
  )

  React.useEffect(() => {
    if (!state.showedDates.length) {
      dispatch({
        type: ActionTypesEnum.changeShowedDates,
        payload: { nextShowedDates: generateShowedDates(chosenDate) }
      })
    }

    if (
      state.showedDates.length &&
      !dayjs(state.showedDates[0].date).isSame(dayjs(chosenDate), 'week')
    ) {
      dispatch({
        type: ActionTypesEnum.changeShowedDates,
        payload: { nextShowedDates: generateShowedDates(chosenDate) }
      })
    }
  }, [chosenDate])

  const onChangeChosenDate = (nextDate: string): void => {
    onChange(nextDate)
  }

  const BootstrapView = (): React.ReactElement => (
    <div className={cn(styles.body, className)} role="progressbar">
      {/* <Skeleton /> */}
    </div>
  )

  const requestErrorView = (): React.ReactElement => (
    <div>Ошибка получения данных</div>
  )

  const IdleView = (): React.ReactElement => (
    <div {...attributes} className={cn(styles.body, className)} role={role}>
      <button
        type="button"
        aria-label="set-preview-week"
        className={cn(styles.btn)}
        onClick={(): void => {
          const nextChosenDate = getPrevWeek(chosenDate)[prevDayOfWeek].date
          onChange(nextChosenDate)
        }}
      >
        <i className={styles.leftIcon} />
      </button>
      {state.showedDates.map((showedDate) => (
        <DateBlock
          key={showedDate.date}
          className={cn(styles.btn)}
          showedDate={showedDate}
          chosenDate={chosenDate}
          onChange={onChangeChosenDate}
        />
      ))}
      <button
        type="button"
        aria-label="set-next-week"
        className={cn(styles.btn)}
        onClick={(): void => {
          const nextChosenDate = getNextWeek(chosenDate)[nextDayOfWeek].date
          onChange(nextChosenDate)
        }}
        disabled={!canSeeNextWeek(chosenDate)}
      >
        <i className={styles.rightIcon} />
      </button>
      <div className={cn(styles.btn)}>
        <CalendarDropdown
          chosenDate={chosenDate}
          onChange={onChangeChosenDate}
          borders={{ to: dayjs().format(DateFormat) }}
        />
      </div>
    </div>
  )

  const Views: { [key in CurrentActivitiesEnum]: () => React.ReactElement } = {
    [CurrentActivitiesEnum.bootstrap]: BootstrapView,
    [CurrentActivitiesEnum.idle]: IdleView,
    [CurrentActivitiesEnum.requestError]: requestErrorView
  }

  return Views[state.currentActivity]()
}
