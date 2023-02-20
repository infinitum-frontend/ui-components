import { IWeekCalendarDay, IWeekCalendarState } from './Week.domain'
import { CurrentActivitiesEnum } from '../enums/currentActivities'

export enum ActionTypesEnum {
  changeCurrentActivity = 'changeCurrentActivity',
  changeShowedDates = 'changeShowedDates',
  changeChosenDate = 'changeChosenDate'
}

export type TAction =
  | {
      type: ActionTypesEnum.changeCurrentActivity
      payload: { nextCurrentActivity: CurrentActivitiesEnum }
    }
  | {
      type: ActionTypesEnum.changeShowedDates
      payload: { nextShowedDates: IWeekCalendarDay[] }
    }
  | {
      type: ActionTypesEnum.changeChosenDate
      payload: { nextChosenDate: string }
    }

export default function weekReducer(
  state: IWeekCalendarState,
  action: TAction
): IWeekCalendarState {
  switch (action.type) {
    case ActionTypesEnum.changeCurrentActivity:
      return (({
        nextCurrentActivity
      }: {
        nextCurrentActivity: CurrentActivitiesEnum
      }) => ({
        ...state,
        currentActivity: nextCurrentActivity
      }))(action.payload)
    case ActionTypesEnum.changeShowedDates:
      return (({
        nextShowedDates
      }: {
        nextShowedDates: IWeekCalendarDay[]
      }) => ({
        ...state,
        showedDates: nextShowedDates
      }))(action.payload)

    case ActionTypesEnum.changeChosenDate:
      return (({ nextChosenDate }: { nextChosenDate: string }) => ({
        ...state,
        chosenDate: nextChosenDate
      }))(action.payload)
  }
}
