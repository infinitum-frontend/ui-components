// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import classNames from 'classnames'
import { TextProps } from './types'
import './Text.scss'

const SizeToVariant: Record<
  NonNullable<TextProps['size']>,
  TextProps['variant']
> = {
  xsmall: 'overline',
  small: 'body-2',
  medium: 'body-1',
  large: 'subtitle-1'
}

function BaseText<C extends ElementType = 'div'>(
  props: PolymorphicComponent<C, TextProps<C>>,
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
    as = 'div',
    ...rest
  } = props

  const composedColor = color || tone
  // @ts-expect-error тк variant задан по умолчанию, делаем так, чтобы size сработал при его наличии
  const composedVariant = SizeToVariant[size] || variant

  const getClassNames: () => string = () => {
    return classNames(
      'inf-text',
      className,
      `inf-text--variant-${composedVariant as string}`,
      {
        'inf-text--uppercase': uppercase,
        'inf-text--truncated': truncated,
        [`inf-text--color-${composedColor as string}`]: composedColor,
        [`inf-text--weight-${weight as string}`]: weight,
        [`inf-text--alignment-${alignment as string}`]: alignment !== 'left'
      }
    )
  }

  const Component = as

  return (
    <Component ref={ref} className={getClassNames()} {...rest}>
      {children}
    </Component>
  )
}

const Text = forwardRef(BaseText)
/** Компонент для отображения текста */
export default Text as typeof BaseText
