import { FocusEventHandler, KeyboardEventHandler, ReactElement, useRef, useState } from 'react'
import './index.scss'
import classNames from 'classnames'
import InfInput from '../Input/InfInput'
import { InfSelectProps } from './interface'
import InfPositioning from '../InfPositioning/InfPositioning'
import { InputRefHandler } from '../Input/interface'

// TODO: сделать composeRef и прописать blur/focus где надо

const InfSelect = ({
  items,
  className = '',
  size = 'medium',
  onSubmit,
  inputRef
}: InfSelectProps): ReactElement => {
  const [isFocused, setFocused] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<number>(0)

  const ref = useRef<HTMLDivElement>(null)

  const internalInputRef = useRef<InputRefHandler>(null)

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true)
  }

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setActiveItem(0)
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
      inputRef?.current?.blur()
      setFocused(false)
    }

    if (e.key === 'Enter') {
      onSubmit?.(items[activeItem])
      setFocused(false)
    }
  }

  const handleItemMouseOver = (index: number): void => {
    setActiveItem(index)
  }

  const getElementToAttach = (): HTMLElement | null => ref.current

  return (
    <>
      <div
      ref={ref}
      onKeyDown={handleKeyDown}
      className={classNames(
        'inf-select',
        className
      )}>
        <InfInput className={'inf-select__input'}
                  value={items[activeItem].text}
                  ref={inputRef || internalInputRef}
                  size={size}
                  readOnly={true}
                  collapseBottom={isFocused}
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus} />
      </div>

      {isFocused && (
        <InfPositioning getElementToAttach={getElementToAttach}
                        placement={'bottom'}>
          <ul className={'inf-select__items'}>
            {Boolean(items.length) && items.map((item, index) => (
              <li key={item.value}
                  onMouseOver={() => handleItemMouseOver(index)}
                  className={
                    classNames(
                      'inf-select__item',
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
