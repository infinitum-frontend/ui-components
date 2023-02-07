import { createContext, ChangeEvent } from 'react'

export interface RadioGroupContextValue {
  name: string
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
  value: string
  required?: boolean
}

/**
 * @ignore - internal component.
 */
const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined
)

if (process.env.NODE_ENV !== 'production') {
  RadioGroupContext.displayName = 'RadioGroupContext'
}

export default RadioGroupContext
