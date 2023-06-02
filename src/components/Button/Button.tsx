import React, { ReactNode } from 'react'
import cn from 'classnames'
import { Loader, Size, Variant } from '../Loader'
import './Button.scss'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * Элемент для рендеринга
   * @default 'button'
   */
  as?: React.ElementType<any>
  /**
   * Содержимое
   */
  children?: ReactNode
  /**
   * Дополнительный className
   */
  className?: string
  /**
   * Вариант оформления
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'
  /**
   * Размер
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Состояние недоступности
   */
  disabled?: boolean
  /**
   * Состояние загрузки
   */
  loading?: boolean
  /**
   * Занимает всю ширину контейнера
   */
  block?: boolean
  /**
   * Иконка (без текста)
   */
  icon?: ReactNode
  /**
   * Контент слева от текста
   */
  before?: ReactNode
  /**
   * Контент справа от текста
   */
  after?: ReactNode
}

/** Компонент кнопки, используемый для инициализации различных действий */
const Button = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(
  (
    {
      children,
      className,
      as = 'button',
      variant = 'primary',
      size = 'medium',
      loading = false,
      block = false,
      before,
      after,
      icon,
      ...props
    },
    ref
  ) => {
    const Component = as

    return (
      <Component
        ref={ref}
        className={cn(
          'inf-button',
          className,
          `inf-button--variant-${variant}`,
          `inf-button--size-${size}`,
          {
            'inf-button--block': block,
            'inf-button--loading': loading,
            'inf-button--square': icon
          }
        )}
        type="button"
        {...props}
      >
        <span className="inf-button__content">
          {icon ? (
            <span className="inf-button__icon">{icon}</span>
          ) : (
            <>
              {before && <span className="inf-button__before">{before}</span>}
              <span className="inf-button__text">{children}</span>
              {after && <span className="inf-button__after">{after}</span>}
            </>
          )}
        </span>

        {loading && (
          <Loader
            className="inf-button__loader"
            size={Size.Compact}
            variant={Variant.Unset}
          />
        )}
      </Component>
    )
  }
)

Button.displayName = 'Button'

Button.defaultProps = {
  disabled: false
}

export default Button
