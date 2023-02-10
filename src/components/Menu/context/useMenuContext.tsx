import MenuContext, { IMenuContext } from 'Components/Menu/context/MenuContext'
import { useContext } from 'react'

export default function useMenuContext(): IMenuContext | null {
  return useContext(MenuContext)
}
