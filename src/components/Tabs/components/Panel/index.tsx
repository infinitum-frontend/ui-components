import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  useEffect,
  useId
} from 'react'
import useTabsContext from 'Components/Tabs/context/useTabsContext'

export interface TabPanelProps extends ComponentPropsWithoutRef<'section'> {
  as?: ElementType
}

const TabPanel = ({
  as = 'section',
  children
}: TabPanelProps): ReactElement | null => {
  const { registerPanel, unregisterPanel, selectedIndex, panels } =
    useTabsContext()

  const id = useId()
  const panelIndex = panels.findIndex((panel) => panel === id)
  const Component = as

  useEffect(() => {
    registerPanel(id)

    return () => unregisterPanel(id)
  }, [])

  if (panelIndex !== selectedIndex) {
    return null
  }

  return <Component>{children}</Component>
}

export default TabPanel
