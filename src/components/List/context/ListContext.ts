import { createContext } from 'react'

export interface IListContext {
  nested?: boolean
  borderRadius?: 'unset' | 'regular'
  raw?: boolean
}
const ListContext = createContext<IListContext | null>(null)

export default ListContext
