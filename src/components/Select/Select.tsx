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
import { SelectProps, SelectOption } from './interface'
import { ReactComponent as ArrowDownIcon } from 'Icons/chevron-down.svg'
import { useClickOutside } from 'Hooks/useClickOutside'
import { mergeRefs } from 'react-merge-refs'
import { Modifier, usePopper } from 'react-popper'
import { createPortal } from 'react-dom'
import { useFormGroup } from 'Components/Form/context/group'

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
    const [reference, setReference] = useState<any>(null)
    const [popper, setPopper] = useState<any>(null)
    const [isFocused, setFocused] = useState<boolean>(false)
    const [activeItem, setActiveItem] = useState<number>(
      getIndexByValue(value, options) || 0
    )

    const formGroupData = useFormGroup()

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
          tabIndex={-1}
          ref={mergeRefs([ref, setReference])}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          type="button"
          className={cn(
            'inf-select',
            {
              [`inf-select--status-${status as string}`]: status,
              'inf-select--selected': Boolean(value),
              'inf-select--disabled': disabled
            },
            className
          )}
          {...props}
        >
          {value
            ? getItemByValue(value, options)?.label
            : defaultSelectItem.label}
          <span
            className={cn('inf-select__arrow', {
              'inf-select__arrow--selected': value !== undefined
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
