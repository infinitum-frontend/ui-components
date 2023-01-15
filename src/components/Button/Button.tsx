import './Button.scss'
import React, {
  ReactNode
} from 'react'
import { TestSelectors } from '../../../test/selectors'
import cn from 'classnames'

// добавить стили для block
// добавить
// тип для атрибуты href

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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children = 'Кнопка',
  className = '',
  as = 'button',
  variant = 'primary',
  size = 'medium',
  loading = false,
  block = false,
  ...props
}, ref) => {
  const Component = as

  return (
    <Component
      className={cn(
        'inf-button', className,
        `inf-button--variant-${variant}`,
        `inf-button--size-${size}`,
        {
          'inf-button--block': block
        }
      )}
      ref={ref}
      data-testid={TestSelectors.button.root}
      type="button"
      {...props}>
      {loading ? 'Loading ...' : (children)}
    </Component>
  )
})

Button.displayName = 'Button'

Button.defaultProps = {
  disabled: false
}

export default Button
