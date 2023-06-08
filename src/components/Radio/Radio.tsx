// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  FormEventHandler,
  forwardRef,
  InputHTMLAttributes,
  ReactElement
} from 'react'
import './Radio.scss'
import useRadioGroup from './components/RadioGroup/context/useRadioGroup'
import RadioGroup from './components/RadioGroup'
import cn from 'classnames'
import { useFormGroup } from 'Components/Form/context/group'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

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
  inputProps?: Omit<
    InputProps,
    | 'type'
    | 'name'
    | 'required'
    | 'value'
    | 'disabled'
    | 'defaultChecked'
    | 'checked'
    | 'onChange'
    | 'aria-required'
    | 'aria-invalid'
  >
}

/** Компонент для выбора одного элемента из списка */
const Radio = forwardRef<HTMLLabelElement, RadioProps>(
  (
    {
      disabled = false,
      checked,
      defaultChecked = false,
      onChange,
      name,
      value,
      className,
      required = false,
      children,
      ...props
    },
    ref
  ): ReactElement => {
    const groupData = useRadioGroup()
    const formGroupData = useFormGroup()

    if (groupData) {
      name = groupData.name
      checked = value === groupData.value
      required = required || Boolean(groupData.required)
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      groupData
        ? groupData.onChange?.(value || '', e)
        : onChange?.(e.target.checked, e)

      if (formGroupData) {
        e.target.setCustomValidity('')
        formGroupData.setInvalid?.(!e.target.checked)
      }
    }

    const handleInvalid: FormEventHandler<HTMLInputElement> = (e) => {
      if (formGroupData) {
        e.currentTarget.setCustomValidity(formGroupData.invalidMessage || '')
        formGroupData.setInvalid?.(true)
      }
    }

    return (
      <label className={cn('inf-radio', className)} ref={ref} {...props}>
        <input
          type={'radio'}
          disabled={disabled}
          name={name}
          value={value}
          required={formGroupData?.required || required}
          aria-required={formGroupData?.required || required}
          aria-invalid={formGroupData?.invalid || undefined}
          defaultChecked={checked !== undefined ? undefined : defaultChecked}
          checked={checked !== undefined ? checked : undefined}
          onInvalid={handleInvalid}
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

export default Object.assign(Radio, {
  Group: RadioGroup
})
