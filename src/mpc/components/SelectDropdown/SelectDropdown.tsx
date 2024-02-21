import React from 'react'
import toString from 'lodash/toString'
import { usePopper } from 'react-popper'

import styles from './SelectDropdown.module.css'
import cn from 'classnames'

import {
  getOptionById,
  ISelectDropdownOption,
  stubOption
} from './SelectDropdown.domain'
import useEscKeyDownEvent from '../../hooks/useEscKeyDownEvent'

// popper settings
const placement = 'bottom-start'
const modifiers = [
  {
    name: 'offset',
    enabled: true,
    options: {
      offset: [0, 5]
    }
  }
]

function Dropdown(props: {
  className?: string
  role?: string
  chosenId?: string | number
  placeHolder?: string
  resetValue?: string
  data?: ISelectDropdownOption[]
  onChange?: (arg0: string) => void
}): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const {
    className,
    role = 'select-dropdown',
    data = [],
    onChange = () => {},
    chosenId = '',
    placeHolder = '',
    resetValue = ''
  } = props

  const [visible, setVisibility] = React.useState(false)

  const referenceRef = React.useRef<HTMLButtonElement>(null)
  const popperRef = React.useRef<HTMLDivElement>(null)

  const {
    styles: popperStyles,
    attributes,
    update
  } = usePopper(referenceRef.current, popperRef.current, {
    placement,
    modifiers
  })

  React.useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  useEscKeyDownEvent(() => setVisibility(false))

  const handleOptionClick = (arg0: string): void => {
    onChange(arg0)
    setVisibility(false)
  }

  const handleDocumentClick = (event: MouseEvent): void => {
    if (
      referenceRef.current?.contains(event.target as Node) ||
      popperRef.current?.contains(event.target as Node)
    ) {
      return
    }

    setVisibility(false)
  }

  const titleValue = getOptionById(toString(chosenId), data).value

  return (
    <div className={cn(styles.popover, className)} role={role}>
      <button
        type="button"
        aria-label="action-dropdown"
        ref={referenceRef}
        onClick={() => {
          setVisibility(!visible)

          // eslint-disable-next-line no-void
          if (update) void update() // need for react-popper
        }}
        className={cn(styles.trigger)}
      >
        <span
          className={cn(
            styles.placeholder,
            titleValue && styles.placeholderWithValue
          )}
        >
          {placeHolder}
        </span>
        {titleValue ? (
          <div className={styles.triggerTitle}>
            <div className={styles.titleValue}>{titleValue}</div>
          </div>
        ) : null}
        <div
          className={cn(
            styles.icon,
            titleValue ? styles.iconWithValue : styles.iconEmpty
          )}
        />
      </button>

      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div
        aria-label="dropdown-container"
        ref={popperRef}
        style={{ ...popperStyles.popper }}
        {...attributes.popper}
      >
        {/* eslint-disable-next-line react/forbid-dom-props */}
        <div
          className={cn(styles.drop, styles.dropShadow)}
          style={{ ...popperStyles.offset }}
        >
          {visible ? (
            <div aria-label="dropdown-options" className={styles.options}>
              {resetValue ? (
                <button
                  type="button"
                  className={styles.option}
                  aria-label="dropdown-option-reset"
                  onClick={() => handleOptionClick(stubOption.id)}
                >
                  {resetValue}
                </button>
              ) : null}
              {data.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={styles.option}
                  aria-label="dropdown-option"
                  onClick={() => handleOptionClick(option.id)}
                >
                  {option.value}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
