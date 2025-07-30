// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
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
import { Tooltip } from '../Tooltip'
import useTextOverflowTooltip from '~/src/hooks/useTextOverflowTooltip'

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

  const { isOpen, onOpenChange, handleMouseEnter, handleMouseLeave } =
    useTextOverflowTooltip()
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
            <Tooltip
              content={children}
              open={isOpen}
              onOpenChange={onOpenChange}
            >
              <span
                className="inf-button__text"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {children}
              </span>
            </Tooltip>
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
