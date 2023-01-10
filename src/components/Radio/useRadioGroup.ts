import { useContext } from 'react'
import RadioGroupContext, { RadioGroupContextValue } from './RadioGroupContext'

export default function useRadioGroup(): RadioGroupContextValue | undefined {
  return useContext(RadioGroupContext)
}
