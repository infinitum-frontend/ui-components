// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ClearIcon from 'Icons/cancel-circle.svg?react'
import cn from 'classnames'
import { ElementType, forwardRef, ReactElement } from 'react'
import { PolymorphicComponent, PolymorphicRef } from '~/src/utils/types'
import './ClearButton.scss'

export interface ClearButtonProps {
  className?: string
}

// TODO: нужно ли сохранить опцию проброса кастомной иконки. Пример есть в Input allowClear

function BaseComponent<C extends ElementType = 'button'>(
  props: PolymorphicComponent<C, ClearButtonProps>,
  ref: PolymorphicRef<C>
): ReactElement {
  const { as = 'button', className, ...rest } = props

  const Component = as

  return (
    <Component
      className={cn('inf-clear-button', className)}
      ref={ref}
      {...rest}
    >
      <ClearIcon className="inf-clear-button__icon" width={20} height={20} />
    </Component>
  )
}

const ClearButton = forwardRef(BaseComponent)

/** Компонент кнопки-очистки */
export default ClearButton as typeof BaseComponent
