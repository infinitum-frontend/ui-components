import { createContext, CSSProperties, useContext } from 'react'

export interface IFormContext {
  labelWidth?: CSSProperties['width']
}

const FormContext = createContext<IFormContext | null>(null)

export function useForm(): IFormContext | null {
  return useContext(FormContext)
}

export default FormContext
