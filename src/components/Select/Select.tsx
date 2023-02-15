// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  KeyboardEventHandler,
  forwardRef,
  useEffect,
  useState,
  ReactElement
} from 'react'
import './index.scss'
import cn from 'classnames'
import { SelectProps, SelectOption } from './interface'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { mergeRefs } from 'react-merge-refs'
import { useFormGroup } from 'Components/Form/context/group'
import {
  autoUpdate,
  flip,
  offset,
  useFloating,
  FloatingPortal,
  useInteractions,
  useClick,
  useDismiss,
  size
} from '@floating-ui/react'

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

/** Компонент для выбора значения из выпадающег списка */
const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options = [],
      className = '',
      onChange,
      autoFocus = false,
      value,
      disabled = false,
      placeholder,
      required = false,
      status,
      id,
      ...props
    }: SelectProps,
    ref
  ): ReactElement => {
    if (placeholder) {
      defaultSelectItem.label = placeholder
    }

    // state
    const [isFocused, setFocused] = useState<boolean>(false)
    const [activeItem, setActiveItem] = useState<number>(
      getIndexByValue(value, options) || 0
    )

    const isValueExists = Boolean(value) || Number.isInteger(value)
    const formGroupData = useFormGroup()

    // effects
    useEffect(() => {
      if (autoFocus) {
        setFocused(true)
      }
    }, [autoFocus])

    // handlers
    const handleClick = (): void => {
      setFocused((prevState) => !prevState)
    }

    const handleKeyDown: KeyboardEventHandler = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveItem((prevState) => {
          if (prevState === options.length - 1) {
            return 0
          }

          return prevState + 1
        })
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveItem((prevState) => {
          if (prevState === 0) {
            return options.length - 1
          }

          return prevState - 1
        })
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        setActiveItem(0)
        setFocused(false)
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        submit(activeItem)
      }
    }

    const handleItemSelect = (id: number | string): void => {
      const index = getIndexByValue(id, options)
      setActiveItem(index)
      submit(index)
    }

    const handleItemMouseOver = (index: number): void => {
      setActiveItem(index)
    }

    const submit = (index: number): void => {
      if (index < 0) {
        return
      }

      setFocused(() => false)
      onChange?.(options[index])
    }

    // floating
    const { x, y, refs, context } = useFloating({
      open: isFocused,
      onOpenChange: handleClick,
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(2),
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
      useClick(context),
      useDismiss(context)
    ])

    return (
      <>
        <button
          tabIndex={-1}
          ref={mergeRefs([ref, refs.setReference])}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          type="button"
          className={cn(
            'inf-select',
            {
              [`inf-select--status-${status as string}`]: status,
              'inf-select--selected': isValueExists,
              'inf-select--disabled': disabled
            },
            className
          )}
          {...getReferenceProps()}
          {...props}
        >
          {isValueExists
            ? getItemByValue(value as string | number, options)?.label
            : defaultSelectItem.label}
          <span
            className={cn('inf-select__arrow', {
              'inf-select__arrow--selected': isValueExists
            })}
          >
            <ArrowDownIcon width={'10px'} height={'5px'} />
          </span>
          <select
            required={required}
            id={formGroupData?.id || id}
            value={value}
            onChange={() => null}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <option value={''} />
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </button>

        <FloatingPortal>
          {isFocused && !disabled && (
            <ul
              style={{
                position: 'absolute',
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
