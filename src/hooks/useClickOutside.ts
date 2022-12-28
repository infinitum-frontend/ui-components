import { RefObject, useEffect, useState } from 'react'

export function useClickOutside(ref: RefObject<any>): boolean {
  const [isClickedOutside, setClickOutside] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target)) {
        setClickOutside(true)
      } else {
        setClickOutside(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return isClickedOutside
}
