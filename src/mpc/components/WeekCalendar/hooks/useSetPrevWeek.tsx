import React from 'react'

import { ActionTypesEnum, TAction } from '../domain/Week.reducer'
import { CurrentActivitiesEnum } from '../enums/currentActivities'
import { getPrevWeek } from '../domain'

export const prevDayOfWeek = 4 // friday

export default function useSetPrevWeek(
  dispatch: (action: TAction) => void,
  options: { chosenDate: string },
  isActive: boolean
): void {
  React.useEffect(() => {
    if (isActive) {
      const showedDates = getPrevWeek(options.chosenDate)

      dispatch({
        type: ActionTypesEnum.changeShowedDates,
        payload: { nextShowedDates: showedDates }
      })

      dispatch({
        type: ActionTypesEnum.changeChosenDate,
        payload: { nextChosenDate: showedDates[prevDayOfWeek].date }
      })

      dispatch({
        type: ActionTypesEnum.changeCurrentActivity,
        payload: { nextCurrentActivity: CurrentActivitiesEnum.idle }
      })
    }
  }, [isActive])
}
