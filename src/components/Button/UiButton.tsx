import './index.scss'
import React, {
  ReactElement,
  ReactNode
} from 'react'
import { TestSelectors } from '../../../test/selectors'

export interface IButtonProps {
  /**
   * HTML-атрибут для рендера
   * @default 'button'
   */
  as?: ReactElement
  /**
   * Содержимое
   */
  children?: ReactNode
  /**
   * Вариант оформления
   */
  variant?: keyof typeof ButtonVariants
  /**
   * Размер
   */
  size?: keyof typeof ButtonSizes
  type?: keyof typeof ButtonTypes
  disabled?: boolean
  loading?: boolean
  innerRef?: any
  onClick?: () => void
}

export enum ButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
  accent = 'accent'
}

export enum ButtonSizes {
  medium = 'medium',
  large = 'large',
  small = 'small'
}

export enum ButtonTypes {
  button = 'button',
  submit = 'submit',
  reset = 'reset'
}

const UiButton = (props: IButtonProps): JSX.Element => {
  const {
    children,
    variant = ButtonVariants.primary,
    size = ButtonSizes.medium,
    as = 'button',
    onClick
  } = props

  const Component = 'button'

  return (
    <Component onClick={onClick}
               data-testid={TestSelectors.button.root}
               className={`ui-button ui-button--variant-${variant} ui-button--size-${size}`}>{children}
    </Component>
  )
}

export default UiButton
