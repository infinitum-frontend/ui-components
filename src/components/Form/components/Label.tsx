import { ComponentPropsWithoutRef, forwardRef, ReactElement } from 'react'
import { useFormGroup } from 'Components/Form/context/group'
import { useForm } from 'Components/Form/context/form'

export interface FormLabelProps extends ComponentPropsWithoutRef<'label'> {
  id?: string
}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ id, style, children, ...props }, ref): ReactElement => {
    const formData = useForm()
    const formGroupData = useFormGroup()

    const htmlFor = id || formGroupData?.id

    return (
      <label
        className={'inf-form-label'}
        htmlFor={htmlFor}
        ref={ref}
        {...props}
        style={{ ...style, width: formData?.labelWidth || 'initial' }}
      >
        {children}
      </label>
    )
  }
)

FormLabel.displayName = 'Form.Label'

export default FormLabel
