import cn from 'classnames'
import FormContext from 'Components/Form/context/form'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'
import React, {
  FormEvent,
  FormEventHandler,
  ReactElement,
  ReactNode,
  TextareaHTMLAttributes,
  useContext,
  useRef
} from 'react'
import { mergeRefs } from 'react-merge-refs'
import { TextFieldClasses } from '~/src/utils/textFieldClasses'
import './Textarea.scss'

export interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onInput' | 'onChange' | 'prefix'
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
   * resize
   */
  resize?: boolean
  /** Только чтение */
  readOnly?: boolean
  /** Элемент префикс */
  prefix?: ReactNode
  /**
   * Размер
   */
  size?: 'medium' | 'small'
  // TODO:
  // /** Элемент постфикса */
  // postfix?: ReactNode
  // /** Отображение кнопки очистки выбранного значения. При нажатии на кнопку вызывается обработчик onClear, а если он не был передан, то onChange. */
  // clearable?: boolean
  // /** Обработчик нажатия на кнопку очистки значения, которая отображается при clearable. Можно определить в нём произвольную логику. Если его не передать, то будет вызван onChange */
  // onClear?: () => void
}

/** Компонент ввода для написания объемного текста */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      resize,
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
      readOnly,
      prefix,
      // postfix,
      // clearable,
      // onClear,
      size = 'medium',
      style,
      'aria-required': ariaRequired,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ): ReactElement => {
    const formContext = useContext(FormContext)
    const formGroupContext = useContext(FormGroupContext)
    const { onControlChange, onControlInvalid } = useFormControlHandlers()

    const inputRef = useRef<HTMLTextAreaElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const mergedRef = mergeRefs([inputRef, ref])

    const disabled = disabledProp || formContext?.disabled
    const hasError = status === 'error' || formGroupContext?.invalid

    const handleChange: FormEventHandler<HTMLTextAreaElement> = (e) => {
      onControlChange(e)

      const domValue = (e.target as HTMLTextAreaElement).value
      onChange?.(domValue, e)
      onInput?.(domValue, e)
    }

    const getClassNames: () => string = () => {
      return cn(
        'inf-textarea',
        `inf-textarea--size-${size}`,
        TextFieldClasses.main,
        TextFieldClasses.borderRadius.regular,
        className,
        {
          'inf-textarea--resize': resize,
          [TextFieldClasses.disabled]: disabled,
          [TextFieldClasses.readonly]: readOnly,
          [TextFieldClasses.status.error]: hasError
        }
      )
    }

    return (
      <div ref={wrapperRef} className={getClassNames()} style={style}>
        {prefix && <div className="inf-textarea__prefix">{prefix}</div>}
        <textarea
          ref={mergedRef}
          defaultValue={defaultValue}
          value={value}
          id={id || formGroupContext?.id}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={handleChange}
          onInvalid={onControlInvalid}
          required={formGroupContext?.required || required}
          aria-required={formGroupContext?.required || ariaRequired}
          aria-invalid={formGroupContext?.invalid || ariaInvalid}
          {...props}
        />
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
