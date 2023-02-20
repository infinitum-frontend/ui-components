import React from 'react'

import { ActionTypesEnum, TAction } from '../domain/Week.reducer'
import { CurrentActivitiesEnum } from '../enums/currentActivities'
import { getNextWeek } from '../domain'

export const nextDayOfWeek = 0 // monday

export default function useSetNextWeek(
  dispatch: (action: TAction) => void,
  options: { chosenDate: string },
  isActive: boolean
): void {
  React.useEffect(() => {
    if (isActive) {
      const showedDates = getNextWeek(options.chosenDate)

      dispatch({
        type: ActionTypesEnum.changeShowedDates,
        payload: { nextShowedDates: showedDates }
      })

      dispatch({
        type: ActionTypesEnum.changeChosenDate,
        payload: { nextChosenDate: showedDates[nextDayOfWeek].date }
      })

      dispatch({
        type: ActionTypesEnum.changeCurrentActivity,
        payload: { nextCurrentActivity: CurrentActivitiesEnum.idle }
      })
    }
  }, [isActive])
}
