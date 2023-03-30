import { DependencyList, EffectCallback, useEffect } from 'react'

import useIsFirstRender from 'Hooks/useIsFirstRender'

function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirst = useIsFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
  }, deps)
}

export default useUpdateEffect
