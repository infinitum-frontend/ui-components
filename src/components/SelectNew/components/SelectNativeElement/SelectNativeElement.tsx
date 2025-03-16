import React, { FormEventHandler, useId } from 'react'
import { SelectProps, SelectValue } from '../../utils/types'
import './SelectNativeElement.scss'

export interface SelectNativeElementProps {
  options: SelectProps['options']
  value: SelectValue | SelectValue[] | undefined
  multiple: boolean
  disabled: boolean
  required: boolean
  id?: string
  onInvalid: FormEventHandler<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >
}

const SelectNativeElement = React.forwardRef<
  HTMLSelectElement,
  SelectNativeElementProps
>(({ options, value, id, onInvalid, multiple, disabled, required }, ref) => {
  const prefix = useId()

  return (
    <select
      className="inf-select-native-element"
      ref={ref}
      required={required}
      disabled={disabled}
      multiple={multiple}
      id={id}
      // @ts-expect-error
      // TODO:
      value={value}
      onInvalid={onInvalid}
      onChange={() => {}}
      // aria-required={formGroupContext?.required || required}
      // aria-invalid={formGroupContext?.invalid}
    >
      <option value={''} />
      {options?.map((item) => {
        return 'options' in item ? (
          <optgroup key={prefix} label={item.label}>
            {item.options.map((option) => (
              <option value={option.value} key={prefix + String(option.value)}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ) : (
          <option value={item.value} key={prefix + String(item.value)}>
            {item.label}
          </option>
        )
      })}
    </select>
  )
})

SelectNativeElement.displayName = 'SelectNativeElement'

export default SelectNativeElement
