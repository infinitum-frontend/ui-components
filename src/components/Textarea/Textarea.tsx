// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  FormEvent,
  FormEventHandler,
  ReactElement,
  TextareaHTMLAttributes,
  useState
} from 'react'
import cn from 'classnames'
import './Textarea.scss'
import { useFormGroup } from 'Components/Form/context/group'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'

export interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onInput' | 'onChange'
  > {
  /** Значение */
  value?: string
  onInput?: (value: string, event: FormEvent<HTMLTextAreaElement>) => void
  onChange?: (value: string, event: FormEvent<HTMLTextAreaElement>) => void
  /** Состояние (ошибка) */
  status?: 'error'
  /**
   * Состояние недоступности
   * @default false
   */
  disabled?: boolean
  /**
   * Плейсхолдер
   * @default 'Введите значение'
   */
  placeholder?: string
  /**
   * Возможные варианты ресайза
   * @default 'none'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  /**
   * Занимает ли контент всю ширину
   * @default false
   */
  block?: boolean
}

/** Компонент ввода для написания объемного текста */
const Textarea = ({
  resize = 'none',
  block = false,
  disabled = false,
  placeholder = 'Введите значение',
  value,
  className,
  status,
  onInput,
  onChange,
  id,
  required = false,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  ...props
}: TextareaProps): ReactElement => {
  const [localValue, setLocalValue] = useState(value || '')
  const formGroupData = useFormGroup()

  const handleChange: FormEventHandler<HTMLTextAreaElement> = (e) => {
    if (formGroupData) {
      e.currentTarget.setCustomValidity('')
      formGroupData.setInvalid?.(!e.currentTarget.checkValidity())
    }

    const domValue = (e.target as HTMLTextAreaElement).value
    if (value === undefined) {
      setLocalValue(domValue)
    }
    onChange?.(domValue, e)
    onInput?.(domValue, e)
  }

  const handleInvalid: FormEventHandler<HTMLTextAreaElement> = (e) => {
    if (formGroupData) {
      e.currentTarget.setCustomValidity(formGroupData.invalidMessage || '')
      formGroupData.setInvalid?.(true)
    }
  }

  const classNames = cn(
    'inf-textarea',
    TextFieldClasses.main,
    TextFieldClasses.borderRadius.regular,
    className,
    {
      'inf-textarea--block': block,
      [TextFieldClasses.filled]: value || localValue,
      [TextFieldClasses.status[status as 'error']]: status,
      [`inf-textarea--resize-${resize as string}`]: resize
    }
  )

  return (
    <textarea
      placeholder={placeholder}
      className={classNames}
      value={value || localValue}
      id={id || formGroupData?.id}
      onChange={handleChange}
      onInvalid={handleInvalid}
      disabled={disabled}
      required={formGroupData?.required || required}
      aria-required={formGroupData?.required || ariaRequired}
      aria-invalid={formGroupData?.invalid || ariaInvalid}
      {...props}
    />
  )
}

export default Textarea
