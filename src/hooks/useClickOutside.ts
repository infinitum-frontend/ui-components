import { useEffect } from 'react'

export function useClickOutside(
  element: HTMLElement | HTMLElement[],
  handler: (event: MouseEvent) => void
): void {
  const composedElements = Array.isArray(element) ? element : [element]
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        !composedElements.filter((el) =>
          el?.contains(event.target as HTMLElement)
        ).length
      ) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [...composedElements])
}
