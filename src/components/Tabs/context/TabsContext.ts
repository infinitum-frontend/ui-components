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
  variant?: 'default' | 'uppercase' | 'underline'
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
  variant: 'default'
})

export default TabsContext
