import { useContext } from 'react'
import ListContext, { IListContext } from 'Components/List/context/ListContext'

export default function useListContext(): IListContext | null {
  return useContext(ListContext)
}
