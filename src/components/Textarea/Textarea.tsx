// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  FormEvent,
  FormEventHandler,
  ReactElement,
  TextareaHTMLAttributes
} from 'react'
import cn from 'classnames'
import './index.scss'
import { useFormGroup } from 'Components/Form/context/group'

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'> {
  /** Значение */
  value?: string
  onInput?: (value: string, event: FormEvent<HTMLTextAreaElement>) => void
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

/** Компонент Textarea */
const Textarea = ({
  resize = 'none',
  block = false,
  disabled = false,
  placeholder = 'Введите значение',
  value,
  className,
  status,
  onInput,
  id,
  required = false,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  ...props
}: TextareaProps): ReactElement => {
  const formGroupData = useFormGroup()

  const handleInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    if (formGroupData) {
      e.currentTarget.setCustomValidity('')
      formGroupData.setInvalid?.(!e.currentTarget.checkValidity())
    }
    onInput?.((e.target as HTMLTextAreaElement).value, e)
  }

  const handleInvalid: FormEventHandler<HTMLTextAreaElement> = (e) => {
    if (formGroupData) {
      e.currentTarget.setCustomValidity(formGroupData.invalidMessage || '')
      formGroupData.setInvalid?.(true)
    }
  }

  const classNames = cn('inf-textarea', 'inf-input-common', className, {
    'inf-textarea--block': block,
    'inf-textarea--filled': value,
    [`inf-textarea--status-${status as string}`]: status,
    [`inf-textarea--resize-${resize as string}`]: resize
  })

  return (
    <textarea
      placeholder={placeholder}
      className={classNames}
      value={value}
      id={id || formGroupData?.id}
      onInput={handleInput}
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
