// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import cn from 'classnames'
import './Card.scss'

export interface CardProps {
  size?: 'medium' | 'large'
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
    outlineVariant,
    ...rest
  } = props

  const Component = as

  return (
    <Component
      ref={ref}
      className={cn('inf-card', className, `inf-card--size-${size as string}`, {
        [`inf-card--outline-${outlineVariant as string}`]: outlineVariant
      })}
      {...rest}
    >
      {children}
    </Component>
  )

  // TODO: Возможно в будущем стоит реализовать через Box
  // const sizeToPadding = {
  //   medium: 'medium',
  //   large: 'large'
  // }

  // let borderProps

  // if (outlineVariant) {
  //   borderProps = {
  //     borderWidth: 'thick',
  //     borderColor: 'danger'
  //   }
  // }

  // return (
  //   <Box
  //     ref={ref}
  //     className={cn('inf-card', className)}
  //     as={as}
  //     boxShadow="medium"
  //     borderRadius="small"
  //     background="default"
  //     padding={sizeToPadding[size]}
  //     {...borderProps}
  //     {...rest}
  //   >
  //     {children}
  //   </Box>
  // )
}

const Card = forwardRef(BaseCard)

export default Card as typeof BaseCard
