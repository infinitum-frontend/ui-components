import React, { createContext, useContext } from 'react'
import { usePopover } from './Popover'

export type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>
      setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>
    })
  | null

export const PopoverContext = createContext<ContextType>(null)

export const usePopoverContext = (): ContextType => {
  const context = useContext(PopoverContext)

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }

  return context
}
