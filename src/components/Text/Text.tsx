import './Text.scss'
import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { Size, Weight, Tone, Align } from './enums'

export interface TextProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: ReactNode
  className?: string
  size?: Size
  weight?: Weight
  tone?: Tone
  align?: Align
  truncated?: boolean
  uppercase?: boolean
}

/** Компонент для отображения текста */
const Text = React.forwardRef<HTMLDivElement, TextProps>(
  (
    {
      children = '',
      className = '',
      size = Size.Medium,
      weight = Weight.Normal,
      align = Align.Left,
      tone,
      truncated = false,
      uppercase = false,
      ...props
    },
    ref
  ) => {
    const getClassNames: () => string = () => {
      return classNames(
        'inf-text',
        className,
        `inf-text--size-${size}`,
        `inf-text--weight-${weight}`,
        {
          'inf-text--uppercase': uppercase,
          'inf-text--truncated': truncated,
          [`inf-text--tone-${tone as string}`]: tone,
          [`inf-text--align-${align}`]: align !== Align.Left
        }
      )
    }

    return (
      <div ref={ref} className={getClassNames()} {...props}>
        {children}
      </div>
    )
  }
)

Text.displayName = 'Text'

export default Object.assign(Text, {
  Size,
  Tone,
  Weight,
  Align
})
