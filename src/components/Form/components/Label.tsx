import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { useForm } from 'Components/Form/context'

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  id?: string
}

const Label = ({ id, children, ...props }: LabelProps): ReactElement => {
  const context = useForm()

  const htmlFor = id || context?.id
  return (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
  )
}

export default Label
