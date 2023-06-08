import { createContext, ChangeEvent } from 'react'

export interface RadioGroupContextValue {
  name: string
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
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
