import { FormEventHandler, useContext } from 'react'
import FormGroupContext from 'Components/Form/context/group'

export default function useFormControlHandlers(): {
  onControlInvalid: FormEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >
  onControlChange: FormEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >
  resetControlValidity: () => void
} {
  const formGroupContext = useContext(FormGroupContext)

  const onControlChange: FormEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  > = (e) => {
    if (formGroupContext) {
      const isValid = e.currentTarget.validity.valid
      const errorMessage =
        formGroupContext.customValidationMessage ||
        e.currentTarget.validationMessage

      if (formGroupContext.invalid) {
        formGroupContext.setErrorMessage?.(isValid ? '' : errorMessage)
        formGroupContext.setInvalid?.(!isValid)
      }
    }
  }

  const resetControlValidity = (): void => {
    if (formGroupContext) {
      formGroupContext.setErrorMessage?.('')
      formGroupContext.setInvalid?.(false)
    }
  }

  const onControlInvalid: FormEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  > = (e) => {
    if (formGroupContext) {
      const errorMessage =
        formGroupContext.customValidationMessage ||
        e.currentTarget.validationMessage

      formGroupContext.setErrorMessage?.(errorMessage)
      formGroupContext.setInvalid?.(true)
    }
  }

  return { onControlInvalid, onControlChange, resetControlValidity }
}
