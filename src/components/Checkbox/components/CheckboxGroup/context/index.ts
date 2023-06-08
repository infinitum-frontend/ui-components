import { createContext, ChangeEvent, useContext } from 'react'

export interface ICheckboxGroupContext {
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  value: string[]
}

/**
 * @ignore - internal component.
 */
const CheckboxGroupContext = createContext<ICheckboxGroupContext | undefined>(
  undefined
)

if (process.env.NODE_ENV !== 'production') {
  CheckboxGroupContext.displayName = 'RadioGroupContext'
}

export function useCheckboxGroup(): ICheckboxGroupContext | undefined {
  return useContext(CheckboxGroupContext)
}

export default CheckboxGroupContext
