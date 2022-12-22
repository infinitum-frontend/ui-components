import './index.scss'
import React, {
  ReactNode
} from 'react'
import { TestSelectors } from '../../../test/selectors'

export interface InfButtonProps extends React.ComponentPropsWithoutRef<'button'> {
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
  variant?: 'primary' | 'secondary' | 'tertiary'
  /**
   * Размер
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Размер
   */
  isLoading?: boolean
  isBlock?: boolean
  innerRef?: any
}

const InfButton = React.forwardRef<HTMLButtonElement, InfButtonProps>(({
  children,
  as = 'button',
  variant = 'primary',
  size = 'medium',
  ...props
}, ref) => {
  const Component = as

  return (
    <Component ref={ref}
               data-testid={TestSelectors.button.root}
               type="button"
               className={`inf-button inf-button--variant-${variant} inf-button--size-${size}`}
               {...props}>
      {children}
    </Component>
  )
})

InfButton.defaultProps = {
  as: 'button',
  children: 'Кнопка',
  variant: 'primary',
  size: 'medium',
  isLoading: false,
  isBlock: false
}

InfButton.displayName = 'InfButton'

export default InfButton
