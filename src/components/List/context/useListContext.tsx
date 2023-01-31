import ListContext, { IListContext } from 'Components/List/context/ListContext'
import { useContext } from 'react'

export default function useListContext(): IListContext | null {
  return useContext(ListContext)
}
