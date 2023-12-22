// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import { Box } from 'Components/Box'
import cn from 'classnames'

export interface RadioBoxProps extends ComponentPropsWithoutRef<'label'> {}

const RadioBox = ({
  children,
  className
}: // ...props
RadioBoxProps): ReactElement => {
  return (
    <Box
      className={cn('inf-radio-box', className)}
      as="label"
      background="default"
      borderRadius="small"
      borderColor="default"
      borderWidth="default"
      paddingY="small"
      paddingX="medium"
      cursor="pointer"
      // {...props}
    >
      {children}
    </Box>
  )
}

export default RadioBox
