// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import classNames from 'classnames'
import { TextProps } from './types'
import './Text.scss'

function BaseText<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, TextProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    children = '',
    className = '',
    variant = 'body-1',
    size,
    weight,
    alignment = 'left',
    tone,
    color,
    truncated = false,
    uppercase = false,
    ...rest
  } = props

  // TODO: map size to variant and tone to color

  const getClassNames: () => string = () => {
    return classNames(
      'inf-text',
      className,
      `inf-text--size-${size as string}`,
      `inf-text--variant-${variant as string}`,
      {
        'inf-text--uppercase': uppercase,
        'inf-text--truncated': truncated,
        [`inf-text--color-${color as string}`]: color,
        [`inf-text--tone-${tone as string}`]: tone,
        [`inf-text--weight-${weight as string}`]: weight,
        [`inf-text--alignment-${alignment as string}`]: alignment !== 'left'
      }
    )
  }

  return (
    <div ref={ref} className={getClassNames()} {...rest}>
      {children}
    </div>
  )
}

const Text = forwardRef(BaseText)
/** Компонент для отображения текста */
export default Text as typeof BaseText
