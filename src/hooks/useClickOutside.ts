import { RefObject, useEffect } from 'react'

export function useClickOutside(
  ref: RefObject<any> | Array<RefObject<any>>,
  handler: (event: MouseEvent) => void
): void {
  const composedRef = Array.isArray(ref) ? ref : [ref]
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        !composedRef.filter((el) => el.current?.contains(event.target)).length
      ) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [...composedRef])
}
