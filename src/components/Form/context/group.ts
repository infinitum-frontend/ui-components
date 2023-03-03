import { createContext, useContext } from 'react'

export interface IFormGroupContext {
  id?: string
  required?: boolean
  invalidMessage?: string
  invalid?: boolean
  setInvalid?: (value: boolean) => void
}

const FormGroupContext = createContext<IFormGroupContext | null>(null)

export function useFormGroup(): IFormGroupContext | null {
  return useContext(FormGroupContext)
}

export default FormGroupContext
