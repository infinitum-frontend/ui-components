import { createContext } from 'react'

export interface ITabsContext {
  selectedIndex: number
  tabs: any[]
  panels: any[]
  registerTab: (value: any) => void
  unregisterTab: (value: any) => void
  registerPanel: (value: any) => void
  unregisterPanel: (value: any) => void
  handleTabClick: (value: any) => void
}
const TabsContext = createContext<ITabsContext>({
  selectedIndex: 0,
  tabs: [],
  panels: [],
  registerTab: (value) => {},
  unregisterTab: (value) => {},
  registerPanel: (value) => {},
  unregisterPanel: (value) => {},
  handleTabClick: (value) => {}
})

export default TabsContext
