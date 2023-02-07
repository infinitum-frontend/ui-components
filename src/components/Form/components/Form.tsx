import {
  ComponentPropsWithRef,
  FormEventHandler,
  forwardRef,
  ReactElement
} from 'react'
import cn from 'classnames'
import Label from 'Components/Form/components/Label'
import Group from 'Components/Form/components/Group'
import Hint from 'Components/Form/components/Hint'
import Space, { SpaceProps } from 'Components/Space/Space'

export interface FormProps extends ComponentPropsWithRef<'form'> {
  gap?: SpaceProps['gap']
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    { gap = 'small', children, onSubmit, className, ...props },
    ref
  ): ReactElement => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      onSubmit?.(e)
    }
    return (
      <Space
        as={'form'}
        gap={gap}
        onSubmit={handleSubmit}
        ref={ref}
        className={cn('inf-form', className, {})}
        {...props}
      >
        {children}
      </Space>
    )
  }
)

Form.displayName = 'Form'

export default Object.assign(Form, {
  Group,
  Label,
  Hint
})
