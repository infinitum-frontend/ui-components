import { CSSProperties, FocusEventHandler, KeyboardEventHandler, ReactElement, useEffect, useRef, useState } from 'react'
import './index.scss'
import classNames from 'classnames'
import InfInput from '../Input/InfInput'
import { InfSelectProps } from './interface'
import InfPositioning from '../Positioning/InfPositioning'
import { InputRefHandler } from '../Input/interface'
import { TestSelectors } from '../../../test/selectors'

// TODO: сделать composeRef и прописать blur/focus где надо

const InfSelect = ({
  items,
  className = '',
  size = 'medium',
  onSubmit,
  inputRef,
  variant = 'split',
  autoFocus = false,
  disabled = false
}: InfSelectProps): ReactElement => {
  const [isFocused, setFocused] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<number>(0)

  const ref = useRef<HTMLDivElement>(null)

  const internalInputRef = useRef<InputRefHandler>(null)

  const composedRef = inputRef || internalInputRef

  useEffect(() => {
    if (autoFocus) {
      setFocused(true)
      composedRef.current?.focus()
    }
  }, [autoFocus])

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true)
  }
  const handleInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false)
  }

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveItem((prevState) => {
        if (prevState === items.length - 1) {
          return 0
        }

        return prevState + 1
      })
    }

    if (e.key === 'ArrowUp') {
      setActiveItem((prevState) => {
        if (prevState === 0) {
          return items.length - 1
        }

        return prevState - 1
      })
    }

    if (e.key === 'Escape') {
      setActiveItem(0)
      composedRef.current?.blur()
      setFocused(false)
    }

    if (e.key === 'Enter') {
      submit()
    }
  }

  const handleItemSelect = (index: number): void => {
    setActiveItem(() => index)
    submit()
  }

  const submit = (): void => {
    onSubmit?.(items[activeItem])
    blur()
  }

  const blur = (): void => {
    composedRef.current?.blur()
    setFocused(false)
  }

  const handleItemMouseOver = (index: number): void => {
    setActiveItem(index)
  }

  const calculateOffsetTop = (): number => variant === 'split' ? 0 : 6

  const calculateListStyles = (): CSSProperties => {
    return {
      height: `${(items.length * (size === 'small' ? 24 : 27)) + (size === 'small' ? 12 : 24)}px`,
      padding: size === 'small' ? '6px 9px' : '12px'
    }
  }

  return (
    <>
      <div
      ref={ref}
      data-testid={TestSelectors.select.wrapper}
      onKeyDown={handleKeyDown}
      className={classNames(
        'inf-select',
        className
      )}>
        <InfInput className={'inf-select__input'}
                  value={items[activeItem].text}
                  ref={composedRef}
                  size={size}
                  disabled={disabled}
                  readOnly={true}
                  collapseBottom={isFocused && variant === 'split'}
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus} />
      </div>

      {isFocused && (
        <InfPositioning getElementToAttach={() => ref.current}
                        offsetTop={calculateOffsetTop()}
                        placement={'bottom'}>
          <ul className={classNames(
            'inf-select__items',
            { 'inf-select__items--variant-split': variant === 'split' }
          )}
              data-testid={TestSelectors.select.list}
              style={calculateListStyles()}>
            {Boolean(items.length) && items.map((item, index) => (
              <li key={item.value}
                  onMouseOver={() => handleItemMouseOver(index)}
                  onClick={e => handleItemSelect(index)}
                  className={
                    classNames(
                      'inf-select__item',
                      `inf-select__item--size-${size}`,
                      { 'inf-select__item--active': index === activeItem }
                    )
                  }>
                {item.text}
              </li>
            ))}
          </ul>
        </InfPositioning>
      )}
    </>
  )
}

InfSelect.displayName = 'InfSelect'

export default InfSelect
