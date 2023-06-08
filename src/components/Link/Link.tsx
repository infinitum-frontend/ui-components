// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ElementType, forwardRef, ReactElement } from 'react'
import classNames from 'classnames'
import './Link.scss'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LinkProps {
  // underline: 'always' | 'hover' | 'none'
  // weight?: 'normal' | 'bold'
}

function BaseLink<C extends ElementType = 'a'>(
  props: PolymorphicComponent<C, LinkProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const { as = 'a', children, className, ...rest } = props

  const getClassNames: () => string = () => {
    return classNames('inf-link', className)
  }

  const Component = as

  return (
    <Component ref={ref} className={getClassNames()} {...rest}>
      {children}
    </Component>
  )
}

const Link = forwardRef(BaseLink)

/** Компонент ссылки */
export default Link as typeof BaseLink
