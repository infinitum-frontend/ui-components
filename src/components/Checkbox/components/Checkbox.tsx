// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactElement
} from 'react'
import '../style/index.scss'
import { ReactComponent as CheckIcon } from 'Icons/check.svg'
import { ReactComponent as IndeterminateIcon } from 'Icons/indeterminate.svg'
import cn from 'classnames'
import { useCheckboxGroup } from 'Components/Checkbox/context'

const checkedIcon = <CheckIcon width={'16px'} height={'16px'} />
const indeterminateIcon = <IndeterminateIcon width={'16px'} height={'16px'} />

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<'label'>, 'onChange'> {
  /** Неопределенный вариант чекбокса */
  indeterminate?: boolean
  /** Состояние выбора */
  checked?: boolean
  /** Состояние недоступности */
  disabled?: boolean
  /** HTML checked. Используется для неконтролируемого чекбокса */
  defaultChecked?: boolean
  /** HTML name */
  name?: string
  /** HTML value */
  value?: string
  onChange?: (checked: boolean, e: ChangeEvent) => void
  /** html required */
  required?: boolean
  inputProps?: Omit<
    InputProps,
    | 'type'
    | 'name'
    | 'required'
    | 'value'
    | 'disabled'
    | 'defaultChecked'
    | 'aria-checked'
    | 'checked'
    | 'onChange'
  >
}

// TODO: добавить расположение лейбла

/** Компонент чекбокса */
const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      disabled = false,
      checked,
      defaultChecked = false,
      onChange,
      children,
      name,
      value = '',
      indeterminate = false,
      className,
      required = false,
      inputProps,
      ...props
    },
    ref
  ): ReactElement => {
    const groupData = useCheckboxGroup()

    if (groupData) {
      checked = Boolean(groupData.value.find((el) => el === value))
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      groupData?.onChange?.(value, e) ?? onChange?.(e.target.checked, e)
    }

    const getAriaCheckedAttr: () => InputProps['aria-checked'] = () => {
      if (indeterminate) {
        return 'mixed'
      } else if (checked) {
        return 'true'
      } else {
        return 'false'
      }
    }

    return (
      <label
        className={cn('inf-checkbox', className, {
          'inf-checkbox--disabled': disabled
        })}
        ref={ref}
        {...props}
      >
        <input
          {...inputProps}
          type={'checkbox'}
          name={name}
          value={value}
          aria-checked={getAriaCheckedAttr()}
          disabled={disabled}
          required={required}
          defaultChecked={checked !== undefined ? undefined : defaultChecked}
          checked={checked !== undefined ? checked : undefined}
          onChange={handleChange}
        />
        <span
          className={cn('inf-checkbox__box', {
            'inf-checkbox__box--disabled': disabled,
            'inf-checkbox__box--indeterminate': indeterminate
          })}
        >
          {indeterminate ? indeterminateIcon : checkedIcon}
        </span>
        {children !== undefined && (
          <span className={'inf-checkbox__label'}>{children}</span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
