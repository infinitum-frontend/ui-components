import { KeyboardEventHandler, ReactElement, useEffect, useRef, useState } from 'react'
import './index.scss'
import classNames from 'classnames'
import { InfSelectProps, StandardizedListItem, StandardizedListItemDefault } from './interface'
import InfPositioning from '../Positioning/InfPositioning'
import { ReactComponent as ArrowDownIcon } from '../../icons/chevron-down.svg'
import { TestSelectors } from '../../../test/selectors'
import { useClickOutside } from '../../hooks/useClickOutside'

export const defaultSelectItem: StandardizedListItemDefault = {
  value: -1,
  label: 'Не указано'
}

type SelectItem = StandardizedListItem<Record<string, any>>

const getIndexByValue = (value: StandardizedListItemDefault['value'] | undefined, items: SelectItem[]): number => {
  return items.findIndex((item) => item.value === value)
}

const getItemByValue = (value: StandardizedListItemDefault['value'] | undefined, items: SelectItem[]): SelectItem | undefined => {
  return items.find(item => item.value === value)
}

/** Компонент для выбора значения из выпадающег списка */
const InfSelect = ({
  options = [],
  className = '',
  size = 'medium',
  onChange,
  autoFocus = false,
  value,
  disabled = false,
  placeholder,
  ...props
}: InfSelectProps): ReactElement => {
  if (placeholder) {
    defaultSelectItem.label = placeholder
  }

  // state
  const [isFocused, setFocused] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<number>(getIndexByValue(value, options) || 0)

  // refs
  const ref = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // effects
  useEffect(() => {
    if (autoFocus) {
      setFocused(true)
    }
  }, [autoFocus])

  useClickOutside([ref, listRef], () => setFocused(false))

  const handleClick = (): void => {
    setFocused(prevState => !prevState)
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
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-testid={TestSelectors.select.wrapper}
        className={classNames(
          'inf-select',
          {
            'inf-select--selected': value !== undefined,
            'inf-select--disabled': disabled
          },
          className
        )}
        {...props}
      >
        {value !== undefined ? getItemByValue(value, options)?.label : defaultSelectItem.label}
        <span className={classNames('inf-select__arrow', { 'inf-select__arrow--selected': value !== undefined })}>
          <ArrowDownIcon width={'10px'} height={'5px'} />
        </span>
      </button>

      {isFocused && (
        <InfPositioning
          getElementToAttach={() => ref.current}
          offsetTop={2}
          placement={'bottom'}>
          <ul
            ref={listRef}
            className={classNames(
              'inf-select__items',
              `inf-select__items--size-${size}`
            )}
            data-testid={TestSelectors.select.list}>
            {Boolean(options.length) && options.map((option, index) => (
              <li
                key={option.value}
                onMouseOver={() => handleItemMouseOver(index)}
                onClick={() => handleItemSelect(option.value)}
                className={
                    classNames(
                      'inf-select__item',
                      `inf-select__item--size-${size}`,
                      { 'inf-select__item--active': index === activeItem }
                    )
                  }>
                {option.label}
              </li>
            ))}
          </ul>
        </InfPositioning>
      )}
    </>
  )
}

export default InfSelect
