// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import cn from 'classnames'
import './Card.scss'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'

function BaseCard<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C>,
  ref: PolymorphicRef<C>
): ReactElement {
  const { children, className, as = 'div', ...rest } = props
  const Component = as

  return (
    <Component ref={ref} className={cn('inf-card', className)} {...rest}>
      {children}
    </Component>
  )
}

const Card = forwardRef(BaseCard)

export default Card as typeof BaseCard
