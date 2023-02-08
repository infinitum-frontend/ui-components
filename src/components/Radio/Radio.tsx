import {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  ReactElement
} from 'react'
import './index.scss'
import useRadioGroup from './useRadioGroup'
import cn from 'classnames'

export interface RadioProps
  extends Omit<ComponentPropsWithoutRef<'label'>, 'onChange'> {
  /** Состояние недоступности */
  disabled?: boolean
  /** Состояние выбора */
  checked?: boolean
  /** HTML checked. Используется для неконтролируемого чекбокса */
  defaultChecked?: boolean
  onChange?: (checked: boolean, e: ChangeEvent) => void
  /** HTML name */
  name?: string
  /** HTML value */
  value?: string
  required?: boolean
}

const Radio = forwardRef<HTMLLabelElement, RadioProps>(
  (
    {
      disabled = false,
      checked,
      defaultChecked = false,
      onChange,
      children,
      name,
      value,
      className,
      required = false,
      ...props
    },
    ref
  ): ReactElement => {
    const groupData = useRadioGroup()

    if (groupData) {
      name = groupData.name
      checked = value === groupData.value
      required = required || Boolean(groupData.required)
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      groupData
        ? groupData.onChange?.(value || '', e)
        : onChange?.(e.target.checked, e)
    }

    return (
      <label className={cn('inf-radio', className)} ref={ref} {...props}>
        <input
          type={'radio'}
          disabled={disabled}
          name={name}
          value={value}
          required={required}
          defaultChecked={checked !== undefined ? undefined : defaultChecked}
          checked={checked !== undefined ? checked : undefined}
          onChange={handleChange}
        />
        <span
          className={cn('inf-radio__box', {
            'inf-radio__box--disabled': disabled
          })}
        >
          <span className={'inf-radio__dot'} />
        </span>
        <span
          className={cn('inf-radio__label', {
            'inf-radio__label--disabled': disabled
          })}
        >
          {children}
        </span>
      </label>
    )
  }
)

Radio.displayName = 'Radio'

export default Radio
