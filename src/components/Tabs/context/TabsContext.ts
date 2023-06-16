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
  size?: 'small' | 'medium'
}
const TabsContext = createContext<ITabsContext>({
  selectedIndex: 0,
  tabs: [],
  panels: [],
  registerTab: () => {},
  unregisterTab: () => {},
  registerPanel: () => {},
  unregisterPanel: () => {},
  handleTabClick: () => {},
  size: 'medium'
})

export default TabsContext
