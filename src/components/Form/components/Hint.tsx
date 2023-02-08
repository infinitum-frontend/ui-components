import { forwardRef, ReactElement } from 'react'
import cn from 'classnames'
import Text, { TextProps } from 'Components/Text/Text'
import '../style/hint.scss'

export interface FormHintProps extends TextProps {}

const FormHint = forwardRef<HTMLDivElement, FormHintProps>(
  (
    { children, className, size = 'small', tone = 'tertiary', ...props },
    ref
  ): ReactElement => {
    return (
      <Text
        ref={ref}
        className={cn(className, 'inf-form-hint')}
        size={size}
        tone={tone}
        {...props}
      >
        {children}
      </Text>
    )
  }
)

FormHint.displayName = 'Form.Hint'

export default FormHint
