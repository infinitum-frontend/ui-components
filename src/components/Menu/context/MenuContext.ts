import { createContext } from 'react'

export interface IMenuContext {
  nested?: boolean
  borderRadius?: 'unset' | 'regular'
  disablePadding?: boolean
}
const MenuContext = createContext<IMenuContext | null>(null)

export default MenuContext
