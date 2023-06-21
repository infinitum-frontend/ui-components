import { createContext, CSSProperties } from 'react'

export interface IFormContext {
  labelWidth?: CSSProperties['width']
  disabled?: boolean
}

const FormContext = createContext<IFormContext | null>(null)

export default FormContext
