// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactElement
} from 'react'
import { Box } from 'Components/Box'
import cn from 'classnames'
import './CheckboxBox.scss'

export interface CheckboxBoxProps
  extends Omit<ComponentPropsWithoutRef<'label'>, 'color'> {}

const CheckboxBox = forwardRef<
  HTMLLabelElement,
  Omit<ComponentPropsWithoutRef<'label'>, 'color'>
>(({ children, className, ...props }, ref): ReactElement => {
  return (
    <Box
      ref={ref}
      className={cn('inf-checkbox-box', className)}
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

CheckboxBox.displayName = 'Checkbox.Box'

export default CheckboxBox
