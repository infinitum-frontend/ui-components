// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  KeyboardEventHandler,
  forwardRef,
  useEffect,
  useState,
  ReactElement,
  useMemo
} from 'react'
import './index.scss'
import cn from 'classnames'
import {
  SelectProps,
  StandardizedListItem,
  StandardizedListItemDefault
} from './interface'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { useClickOutside } from 'Hooks/useClickOutside'
import { mergeRefs } from 'react-merge-refs'
import { Modifier, usePopper } from 'react-popper'
import { createPortal } from 'react-dom'

export const defaultSelectItem: StandardizedListItemDefault = {
  value: -1,
  label: 'Не указано'
}

type SelectItem = StandardizedListItem<Record<string, any>>

const getIndexByValue = (
  value: StandardizedListItemDefault['value'] | undefined,
  items: SelectItem[]
): number => {
  return items.findIndex((item) => item.value === value)
}

const getItemByValue = (
  value: StandardizedListItemDefault['value'] | undefined,
  items: SelectItem[]
): SelectItem | undefined => {
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
      ...props
    }: SelectProps,
    ref
  ): ReactElement => {
    if (placeholder) {
      defaultSelectItem.label = placeholder
    }

    // state
    const [reference, setReference] = useState<any>(null)
    const [popper, setPopper] = useState<any>(null)
    const [isFocused, setFocused] = useState<boolean>(false)
    const [activeItem, setActiveItem] = useState<number>(
      getIndexByValue(value, options) || 0
    )

    // effects
    useEffect(() => {
      if (autoFocus) {
        setFocused(true)
      }
    }, [autoFocus])

    useClickOutside([reference, popper], () => setFocused(false))

    const handleClick = (): void => {
      setFocused((prevState) => !prevState)
    }

    const handleKeyDown: KeyboardEventHandler = (e) => {
      e.preventDefault()
      if (e.key === 'ArrowDown') {
        setActiveItem((prevState) => {
          if (prevState === options.length - 1) {
            return 0
          }

          return prevState + 1
        })
      }

      if (e.key === 'ArrowUp') {
        setActiveItem((prevState) => {
          if (prevState === 0) {
            return options.length - 1
          }

          return prevState - 1
        })
      }

      if (e.key === 'Escape') {
        setActiveItem(0)
        setFocused(false)
      }

      if (e.key === 'Enter') {
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
      setFocused(() => false)
      onChange?.(options[index])
    }

    const modifiers = useMemo(() => {
      const modifiers: Array<Modifier<any>> = [
        {
          name: 'equalWidth',
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn({ state }: { state: any }) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            state.styles.popper.width = `${state.rects.reference.width}px`
          },
          effect({ state }: { state: any }) {
            state.elements.popper.style.width = `${
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              state.elements.reference.offsetWidth
            }px`
          },
          enabled: true
        },
        {
          name: 'offset',
          enabled: true,
          options: { offset: [0, 2] }
        }
      ]

      return modifiers
    }, [])

    const { styles } = usePopper(reference, popper, {
      placement: 'bottom-start',
      modifiers
    })

    return (
      <>
        <button
          ref={mergeRefs([ref, setReference])}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'inf-select',
            {
              'inf-select--selected': value !== undefined,
              'inf-select--disabled': disabled
            },
            className
          )}
          {...props}
        >
          {value !== undefined
            ? getItemByValue(value, options)?.label
            : defaultSelectItem.label}
          <span
            className={cn('inf-select__arrow', {
              'inf-select__arrow--selected': value !== undefined
            })}
          >
            <ArrowDownIcon width={'10px'} height={'5px'} />
          </span>
        </button>

        {isFocused &&
          !disabled &&
          createPortal(
            <ul
              style={styles.popper}
              ref={setPopper}
              className={cn('inf-select__items')}
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
            </ul>,
            document.body
          )}
      </>
    )
  }
)

Select.displayName = 'Select'

export default Select
