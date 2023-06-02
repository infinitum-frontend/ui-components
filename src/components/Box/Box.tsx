// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  CSSProperties,
  ElementType,
  forwardRef,
  ReactElement
} from 'react'
import './Box.scss'
import cn from 'classnames'
import {
  PolymorphicComponent,
  PolymorphicRef,
  SpaceVariants
} from '~/src/utils/types'

export interface BoxProps {
  background?: 'base' | 'secondary' | 'inverse'
  padding?: SpaceVariants
}

function BaseBox<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, BoxProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    className,
    children,
    as = 'div',
    padding,
    background,
    ...rest
  } = props
  const Component = as

  const styles = {
    padding: padding ? `var(--inf-space-${padding as string})` : false,
    backgroundColor: background
      ? `var(--inf-color-background-${background as string})`
      : false
  }

  return (
    <Component
      ref={ref}
      className={cn('inf-box', className)}
      style={styles as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  )
}

export const Box = forwardRef(BaseBox) as typeof BaseBox
