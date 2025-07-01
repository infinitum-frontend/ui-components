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
import DateRangeCalendar, {
  DateRangeCalendarValue
} from 'Components/DateRangeCalendar/DateRangeCalendar'
import FormGroupContext from 'Components/Form/context/group'
import { createDate, formatDateToISO, parseLocalDateString } from 'Utils/date'
import cn from 'classnames'
import {
  ComponentPropsWithoutRef,
  ReactElement,
  useContext,
  useEffect,
  useState
} from 'react'
import DateInput from '../DateInput'
import { IconCalendar04 } from '@infinitum-ui/icons'
import { Icon } from '../Icon'
import { Space } from '../Space'
import './DateRangePicker.scss'
import useFormControlHandlers from '../Form/hooks/useFormControlHandlers'

/** Строка в формате YYYY-MM-DD */
export type DateRangePickerValue = [string | Date, string | Date]
export interface DateRangePickerProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  disabled?: boolean
  value: DateRangePickerValue
  required?: boolean
  /** Строка в формате YYYY-MM-DD */
  onChange: (dateArray: [string, string]) => void
  /** Строка в формате YYYY-MM-DD */
  min?: string
  /** Строка в формате YYYY-MM-DD */
  max?: string
  /**
   * Размер
   * @default medium
   */
  size?: 'medium' | 'small'
  /** Отображение кнопки очистки выбранного значения. При нажатии на кнопку вызывается обработчик onClear, а если он не был передан, то onChange. */
  clearable?: boolean
  placeholder?: string
}

const DateRangePicker = ({
  value,
  disabled,
  onChange,
  className,
  required: requiredProp,
  min,
  max,
  size = 'medium',
  clearable,
  placeholder = '__.__.____',
  ...props
}: DateRangePickerProps): ReactElement => {
  const [isOpened, setOpened] = useState(false)
  const [localValue, setLocalValue] = useState({
    from: value?.[0],
    to: value?.[1]
  })

  const { resetControlValidity } = useFormControlHandlers()

  useEffect(() => {
    setLocalValue({
      from: value?.[0],
      to: value?.[1]
    })
  }, [value])

  // Имитация onClear
  useEffect(() => {
    if (
      localValue.from === '' &&
      localValue.to === '' &&
      localValue.from !== value?.[0] &&
      localValue.to !== value?.[1]
    ) {
      onChange?.([localValue.from, localValue.to] as [string, string])
    }
  }, [localValue])

  const formGroupContext = useContext(FormGroupContext)
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

  return (
    <>
      <Space
        gap="xsmall"
        direction="horizontal"
        align="center"
        ref={refs.setReference}
        {...getReferenceProps({
          onClick(e) {
            e.stopPropagation()
          }
        })}
        className={cn('inf-date-range-picker', className)}
        {...props}
      >
        <DateInput
          placeholder={placeholder}
          min={min}
          max={max}
          required={required}
          clearable={clearable}
          value={localValue.from}
          onClear={() => setLocalValue({ ...localValue, from: '' })}
          prefix={
            <Icon hoverable size="small" color="primary">
              <IconCalendar04 />
            </Icon>
          }
          onComplete={(date) => {
            const parsedDate = parseLocalDateString(date)
            if (parsedDate) {
              setLocalValue({
                ...localValue,
                from: formatDateToISO(parsedDate)
              })
            }
          }}
          onPrefixClick={() => setOpened((prev) => !prev)}
          onFocus={() => setOpened(true)}
        />
        -
        <DateInput
          placeholder={placeholder}
          min={min}
          max={max}
          required={required}
          value={localValue.to}
          clearable={clearable}
          onClear={() => setLocalValue({ ...localValue, to: '' })}
          onComplete={(date) => {
            const parsedDate = parseLocalDateString(date)
            if (parsedDate) {
              setLocalValue({
                ...localValue,
                to: formatDateToISO(parsedDate)
              })
            }
          }}
          prefix={
            <Icon hoverable size="small" color="primary">
              <IconCalendar04 />
            </Icon>
          }
          onPrefixClick={() => setOpened((prev) => !prev)}
          onFocus={() => setOpened(true)}
        />
      </Space>
      <FloatingPortal>
        {isOpened && !disabled && (
          <FloatingFocusManager
            context={context}
            returnFocus={false}
            initialFocus={-1}
          >
            <DateRangeCalendar
              style={{
                position: 'absolute',
                overflowX: 'hidden',
                overflowY: 'hidden',
                top: y ?? 0,
                left: x ?? 0
              }}
              min={min}
              max={max}
              className="inf-date-range-picker__dropdown"
              value={
                value.map((el) =>
                  el ? createDate(el) : undefined
                ) as DateRangeCalendarValue
              }
              onChange={(dateArray) => {
                onChange?.(
                  dateArray.map((date) => formatDateToISO(date)) as [
                    string,
                    string
                  ]
                )
                resetControlValidity()
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

export default DateRangePicker
