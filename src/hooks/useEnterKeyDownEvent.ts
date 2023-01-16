import React from 'react'
// TODO: поправить
// import { KeyCode } from '../constants'

export function useEnterKeyDownEvent(
  handler: (arg0: KeyboardEvent) => void,
  target: HTMLElement | Document | null
): void {
  const eventHandler = React.useCallback(
    (event: KeyboardEvent) => {
      // if (event.keyCode === KeyCode.Enter) {
      //   handler(event)
      // }
    },
    [handler]
  )

  React.useEffect(() => {
    target?.addEventListener('keydown', eventHandler as EventListener)

    return () => {
      target?.removeEventListener('keydown', eventHandler as EventListener)
    }
  }, [eventHandler, target])
}
