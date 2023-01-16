import './Button.scss'
import React, { ReactNode } from 'react'
import { TestSelectors } from 'Test/selectors'
import cn from 'classnames'
import { Loader } from '../Loader'

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
  iconLeft?: string
  iconRight?: string
  icon?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children = 'Кнопка',
      className = '',
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
    // const IconLeft = iconLeft
    // const IconRight = iconRight

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
            'inf-button--loading': loading
          }
        )}
        data-testid={TestSelectors.button.root}
        type="button"
        {...props}
      >
        <span className="inf-button__content">
          {/* <span>{iconLeft && <IconLeft />}</span> */}
          <span>{children}</span>
          {/* {iconRight && <IconRight />} */}
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
