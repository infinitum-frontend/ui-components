// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  KeyboardEventHandler,
  forwardRef,
  useEffect,
  useState,
  ReactElement,
  useRef,
  FocusEventHandler,
  MouseEventHandler,
  FormEventHandler
} from 'react'
import '../style/index.scss'
import cn from 'classnames'
import { SelectProps, SelectOption } from '../interface'
import { mergeRefs } from 'react-merge-refs'
import { useFormGroup } from 'Components/Form/context/group'
import {
  autoUpdate,
  flip,
  offset,
  useFloating,
  FloatingPortal,
  useInteractions,
  useDismiss,
  size
} from '@floating-ui/react'
import SelectButton from 'Components/Select/components/SelectButton'

export const defaultSelectItem: SelectOption = {
  value: -1,
  label: 'Не указано'
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
      disabled = false,
      placeholder = defaultSelectItem.label as string,
      required = false,
      status,
      maxItemsCount = 12,
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

    const formGroupData = useFormGroup()
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
      const classList = e.relatedTarget?.classList

      if (classList?.contains('inf-select__items')) {
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

    const handleInvalid: FormEventHandler<HTMLSelectElement> = () => {
      if (formGroupData) {
        formGroupData.setInvalid?.(true)
        selectRef.current?.setCustomValidity(formGroupData.invalidMessage || '')
      }
    }

    const submit = (index: number): void => {
      if (index < 0) {
        return
      }

      setOpened(false)
      if (formGroupData) {
        formGroupData.setInvalid?.(false)
        selectRef.current?.setCustomValidity('')
      }
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
          if (formGroupData) {
            return (e.target as HTMLLabelElement)?.htmlFor !== formGroupData?.id
          } else {
            return true
          }
        }
      })
    ])

    // ============================= render =============================
    const isValueExists = Boolean(value) || Number.isInteger(value)
    // высота элемента, паддинг и границы
    const maxHeight = maxItemsCount * 32 + 4 + 2

    return (
      <>
        <SelectButton
          tabIndex={-1}
          ref={mergeRefs([ref, refs.setReference, displayRef])}
          disabled={disabled}
          selected={isValueExists}
          focused={isFocused}
          status={status}
          onFocus={handleFocus}
          onClick={handleClick}
          onBlur={handleBlur}
          className={cn(className, 'inf-select')}
          {...getReferenceProps({
            onKeyDown: handleKeyDown
          })}
          {...props}
        >
          {isValueExists
            ? getItemByValue(value as string | number, options)?.label
            : placeholder}
          <select
            ref={selectRef}
            required={formGroupData?.required || required}
            aria-required={formGroupData?.required || required}
            aria-invalid={formGroupData?.invalid || undefined}
            disabled={disabled}
            id={formGroupData?.id}
            value={value}
            onInvalid={handleInvalid}
            onChange={() => null}
          >
            <option value={''} />
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </SelectButton>

        <FloatingPortal>
          {isOpened && !disabled && (
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
              className={cn('inf-select__items')}
              {...getFloatingProps()}
            >
              {Boolean(options.length) &&
                options.map((option, index) => (
                  <li
                    key={option.value}
                    onMouseOver={() => handleItemMouseOver(index)}
                    onClick={() => handleItemSelect(option.value)}
                    className={cn('inf-select__item', {
                      'inf-select__item--active': index === activeItem
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
