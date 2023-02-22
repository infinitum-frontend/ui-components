// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { forwardRef, ReactElement } from 'react'
import Text, { TextProps } from 'Components/Text/Text'
import cn from 'classnames'

export interface FormErrorMessageProps extends Omit<TextProps, 'tone'> {}

const FormErrorMessage = forwardRef<HTMLDivElement, FormErrorMessageProps>(
  ({ children, className, size = 'small', ...props }, ref): ReactElement => {
    return (
      <Text
        ref={ref}
        className={cn(className, 'inf-form-hint')}
        size={size}
        tone={'danger'}
        {...props}
      >
        {children}
      </Text>
    )
  }
)

FormErrorMessage.displayName = 'Form.ErrorMessage'

export default FormErrorMessage
