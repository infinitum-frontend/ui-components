import { KeyboardEventHandler, useState } from 'react'
import { SelectOption, FlattenOption } from '../utils/types'
import { isGroupLabel } from '../utils/helpers'

// TODO: если на item будет ховер, то он не скидывается при нажатии по стрелкам клавиатур, а должен?
// TODO: в multiple grouped при нажатии стрелки вниз фокусируется первый чекбокс
// TODO: переиспользовать решение https://github.com/gravity-ui/uikit/blob/main/src/components/List/List.tsx#L83C4-L95C6
// TODO: не работает если есть скроллинг

const useKeyboardNavigation = ({
  options,
  onSelect,
  isOpen,
  setOpen
}: {
  options: FlattenOption[]
  onSelect: (option: SelectOption) => void
  isOpen: boolean
  setOpen: (value: boolean) => void
}): {
  handleKeyDown: KeyboardEventHandler
  activeItemIndex: number
  setActiveItemIndex: (value: number) => void
} => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(
    isGroupLabel(options[0] || {}) ? 1 : 0
  )

  const handleKeyDown: KeyboardEventHandler = (e): void => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveItemIndex((prevIndex) => {
          console.log('setActiveItemIndex', prevIndex, options.length)
          const isLast = prevIndex === options.length - 1
          const next = prevIndex + 1

          if (prevIndex > options.length - 1) {
            return 0
          }

          if (isLast) {
            const isFirstGroup = isGroupLabel(options[0] || {})
            return isFirstGroup ? 1 : 0
          }

          if (isGroupLabel(options[next] || {})) {
            if (next === options.length - 1) {
              return 0
            }
            return prevIndex + 2
          }

          return next
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveItemIndex((prevIndex) => {
          if (prevIndex > options.length - 1) {
            return 0
          }

          if (prevIndex === 0 && !isGroupLabel(options[prevIndex] || {})) {
            return options.length - 1
          }

          if (isGroupLabel(options[prevIndex - 1] || {})) {
            if (prevIndex - 1 === 0) {
              return options.length - 1
            }

            return prevIndex - 2
          }

          return prevIndex - 1
        })
        break
      case 'Escape':
        e.preventDefault()
        setActiveItemIndex(0)
        setOpen(false)
        break
      case ' ':
        e.preventDefault()
        setOpen(true)
        break
      case 'Enter':
        e.preventDefault()
        if (isOpen) {
          const selectedOption = options[activeItemIndex] as SelectOption
          onSelect(selectedOption)
        } else {
          setOpen(true)
        }
        break
      case 'Tab':
        if (isOpen) {
          setOpen(false)
        }
    }
  }

  return {
    activeItemIndex,
    handleKeyDown,
    setActiveItemIndex
  }
}

export default useKeyboardNavigation
