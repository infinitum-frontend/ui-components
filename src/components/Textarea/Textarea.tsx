// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  FormEvent,
  FormEventHandler,
  ReactElement,
  TextareaHTMLAttributes,
  useContext
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
  disabled: disabledProp = false,
  placeholder = 'Введите значение',
  defaultValue,
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
  const formContext = useContext(FormContext)
  const formGroupContext = useContext(FormGroupContext)
  const { onControlChange, onControlInvalid } = useFormControlHandlers()

  const disabled = disabledProp || formContext?.disabled

  const handleChange: FormEventHandler<HTMLTextAreaElement> = (e) => {
    onControlChange(e)

    const domValue = (e.target as HTMLTextAreaElement).value
    onChange?.(domValue, e)
    onInput?.(domValue, e)
  }

  const classNames = cn(
    'inf-textarea',
    TextFieldClasses.main,
    TextFieldClasses.borderRadius.regular,
    className,
    {
      'inf-textarea--block': block,
      [TextFieldClasses.status[status as 'error']]: status,
      [`inf-textarea--resize-${resize as string}`]: resize
    }
  )

  return (
    <textarea
      placeholder={placeholder}
      className={classNames}
      defaultValue={defaultValue}
      value={value}
      id={id || formGroupContext?.id}
      onChange={handleChange}
      onInvalid={onControlInvalid}
      disabled={disabled}
      required={formGroupContext?.required || required}
      aria-required={formGroupContext?.required || ariaRequired}
      aria-invalid={formGroupContext?.invalid || ariaInvalid}
      {...props}
    />
  )
}

export default Textarea
