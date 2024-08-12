// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  ReactElement,
  TextareaHTMLAttributes,
  useContext,
  useRef,
  useState
} from 'react'
import cn from 'classnames'
import './Textarea.scss'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import FormGroupContext from 'Components/Form/context/group'
import FormContext from 'Components/Form/context/form'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'

export interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onInput' | 'onChange' | 'onBlur'
  > {
  /** Значение */
  value?: string
  onInput?: (value: string, event: FormEvent<HTMLTextAreaElement>) => void
  onChange?: (value: string, event: FormEvent<HTMLTextAreaElement>) => void
  onBlur?: FocusEventHandler<HTMLTextAreaElement>
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
  /** Вырезать пробельные символы с концов строки при blur */
  trim?: boolean
}

/** Компонент ввода для написания объемного текста */
const Textarea = ({
  resize = 'none',
  block = false,
  disabled: disabledProp = false,
  placeholder = 'Введите значение',
  trim = true,
  defaultValue,
  value,
  className,
  status,
  onInput,
  onChange,
  onBlur,
  id,
  required = false,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  ...props
}: TextareaProps): ReactElement => {
  // обработка состояния
  const [isFocused, setFocus] = useState(false)

  const formData = useContext(FormContext)
  const formGroupData = useContext(FormGroupContext)
  const { onControlChange, onControlInvalid } = useFormControlHandlers()

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const disabled = disabledProp || formData?.disabled

  const handleChange: FormEventHandler<HTMLTextAreaElement> = (e) => {
    onControlChange(e)

    const domValue = (e.target as HTMLTextAreaElement).value
    onChange?.(domValue, e)
    onInput?.(domValue, e)
  }

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    if (textareaRef.current && trim) {
      textareaRef.current.value = (e.target as HTMLTextAreaElement).value.trim()
    }

    setFocus(false)
    onBlur?.(e)
  }

  const classNames = cn(
    'inf-textarea',
    TextFieldClasses.main,
    TextFieldClasses.borderRadius.regular,
    className,
    {
      'inf-textarea--block': block,
      [TextFieldClasses.status[status as 'error']]: status,
      [`inf-textarea--resize-${resize as string}`]: resize,
      [TextFieldClasses.focused]: isFocused
    }
  )

  return (
    <textarea
      placeholder={placeholder}
      className={classNames}
      defaultValue={defaultValue}
      value={value}
      id={id || formGroupData?.id}
      onChange={handleChange}
      onBlur={handleBlur}
      onInvalid={onControlInvalid}
      disabled={disabled}
      ref={textareaRef}
      required={formGroupData?.required || required}
      aria-required={formGroupData?.required || ariaRequired}
      aria-invalid={formGroupData?.invalid || ariaInvalid}
      {...props}
    />
  )
}

export default Textarea
