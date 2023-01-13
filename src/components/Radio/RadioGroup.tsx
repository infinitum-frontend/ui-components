import { ChangeEvent, ComponentPropsWithoutRef, ReactElement } from 'react'
import RadioGroupContext from './RadioGroupContext'
import { Radio } from './index'
import './group.scss'
import classNames from 'classnames'
import { RadioProps } from './Radio'

export interface RadioGroupProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Название группы радио кнопок */
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void
  /** Значение выбранной радиокнопки */
  value: string
  direction?: 'vertical'
}

const RadioGroup = ({
  name,
  onChange,
  value = '',
  children,
  direction = 'vertical'
}: RadioGroupProps): ReactElement => {
  const context = {
    value,
    name,
    onChange
  }

  return (
    <RadioGroupContext.Provider value={context}>
      <div className={classNames('inf-radio-group', `inf-radio-group--direction-${direction}`)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

const RadioButton = ({ children, ...props }: RadioProps): ReactElement => {
  return (<Radio {...props}>{children}</Radio>)
}

if (process.env.NODE_ENV !== 'production') {
  RadioButton.displayName = 'RadioGroup.Radio'
}

RadioGroup.Radio = RadioButton

export default RadioGroup
