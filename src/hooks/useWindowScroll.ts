import { useCallback, useEffect, useState } from 'react'
import useThrottle from 'Hooks/useThrottle'

export interface UseWindowScrollOptions {
  throttleDelay?: number
}

export interface UseWindowScrollResult {
  x: number
  y: number
}

export default function useWindowScroll({
  throttleDelay = 0
}: UseWindowScrollOptions = {}): UseWindowScrollResult {
  const [state, setState] = useState({
    x: window.scrollX,
    y: window.scrollY
  })

  const throttleFn = useCallback(
    useThrottle(() => {
      setState({ x: window.scrollX, y: window.scrollY })
    }, throttleDelay),
    [throttleDelay]
  )

  useEffect(() => {
    throttleFn()
    window.addEventListener('scroll', throttleFn)

    return () => {
      window.removeEventListener('scroll', throttleFn)
    }
  }, [])

  return { x: state.x, y: state.y }
}
