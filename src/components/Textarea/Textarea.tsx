import {
  FormEvent,
  FormEventHandler,
  ReactElement,
  TextareaHTMLAttributes
} from 'react'
import cn from 'classnames'
import './index.scss'

export interface ITextareaProps
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
  ...props
}: ITextareaProps): ReactElement => {
  const handleInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    onInput?.((e.target as HTMLTextAreaElement).value, e)
  }

  const classNames = cn('inf-textarea', 'inf-input-common', className, {
    'inf-textarea--block': block,
    [`inf-textarea--status-${status as string}`]: status,
    [`inf-textarea--resize-${resize as string}`]: resize
  })

  return (
    <textarea
      placeholder={placeholder}
      className={classNames}
      value={value}
      onInput={handleInput}
      disabled={disabled}
      {...props}
    />
  )
}

export default Textarea
