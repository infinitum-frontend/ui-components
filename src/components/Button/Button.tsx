import './Button.scss'
import React, {
  ReactNode
} from 'react'
import { TestSelectors } from '../../../test/selectors'

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
   * Вариант оформления
   */
  variant?: 'primary' | 'secondary' | 'default' | 'text'
  /**
   * Размер
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Размер
   */
  loading?: boolean
  block?: boolean
  innerRef?: any
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children = 'Кнопка',
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
      ref={ref}
      data-testid={TestSelectors.button.root}
      type="button"
      className={`inf-button inf-button--variant-${variant} inf-button--size-${size}`}
      {...props}>
      {children}
    </Component>
  )
})

Button.displayName = 'Button'

export default Button
