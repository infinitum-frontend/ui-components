import {
  KeyboardEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
  ReactElement,
  RefObject
} from 'react'
import './index.scss'
import cn from 'classnames'
import {
  SelectProps,
  StandardizedListItem,
  StandardizedListItemDefault
} from './interface'
import { Positioning } from 'Components/Positioning'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { TestSelectors } from 'Test/selectors'
import { useClickOutside } from 'Hooks/useClickOutside'

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
    },
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

    // refs
    const composedRef =
      (ref as RefObject<HTMLButtonElement>) ?? useRef<HTMLButtonElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    // effects
    useEffect(() => {
      if (autoFocus) {
        setFocused(true)
      }
    }, [autoFocus])

    useClickOutside([composedRef, listRef], () => setFocused(false))

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

    return (
      <>
        <button
          ref={composedRef}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          data-testid={TestSelectors.select.wrapper}
          type="button"
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

        {isFocused && !disabled && (
          <Positioning
            getElementToAttach={() => composedRef.current}
            offsetTop={2}
            placement={'bottom'}
          >
            <ul
              ref={listRef}
              className={cn('inf-select__items')}
              data-testid={TestSelectors.select.list}
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
          </Positioning>
        )}
      </>
    )
  }
)

Select.displayName = 'Select'

export default Select
