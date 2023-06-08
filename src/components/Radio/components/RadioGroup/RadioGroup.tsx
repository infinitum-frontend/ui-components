// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactElement
} from 'react'
import RadioGroupContext from './context/RadioGroupContext'
import './RadioGroup.scss'
import cn from 'classnames'

export interface RadioGroupProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Название группы радио кнопок */
  name: string
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  /** Значение выбранной радиокнопки */
  value: string
  direction?: 'vertical'
  required?: boolean
}

const RadioGroup = ({
  name,
  onChange,
  value = '',
  children,
  direction = 'vertical',
  required,
  className,
  ...props
}: RadioGroupProps): ReactElement => {
  const context = {
    value,
    name,
    onChange,
    required
  }

  return (
    <RadioGroupContext.Provider value={context}>
      <div
        className={cn(
          'inf-radio-group',
          `inf-radio-group--direction-${direction}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export default RadioGroup
