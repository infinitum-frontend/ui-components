import { Loader } from '../Loader'
import React, { ReactNode } from 'react'
import { TestSelectors } from 'Test/selectors'
import cn from 'classnames'
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
  variant?: 'primary' | 'secondary' | 'default' | 'text'
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
   * Иконка слева от текста
   */
  iconLeft?: ReactNode
  /**
   * Иконка справа от текста
   */
  iconRight?: ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      as = 'button',
      variant = 'primary',
      size = 'medium',
      loading = false,
      block = false,
      iconLeft,
      iconRight,
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
        data-testid={TestSelectors.button.root}
        type="button"
        {...props}
      >
        <span className="inf-button__content">
          {icon ? (
            <span className="inf-button__icon">{icon}</span>
          ) : (
            <>
              {iconLeft && (
                <span className="inf-button__left-icon">{iconLeft}</span>
              )}
              <span className="inf-button__text">{children}</span>
              {iconRight && (
                <span className="inf-button__right-icon">{iconRight}</span>
              )}
            </>
          )}
        </span>

        {loading && <Loader className="inf-button__loader" size="compact" />}
      </Component>
    )
  }
)

Button.displayName = 'Button'

Button.defaultProps = {
  disabled: false
}

export default Button
