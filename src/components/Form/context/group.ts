import { createContext, useContext } from 'react'

export interface IFormGroupContext {
  id?: string
}

const FormGroupContext = createContext<IFormGroupContext | null>(null)

export function useFormGroup(): IFormGroupContext | null {
  return useContext(FormGroupContext)
}

export default FormGroupContext
