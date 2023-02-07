import { ReactElement } from 'react'
import cn from 'classnames'
import Text, { TextProps } from 'Components/Text/Text'

export interface HintProps extends TextProps {}

const Hint = ({
  children,
  className,
  size = 'small',
  tone = 'tertiary',
  ...props
}: HintProps): ReactElement => {
  return (
    <Text
      className={cn(className, 'inf-form-hint')}
      size={size}
      tone={tone}
      {...props}
    >
      {children}
    </Text>
  )
}

export default Hint
