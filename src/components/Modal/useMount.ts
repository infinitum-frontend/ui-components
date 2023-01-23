import { useState, useEffect } from 'react'
import { ANIMATION_TIME } from './Modal'

export function useMount(open: boolean): { mounted: boolean } {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (open && !mounted) {
      setMounted(true)
    } else if (!open && mounted) {
      setTimeout(() => {
        setMounted(false)
      }, ANIMATION_TIME)
    }
  }, [open])

  return {
    mounted
  }
}
