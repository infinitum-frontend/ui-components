// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import { DateCalendar } from 'Components/DateCalendar'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'
import { createDate, formatDateToISO, parseLocalDateString } from 'Utils/date'
import cn from 'classnames'
import {
  ComponentPropsWithoutRef,
  MouseEvent,
  ReactElement,
  useContext,
  useState
} from 'react'
import './DatePicker.scss'
import DateInput from '../DateInput'
import { Icon } from '~/src'
import { IconCalendar04 } from '@infinitum-ui/icons'

export interface DatePickerProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'value' | 'onChange' | 'onInput'
  > {
  disabled?: boolean
  /** Дата или строка в формате YYYY-MM-DD */
  value?: string | Date
  required?: boolean
  /** Плейсхолдер для внутреннего инпута */
  placeholder?: string
  /** Строка в формате YYYY-MM-DD */
  onChange?: (date: string) => void
  /** Строка в формате YYYY-MM-DD */
  min?: string
  /** Строка в формате YYYY-MM-DD */
  max?: string
  /**
   * Размер
   * @default medium
   */
  size?: 'medium' | 'small'
  /** Показывать кнопку "Сегодня" */
  withTodayButton?: boolean
  /** Отображение кнопки очистки выбранного значения. При нажатии на кнопку вызывается обработчик onClear, а если он не был передан, то onChange. */
  clearable?: boolean
  /** Обработчик нажатия на кнопку очистки значения, которая отображается при clearable. Можно определить в нём произвольную логику. Если его не передать, то будет вызван onChange */
  onClear?: () => void
}

const DatePicker = ({
  disabled,
  value,
  onChange,
  className,
  placeholder = '__.__.____',
  onClick,
  required: requiredProp,
  min,
  max,
  size = 'medium',
  withTodayButton = false,
  clearable,
  onClear,
  ...props
}: DatePickerProps): ReactElement => {
  const [isOpened, setOpened] = useState(false)
  const formGroupContext = useContext(FormGroupContext)
  const { resetControlValidity } = useFormControlHandlers()
  const required = requiredProp || formGroupContext?.required

  // ============================= floating =============================
  const { x, y, refs, context } = useFloating({
    open: isOpened,
    onOpenChange: setOpened,
    placement: 'bottom-start',
    middleware: [offset(4), flip()]
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context)
  ])

  // ============================= handlers =============================

  const handleClear = (): void => {
    if (onClear) {
      onClear()
    } else {
      onChange?.('')
    }
  }

  // ============================= render =============================
  const showClearButton = clearable && Boolean(value)

  return (
    <>
      <div
        ref={refs.setReference}
        className={cn('inf-datepicker', className)}
        {...props}
        {...getReferenceProps({
          onClick(e) {
            e.stopPropagation()

            onClick?.(e as MouseEvent<HTMLDivElement>)
          }
        })}
      >
        <DateInput
          clearable={showClearButton}
          onClear={handleClear}
          value={value}
          size={size}
          placeholder={placeholder}
          min={min}
          max={max}
          required={required}
          onComplete={(val) => {
            onChange?.(formatDateToISO(parseLocalDateString(val) as Date))
          }}
          onAccept={(value) => {
            if (!value) {
              onChange?.(value)
            }
          }}
          prefix={
            <Icon hoverable size="small">
              <IconCalendar04 />
            </Icon>
          }
          onPrefixClick={() => setOpened((prev) => !prev)}
          onFocus={() => setOpened(true)}
        />
      </div>

      <FloatingPortal>
        {isOpened && !disabled && (
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            returnFocus={false}
          >
            <DateCalendar
              withTodayButton={withTodayButton}
              style={{
                position: 'absolute',
                overflowX: 'hidden',
                overflowY: 'hidden',
                top: y ?? 0,
                left: x ?? 0
              }}
              min={min}
              max={max}
              className="inf-datepicker__dropdown"
              value={value ? createDate(value) : new Date()}
              onChange={(date) => {
                resetControlValidity()
                onChange?.(formatDateToISO(date))
                setOpened(false)
              }}
              ref={refs.setFloating}
              {...getFloatingProps({
                onClick(e) {
                  e.stopPropagation()
                }
              })}
            />
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  )
}

export default DatePicker
