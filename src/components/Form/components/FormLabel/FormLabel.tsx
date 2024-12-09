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
  showRequiredIndicator?: boolean
  customIndicator?: ReactNode
}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  (
    { id, showRequiredIndicator, customIndicator, style, children, ...props },
    ref
  ): ReactElement => {
    const formContext = useContext(FormContext)
    const formGroupContext = useContext(FormGroupContext)

    const htmlFor = id || formGroupContext?.id

    return (
      <label
        className={'inf-form-label'}
        htmlFor={htmlFor}
        ref={ref}
        {...props}
        style={{ ...style, width: formContext?.labelWidth || 'initial' }}
      >
        {children}
        {showRequiredIndicator || formGroupContext?.required ? (
          <span
            className={'inf-form-label__required-indicator'}
            aria-label={'required'}
          >
            {customIndicator || '*'}
          </span>
        ) : null}
      </label>
    )
  }
)

FormLabel.displayName = 'Form.Label'

export default FormLabel
