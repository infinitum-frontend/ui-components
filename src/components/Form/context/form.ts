import { createContext, CSSProperties, RefObject, useContext } from 'react'

export interface IFormContext {
  labelWidth?: CSSProperties['width']
  form: RefObject<HTMLFormElement> | null
  disabled?: boolean
}

const FormContext = createContext<IFormContext>({
  form: null
})

export function useForm(): IFormContext {
  return useContext(FormContext)
}

export default FormContext
