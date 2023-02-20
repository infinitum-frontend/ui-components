/* eslint-disable react/forbid-dom-props */
import { ReactElement, useEffect, useRef, useState } from 'react'
import toString from 'lodash/toString'
import { usePopper } from 'react-popper'
import styles from './Select.module.css'
import cn from 'classnames'
import {
  getOptionById,
  ISelectDropdownOption,
  stubOption
} from './Select.domain'
import { notSetSelect } from '../../constants/domains.constants'

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

function Select(props: {
  className?: string
  buttonClassName?: string
  role?: string
  chosenId?: string | number
  placeHolder?: string
  resetValue?: string
  data?: ISelectDropdownOption[]
  onChange?: (arg0: string) => void
}): ReactElement {
  const {
    className,
    buttonClassName,
    role = 'select-dropdown',
    data = [],
    onChange = () => {
      //  default func
    },
    chosenId = notSetSelect,
    placeHolder = '',
    resetValue = ''
  } = props

  const [visible, setVisibility] = useState(false)

  const referenceRef = useRef<HTMLButtonElement>(null)
  const popperRef = useRef<HTMLDivElement>(null)

  const {
    styles: popperStyles,
    attributes,
    update
  } = usePopper(referenceRef.current, popperRef.current, {
    placement,
    modifiers
  })

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

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
        className={cn(styles.trigger, buttonClassName)}
      >
        <div className={styles.triggerTitle}>
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
          {getOptionById(toString(chosenId), data).value || (
            <span className={styles.placeholder}>{placeHolder}</span>
          )}
        </div>
        <div className={cn(styles.icon, { [styles.invertedIcon]: visible })} />
      </button>

      <div
        aria-label="dropdown-container"
        ref={popperRef}
        className={styles.dropdownContainer}
        style={{ ...popperStyles.popper, ...{ width: '100%' } }}
        {...attributes.popper}
      >
        {visible ? (
          <div
            className={cn(styles.drop, styles.dropShadow)}
            style={{ ...popperStyles.offset }}
          >
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
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Select
