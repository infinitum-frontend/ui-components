// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactElement
} from 'react'
import { Box } from 'Components/Box'
import cn from 'classnames'
import './RadioBox.scss'

export interface RadioBoxProps
  extends Omit<ComponentPropsWithoutRef<'label'>, 'color'> {}

const RadioBox = forwardRef<
  HTMLLabelElement,
  Omit<ComponentPropsWithoutRef<'label'>, 'color'>
>(({ children, className, ...props }, ref): ReactElement => {
  return (
    <Box
      ref={ref}
      className={cn('inf-radio-box', className)}
      as="label"
      background="default"
      borderRadius="small"
      borderColor="default"
      borderWidth="default"
      paddingY="small"
      paddingX="medium"
      cursor="pointer"
      {...props}
    >
      {children}
    </Box>
  )
})

RadioBox.displayName = 'Radio.Box'

export default RadioBox
