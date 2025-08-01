import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import cn from 'classnames'
import FormContext from 'Components/Form/context/form'
import FormGroupContext from 'Components/Form/context/group'
import useFormControlHandlers from 'Components/Form/hooks/useFormControlHandlers'
import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  useState
} from 'react'
import { mergeRefs } from 'react-merge-refs'
import SelectButton from './components/SelectButton'
import './Select.scss'
import { SelectOption, SelectProps } from './types'

export const defaultSelectItem: SelectOption = {
  value: -1,
  label: 'Выбрать значение'
}

const getIndexByValue = (
  value: SelectOption['value'] | undefined,
  items: SelectOption[]
): number => {
  return items.findIndex((item) => item.value === value)
}

const getItemByValue = (
  value: SelectOption['value'],
  items: SelectOption[]
): SelectOption | undefined => {
  return items.find((item) => item.value === value)
}

/** Компонент для выбора значения из выпадающего списка */
const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options = [],
      className = '',
      onChange,
      autoFocus = false,
      value,
      disabled: disabledProp = false,
      loading = false,
      placeholder = defaultSelectItem.label as string,
      required = false,
      status,
      maxItemsCount = 12,
      'aria-required': ariaRequired,
      'aria-invalid': ariaInvalid,
      ...props
    }: SelectProps,
    ref
  ): ReactElement => {
    // ============================= state =============================
    const [isOpened, setOpened] = useState(false)
    const [isFocused, setFocused] = useState(false)
    const [activeItem, setActiveItem] = useState(
      value ? getIndexByValue(value, options) : 0
    )

    const prefix = useId()

    const formGroupContext = useContext(FormGroupContext)
    const formContext = useContext(FormContext)
    const { onControlInvalid, resetControlValidity } = useFormControlHandlers()
    const disabled = disabledProp || formContext?.disabled

    const displayRef = useRef<HTMLButtonElement>(null)
    const selectRef = useRef<HTMLSelectElement>(null)

    // ============================= effects =============================
    useEffect(() => {
      if (autoFocus) {
        setOpened(true)
        setFocused(true)
      }
    }, [autoFocus])

    // ============================= handlers =============================
    const handleClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
      if (
        displayRef.current?.contains(e.target as HTMLElement) &&
        (e.target as HTMLElement).tagName !== 'SELECT'
      ) {
        setOpened((prev) => !prev)
      }
    }

    // фокус, который поднимается от внутреннего нативного селекта
    const handleFocus: FocusEventHandler = (e) => {
      e.preventDefault()
      setFocused(true)
    }

    // блюр, который поднимается от внутреннего нативного селекта. Если было нажатие на элементы выпадающего списка, фокус не скидывается
    const handleBlur: FocusEventHandler = (e) => {
      const target = e.relatedTarget
      if (target?.getAttribute?.('data-selector') === 'inf-select-old-items') {
        return
      }

      setFocused(false)
    }

    const handleKeyDown: KeyboardEventHandler = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveItem((prevState) => {
            if (prevState === options.length - 1) {
              return 0
            }

            return prevState + 1
          })
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveItem((prevState) => {
            if (prevState === 0) {
              return options.length - 1
            }

            return prevState - 1
          })
          break
        case 'Escape':
          e.preventDefault()
          setActiveItem(0)
          setOpened(false)
          break
        case ' ':
          e.preventDefault()
          setOpened(true)
          break
        case 'Enter':
          e.preventDefault()
          if (isOpened) {
            submit(activeItem)
          } else {
            setOpened(true)
          }
          break
        case 'Tab':
          if (isOpened) {
            setOpened(false)
          }
      }
    }

    const handleItemSelect = (id: number | string): void => {
      const index = getIndexByValue(id, options)
      setActiveItem(index)
      // сохраняем состояния фокуса на элементе триггере при опции с помощью мышки
      displayRef.current?.focus()
      submit(index)
    }

    const handleItemMouseOver = (index: number): void => {
      setActiveItem(index)
    }

    const submit = (index: number): void => {
      if (index < 0) {
        return
      }

      setOpened(false)
      resetControlValidity()
      onChange?.(options[index])
    }

    // ============================= floating =============================
    const { x, y, refs, context } = useFloating({
      open: isOpened,
      onOpenChange: setOpened,
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(4),
        flip(),
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`
            })
          }
        })
      ]
    })

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useDismiss(context, {
        outsidePress: (e) => {
          if (formGroupContext) {
            return (
              (e.target as HTMLLabelElement)?.htmlFor !== formGroupContext?.id
            )
          } else {
            return true
          }
        }
      })
    ])

    // ============================= render =============================
    const isValueExists = Boolean(value) || Number.isInteger(value)
    const displayValue = isValueExists
      ? getItemByValue(value as string | number, options)?.label
      : placeholder
    // высота элемента, паддинг и границы
    const maxHeight = maxItemsCount * 32 + 4 + 2

    return (
      <>
        <SelectButton
          tabIndex={-1}
          ref={mergeRefs([ref, refs.setReference, displayRef])}
          disabled={disabled}
          loading={loading}
          selected={isValueExists}
          opened={isOpened}
          focused={isFocused}
          status={status}
          onFocus={handleFocus}
          onBlur={handleBlur}
          title={typeof displayValue === 'string' ? displayValue : ''}
          isPlaceholder={displayValue === placeholder}
          className={cn(className, 'inf-select-old')}
          {...getReferenceProps({
            onKeyDown: handleKeyDown,
            onClick(e) {
              e.stopPropagation()
              handleClick(e as any)
            }
          })}
          {...props}
        >
          {displayValue}
          <select
            ref={selectRef}
            required={formGroupContext?.required || required}
            aria-required={
              formGroupContext?.required || required || ariaRequired
            }
            aria-invalid={formGroupContext?.invalid || ariaInvalid}
            disabled={disabled || loading}
            id={formGroupContext?.id}
            value={value}
            onInvalid={onControlInvalid}
            onChange={() => {}}
          >
            <option value={''} />
            {options.map((option) => (
              <option value={option.value} key={prefix + String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>
        </SelectButton>

        <FloatingPortal>
          {isOpened && !disabled && !loading && (
            <ul
              style={{
                position: 'absolute',
                maxHeight: `${maxHeight}px`,
                overflowX: 'hidden',
                overflowY: 'auto',
                top: y ?? 0,
                left: x ?? 0
              }}
              ref={refs.setFloating}
              className="inf-select-old__items"
              data-selector="inf-select-old-items"
              {...getFloatingProps({
                onClick(e) {
                  e.stopPropagation()
                }
              })}
            >
              {Boolean(options.length) &&
                options.map((option, index) => (
                  <li
                    key={String(option.value) + prefix}
                    title={typeof option.label === 'string' ? option.label : ''}
                    onMouseOver={() => handleItemMouseOver(index)}
                    onClick={() => handleItemSelect(option.value)}
                    className={cn('inf-select-old__item', {
                      'inf-select-old__item--active': index === activeItem
                    })}
                  >
                    {option.label}
                  </li>
                ))}
            </ul>
          )}
        </FloatingPortal>
      </>
    )
  }
)

Select.displayName = 'Select'

export default Select
