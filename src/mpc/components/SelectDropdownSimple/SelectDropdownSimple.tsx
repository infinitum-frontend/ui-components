import React from 'react'
import { usePopper } from 'react-popper'

import styles from './SelectDropdownSimple.module.css'
import cn from 'classnames'

import {
  getOptionById,
  ISelectDropdownOption
} from './SelectDropdownSimple.domain'
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

function DropdownSimple(props: {
  chosenId: string
  role?: string
  data?: ISelectDropdownOption[]
  onChange?: (arg0: string) => void
  titleBold?: boolean
}): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const {
    role = 'select-dropdown',
    data = [],
    onChange = () => {},
    chosenId,
    titleBold = false
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
    // TODO: to hook
    if (
      referenceRef.current?.contains(event.target as Node) ||
      popperRef.current?.contains(event.target as Node)
    ) {
      return
    }

    setVisibility(false)
  }

  const titleValue = getOptionById(chosenId, data).value

  return (
    <div className={styles.popover} role={role}>
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
        <div className={styles.triggerTitle}>
          <div
            className={cn(
              styles.titleValue,
              titleBold ? styles.titleValueBold : styles.titleValueNormal
            )}
          >
            {titleValue}
          </div>
        </div>
        <div
          className={cn(
            styles.icon,
            titleBold ? styles.iconChevron : styles.iconArrow
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
          className={cn(styles.drop, { [styles.dropShadow]: visible })}
          style={{ ...popperStyles.offset }}
        >
          {visible ? (
            <div aria-label="dropdown-options" className={styles.options}>
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

export default DropdownSimple
