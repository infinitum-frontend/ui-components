import { ChangeEvent, ComponentPropsWithoutRef, ReactElement } from 'react'
import RadioGroupContext from './RadioGroupContext'
import { Radio } from './index'
import './group.scss'
import { RadioProps } from './Radio'
import cn from 'classnames'

export interface RadioGroupProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Название группы радио кнопок */
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void
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

const RadioButton = ({ children, ...props }: RadioProps): ReactElement => {
  return <Radio {...props}>{children}</Radio>
}

if (process.env.NODE_ENV !== 'production') {
  RadioButton.displayName = 'RadioGroup.Radio'
}

RadioGroup.Radio = RadioButton

export default RadioGroup
