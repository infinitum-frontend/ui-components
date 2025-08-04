import React, {
  AriaAttributes,
  ComponentPropsWithoutRef,
  FormEventHandler,
  useId
} from 'react'
import { SelectOption, SelectProps, SelectValue } from '../../utils/types'
import './SelectNativeElement.scss'

export interface SelectNativeElementProps
  extends Omit<
    ComponentPropsWithoutRef<'select'>,
    'value' | 'aria-invalid' | 'aria-required'
  > {
  options: SelectProps['options']
  value: SelectValue | SelectValue[] | undefined
  multiple: boolean
  disabled: boolean
  required: boolean
  ariaRequired?: AriaAttributes['aria-required']
  ariaInvalid?: AriaAttributes['aria-invalid']
  id?: string
  onInvalid: FormEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >
}

const SelectNativeElement = React.forwardRef<
  HTMLSelectElement,
  SelectNativeElementProps
>(
  (
    {
      options,
      value,
      id,
      onInvalid,
      multiple,
      disabled,
      required,
      ariaInvalid,
      ariaRequired,
      ...props
    },
    ref
  ) => {
    const postfix = useId()

    const valueAttr = Array.isArray(value) ? value.map((v) => String(v)) : value

    return (
      <select
        className="inf-select-native-element"
        ref={ref}
        required={required}
        disabled={disabled}
        multiple={multiple}
        id={id}
        value={valueAttr}
        onInvalid={onInvalid}
        onChange={() => {}}
        aria-required={ariaRequired}
        aria-invalid={ariaInvalid}
      >
        <option value={''} />
        {options?.map((item, index) => {
          return 'options' in item ? (
            <optgroup
              key={`group-${String(item.label)}-${index}-${postfix}`}
              label={item.label}
            >
              {item.options.map((option: SelectOption, optionIndex: number) => (
                <option
                  value={option.value}
                  key={`option-${String(
                    option.value
                  )}-${optionIndex}-${postfix}`}
                >
                  {option.label}
                </option>
              ))}
            </optgroup>
          ) : (
            <option
              value={item.value}
              key={`option-${String(item.value)}-${index}-${postfix}`}
            >
              {item.label}
            </option>
          )
        })}
      </select>
    )
  }
)

SelectNativeElement.displayName = 'SelectNativeElement'

export default SelectNativeElement
