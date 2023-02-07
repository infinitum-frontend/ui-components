import { createContext, useContext } from 'react'

export interface IFormContext {
  id?: string
}

const FormContext = createContext<IFormContext | null>(null)

export function useForm(): IFormContext | null {
  return useContext(FormContext)
}

export default FormContext
