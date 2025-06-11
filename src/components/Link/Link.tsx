// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode
} from 'react'
import classNames from 'classnames'
import './Link.scss'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import { IconArrowUpRight01Sharp } from '@infinitum-ui/icons'
import { Icon } from '../Icon'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LinkProps
  extends Omit<
    ComponentPropsWithoutRef<'button'>,
    'multiline' | 'prefix' | 'suffix'
  > {
  /** Поддержка многострочной ссылки */
  multiline?: boolean
  /**
   * Контент слева от текста
   */
  prefix?: boolean | ReactNode
  /**
   * Контент справа от текста
   */
  suffix?: boolean | ReactNode
}

function BaseLink<C extends ElementType = 'a'>(
  props: PolymorphicComponent<C, LinkProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
    as = 'a',
    children,
    className,
    multiline,
    prefix,
    suffix,
    ...rest
  } = props

  const getClassNames: () => string = () => {
    return classNames('inf-link', className, {
      'inf-link--multiline': multiline
    })
  }

  const Component = as

  const getDefaultIcon = (value: 'prefix' | 'suffix'): ReactNode => {
    const defaultIcon = <IconArrowUpRight01Sharp />

    const iconPrefix = isValidElement(prefix) ? prefix : defaultIcon
    const iconSuffix = isValidElement(suffix) ? suffix : defaultIcon

    return (
      <span
        className={classNames('inf-link__default-icon', {
          'inf-link--prefix': value === 'prefix',
          'inf-link--suffix': value === 'suffix'
        })}
      >
        <Icon size="medium">
          {value === 'prefix' ? iconPrefix : iconSuffix}
        </Icon>
      </span>
    )
  }

  return (
    <Component ref={ref} className={getClassNames()} {...rest}>
      {prefix && getDefaultIcon('prefix')}
      {children}
      {suffix && getDefaultIcon('suffix')}
    </Component>
  )
}

const Link = forwardRef(BaseLink)

/** Компонент ссылки */
export default Link as typeof BaseLink
