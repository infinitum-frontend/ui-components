// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import cn from 'classnames'
import './Card.scss'

export interface CardProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'shadow' | 'outline'
  hoverable?: boolean
  disabled?: boolean
  outlineVariant?: 'danger'
}

function BaseCard<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, CardProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    children,
    className,
    as = 'div',
    size = 'medium',
    variant = 'outline',
    outlineVariant,
    disabled,
    hoverable,
    ...rest
  } = props

  const Component = as

  return (
    <Component
      ref={ref}
      as={as}
      className={cn(
        'inf-card',
        className,
        `inf-card--variant-${variant as string}`,
        `inf-card--size-${size as string}`,
        {
          'inf-card--hoverable': hoverable,
          'inf-card--disabled': disabled,
          [`inf-card--outline-${outlineVariant as string}`]: outlineVariant
        }
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}

const Card = forwardRef(BaseCard)

export default Card as typeof BaseCard
