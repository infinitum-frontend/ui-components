import React from 'react'
// TODO: поправить
// import { KeyCode } from '../constants'

export function useEscKeyDownEvent(
  handler: (arg0: KeyboardEvent) => void
): void {
  const eventHandler = React.useCallback(
    (event: KeyboardEvent) => {
      // if (event.keyCode === KeyCode.Escape) {
      //   handler(event)
      // }
    },
    [handler]
  )

  React.useEffect(() => {
    document.body.addEventListener('keydown', eventHandler)

    return () => {
      document.body.removeEventListener('keydown', eventHandler)
    }
  }, [eventHandler])
}
