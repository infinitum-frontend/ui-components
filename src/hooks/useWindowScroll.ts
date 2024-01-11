import { useEffect, useState } from 'react'
import useThrottle from 'Hooks/useThrottle'

export interface UseWindowScrollOptions {
  throttle?: number
}

export interface UseWindowScrollResult {
  x: number
  y: number
}

export function useWindowScroll({
  throttle = 0
}: UseWindowScrollOptions = {}): UseWindowScrollResult {
  const [state, setState] = useState({
    x: window.scrollX,
    y: window.scrollY
  })

  const throttleFn = useThrottle(() => {
    setState({ x: window.scrollX, y: window.scrollY })
  }, throttle)

  useEffect(() => {
    throttleFn()
    window.addEventListener('scroll', throttleFn)

    return () => {
      window.removeEventListener('scroll', throttleFn)
    }
  }, [])

  return { x: state.x, y: state.y }
}
