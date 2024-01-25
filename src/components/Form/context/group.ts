import { createContext } from 'react'

export interface IFormGroupContext {
  id?: string
  required?: boolean
  customValidationMessage?: string
  setErrorMessage: (value: string) => void
  invalid?: boolean
  setInvalid?: (value: boolean) => void
}

const FormGroupContext = createContext<IFormGroupContext | null>(null)

export default FormGroupContext
