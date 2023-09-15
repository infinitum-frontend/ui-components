import { createContext, useContext } from 'react'
import { UsePopover } from 'Components/Popover/types'

type PopoverContextType = UsePopover | null
export const PopoverContext = createContext<PopoverContextType>(null)

export const usePopoverContext = (): UsePopover => {
  const context = useContext<PopoverContextType>(PopoverContext)

  if (!context) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }

  return context
}
