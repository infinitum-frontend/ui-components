import React, { ComponentPropsWithoutRef } from 'react'
import './SelectDropdownHint.scss'
import cn from 'classnames'
import { Text } from '~/src/components/Text'
import { Icon } from '~/src/components/Icon'
import IconInfoCircle from 'Icons/info-circle.svg?react'

export interface SelectDropdownHintProps
  extends ComponentPropsWithoutRef<'div'> {
  className?: string
  hint: string
}

const SelectDropdownHint = React.forwardRef<
  HTMLDivElement,
  SelectDropdownHintProps
>(({ className, hint, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('inf-select-dropdown-hint', className)}
      {...props}
    >
      <Icon size="medium" color="primary">
        <IconInfoCircle />
      </Icon>
      <Text variant="body-2" color="tertiary">
        {hint}
      </Text>
    </div>
  )
})

SelectDropdownHint.displayName = 'SelectDropdownHint'

export default SelectDropdownHint
