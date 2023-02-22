// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, ReactElement, useEffect, useId } from 'react'
import useTabsContext from 'Components/Tabs/context/useTabsContext'
import { PolymorphicComponent } from '~/src/utils/types'

const TabPanel = <C extends ElementType = 'div'>({
  as,
  children,
  ...props
}: PolymorphicComponent<C, {}>): ReactElement | null => {
  const { registerPanel, unregisterPanel, selectedIndex, panels } =
    useTabsContext()

  const id = useId()
  const panelIndex = panels.findIndex((panel) => panel === id)
  const Component = as || 'div'

  useEffect(() => {
    registerPanel(id)

    return () => unregisterPanel(id)
  }, [])

  if (panelIndex !== selectedIndex) {
    return null
  }

  return <Component {...props}>{children}</Component>
}

export default TabPanel
