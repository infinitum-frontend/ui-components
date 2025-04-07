import React, { ComponentPropsWithoutRef } from 'react'
import './SelectEmpty.scss'
import cn from 'classnames'
import { Text } from '~/src/components/Text'

export interface SelectEmptyProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}

const SelectEmpty = React.forwardRef<HTMLDivElement, SelectEmptyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inf-select-empty', className)} {...props}>
        <Text variant="body-2" color="tertiary" alignment="center">
          Ничего не найдено
        </Text>
      </div>
    )
  }
)

SelectEmpty.displayName = 'SelectEmpty'

export default SelectEmpty
