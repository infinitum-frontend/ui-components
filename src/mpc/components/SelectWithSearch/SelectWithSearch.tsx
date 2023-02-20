/* eslint-disable react/forbid-dom-props */
import React from 'react'
// import toString from 'lodash/toString';
import { usePopper } from 'react-popper'

import styles from './SelectWithSearch.module.css'
import cn from 'classnames'

import { ISelectWithSearchOption } from './SelectWithSearch.domain'
import { getValueSearchFn } from '../../infrastructure/string/string'
import Scrollbars from 'react-custom-scrollbars-2'

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

function SelectWithSearch(props: {
  className?: string
  role?: string
  placeHolder?: string
  searchPlaceholder?: string
  data?: ISelectWithSearchOption[]
  onChange?: (arg0: string) => void
  hintOnHover?: boolean
}): React.ReactElement {
  const {
    className,
    role = 'select-dropdown',
    data = [],
    onChange = () => {
      //  default func
    },
    searchPlaceholder = 'Найти',
    placeHolder = '',
    hintOnHover = false
  } = props

  const [filteredData, setFilteredData] =
    React.useState<ISelectWithSearchOption[]>(data)
  const [inputValue, setInputValue] = React.useState('')
  const [chosenValue, setChosenValue] = React.useState<string | null>(null)
  const [visibility, setVisibility] = React.useState(false)

  const referenceRef = React.useRef<HTMLButtonElement>(null)
  const popperRef = React.useRef<HTMLDivElement>(null)

  const handleDocumentClick = (event: MouseEvent): void => {
    if (
      referenceRef.current?.contains(event.target as Node) ||
      popperRef.current?.contains(event.target as Node)
    ) {
      return
    }
    setVisibility(false)
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  const {
    styles: popperStyles,
    attributes,
    update
  } = usePopper(referenceRef.current, popperRef.current, {
    placement,
    modifiers
  })

  const handleOptionClick = (arg0: ISelectWithSearchOption): void => {
    setVisibility(false)
    setChosenValue(arg0.value)
    setInputValue('')
    setFilteredData(data)
    onChange(arg0.id)
  }

  const handleInputChange = (arg0: string): void => {
    setInputValue(arg0)
    const minStringLengthForSearch = 1
    if (arg0.trim().length < minStringLengthForSearch) {
      setFilteredData(data)
    } else {
      const filtered = data.filter(
        getValueSearchFn<ISelectWithSearchOption>(arg0)
      )
      setFilteredData(filtered)
    }
  }

  const showHint = hintOnHover && chosenValue && !visibility

  return (
    <div className={cn(styles.popover, className)} role={role}>
      <button
        type="button"
        aria-label="action-dropdown"
        ref={referenceRef}
        onClick={() => {
          setVisibility(!visibility)
          // eslint-disable-next-line no-void
          if (update) void update() // need for react-popper
        }}
        className={cn(styles.trigger)}
      >
        <div className={styles.triggerTitle}>
          {chosenValue ?? (
            <span className={styles.placeholder}>{placeHolder}</span>
          )}
        </div>
        <div
          className={cn(styles.icon, { [styles.invertedIcon]: visibility })}
        />
        {showHint && <div className={styles.hint}>{chosenValue}</div>}
      </button>

      <div
        aria-label="dropdown-container"
        ref={popperRef}
        className={styles.dropdownContainer}
        style={{ ...popperStyles.popper, ...{ width: '100%' } }}
        {...attributes.popper}
      >
        {visibility ? (
          <div
            className={cn(styles.drop, styles.dropShadow)}
            style={{ ...popperStyles.offset }}
          >
            <div className={styles.searchContainer}>
              <input
                className={styles.searchInput}
                aria-label="string-search"
                placeholder={searchPlaceholder}
                onChange={(e) => handleInputChange(e.target.value)}
                value={inputValue}
              />
              <div className={styles.breakLine} />
            </div>

            <div aria-label="dropdown-options" className={styles.options}>
              <Scrollbars autoHeight>
                {filteredData.length === 0 ? (
                  <div className={styles.message}>Ничего не найдено</div>
                ) : (
                  filteredData.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      className={styles.option}
                      aria-label="dropdown-option"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.value}
                    </button>
                  ))
                )}
              </Scrollbars>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SelectWithSearch
