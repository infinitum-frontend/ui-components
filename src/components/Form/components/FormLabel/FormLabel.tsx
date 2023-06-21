// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useContext
} from 'react'
import './FormLabel.scss'
import FormContext from 'Components/Form/context/form'
import FormGroupContext from 'Components/Form/context/group'

export interface FormLabelProps extends ComponentPropsWithoutRef<'label'> {
  /** htmlId */
  id?: string
  requiredIndicator?: ReactNode
}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ id, requiredIndicator, style, children, ...props }, ref): ReactElement => {
    const formData = useContext(FormContext)
    const formGroupData = useContext(FormGroupContext)

    const htmlFor = id || formGroupData?.id
    const showRequiredIndicator = formGroupData?.required || requiredIndicator

    return (
      <label
        className={'inf-form-label'}
        htmlFor={htmlFor}
        ref={ref}
        {...props}
        style={{ ...style, width: formData?.labelWidth || 'initial' }}
      >
        {children}
        {showRequiredIndicator ? (
          <span
            className={'inf-form-label__required-indicator'}
            aria-label={'required'}
          >
            {requiredIndicator || '*'}
          </span>
        ) : null}
      </label>
    )
  }
)

FormLabel.displayName = 'Form.Label'

export default FormLabel
