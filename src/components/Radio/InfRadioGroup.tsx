import { ChangeEvent, ComponentPropsWithoutRef, ReactElement } from 'react'
import RadioGroupContext from './RadioGroupContext'
import './group.scss'
import classNames from 'classnames'

export interface InfRadioGroupProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Название группы радио кнопок */
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void
  /** Значение выбранной радиокнопки */
  value?: string
  direction?: 'vertical'
}

const InfRadioGroup = ({
  name,
  onChange,
  value,
  children,
  direction = 'vertical'
}: InfRadioGroupProps): ReactElement => {
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

export default InfRadioGroup
