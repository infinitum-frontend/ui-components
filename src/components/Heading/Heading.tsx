import './index.scss'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import classNames from 'classnames'
import { Level, Align } from './enums'

// TODO: добавить as

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

export interface HeadingProps extends ComponentPropsWithoutRef<HeadingTag> {
  children?: ReactNode
  className?: string
  level?: Level
  align?: Align
  truncated?: boolean
  hasMargin?: boolean
}

/** Компонент заголовка */
const Heading = React.forwardRef<HTMLDivElement, HeadingProps>(
  (
    {
      children = '',
      className = '',
      level = Level.H3,
      align = Align.Left,
      truncated = false,
      hasMargin = false,
      ...props
    },
    ref
  ) => {
    const getClassNames: () => string = () => {
      return classNames(
        'inf-heading',
        className,
        `inf-heading--level-${level}`,
        {
          'inf-heading--truncated': truncated,
          'inf-heading--has-margin': hasMargin,
          [`inf-heading--align-${align}`]: align !== Align.Left
        }
      )
    }

    const LEVEL_MAP: { 1: 'h1'; 2: 'h2'; 3: 'h3'; 4: 'h4' } = {
      1: 'h1',
      2: 'h2',
      3: 'h3',
      4: 'h4'
    }

    const Component = LEVEL_MAP[level]

    return (
      <Component ref={ref} className={getClassNames()} {...props}>
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

export default Object.assign(Heading, {
  Level,
  Align
})
