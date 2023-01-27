import { ComponentPropsWithoutRef, ReactElement, ChangeEvent } from 'react'
import classNames from 'classnames'
import '../style/group.scss'
import CheckboxGroupContext from 'Components/Checkbox/context'

export interface CheckboxGroupProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  onChange?: (value: string[]) => void
  /** Массив выбранных значений */
  value?: string[]
  direction?: 'vertical'
}

/** Компонент для работы с группой Чекбоксов. Для работы необходимо каждому чекбоксу прописать уникальный value */
const CheckboxGroup = ({
  children,
  onChange,
  direction = 'vertical',
  className,
  value = [],
  ...props
}: CheckboxGroupProps): ReactElement => {
  const handleChange = (val: string, e: ChangeEvent): void => {
    if (value?.includes(val) && !(e.target as HTMLInputElement).checked) {
      onChange?.(value?.filter((el) => el !== val))
    }

    if (!value?.includes(val) && (e.target as HTMLInputElement).checked) {
      onChange?.([...value, val])
    }
  }
  const context = {
    value,
    onChange: handleChange
  }

  return (
    <CheckboxGroupContext.Provider value={context}>
      <div
        className={classNames(
          'inf-checkbox-group',
          `inf-checkbox-group--direction-${direction}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  )
}

export default CheckboxGroup
