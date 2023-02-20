import React from 'react'

import { ActionTypesEnum, TAction } from '../domain/Week.reducer'
import { CurrentActivitiesEnum } from '../enums/currentActivities'
import { generateShowedDates } from '../domain'

export default function useGetDates(
  dispatch: (action: TAction) => void,
  options: { chosenDate: string },
  isActive: boolean
): void {
  React.useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line no-void
      void Promise.resolve().then(() => {
        dispatch({
          type: ActionTypesEnum.changeShowedDates,
          payload: { nextShowedDates: generateShowedDates(options.chosenDate) }
        })
        dispatch({
          type: ActionTypesEnum.changeCurrentActivity,
          payload: { nextCurrentActivity: CurrentActivitiesEnum.idle }
        })
      })
    }
  }, [isActive])
}
