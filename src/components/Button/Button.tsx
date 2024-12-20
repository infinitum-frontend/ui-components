// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ElementType,
  forwardRef,
  ReactElement,
  ReactNode,
  useContext
} from 'react'
import cn from 'classnames'
import { Loader } from '../Loader'
import './Button.scss'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import FormContext from 'Components/Form/context/form'

export interface ButtonProps {
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
  variant?: 'primary' | 'secondary' | 'ghost'
  // outlined?: boolean TODO: IDD-303
  // plain?: boolean TODO: IDD-303
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

function BaseButton<C extends ElementType = 'button'>(
  props: PolymorphicComponent<C, ButtonProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const {
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
    disabled: disabledProp,
    ...rest
  } = props

  const formContext = useContext(FormContext)
  const disabled = disabledProp || formContext?.disabled
  const Component = as

  return (
    <Component
      ref={ref}
      className={cn(
        'inf-button',
        className,
        `inf-button--variant-${variant as string}`,
        `inf-button--size-${size as string}`,
        {
          'inf-button--block': block,
          'inf-button--loading': loading,
          'inf-button--square': icon,
          'inf-button--disabled': disabled
        }
      )}
      type="button"
      disabled={disabled}
      {...rest}
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
        <Loader className="inf-button__loader" size="compact" variant="unset" />
      )}
    </Component>
  )
}

const Button = forwardRef(BaseButton)

/** Компонент кнопки, используемый для инициализации различных действий */
export default Button as typeof BaseButton
