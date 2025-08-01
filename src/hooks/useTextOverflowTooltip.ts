import { MouseEventHandler, useRef, useState } from 'react'

interface UseTextOverflowTooltip {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  handleMouseEnter: MouseEventHandler<HTMLDivElement>
  handleMouseLeave: MouseEventHandler<HTMLDivElement>
}
export default function useTextOverflowTooltip(): UseTextOverflowTooltip {
  const [isOpen, setOpen] = useState(false)

  const hoverDelayTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e): void => {
    const element = e.currentTarget

    // показываем тултип с полным названием только если текст заголовка обрезался
    const isTextTruncated = element
      ? element.offsetWidth < element.scrollWidth
      : false

    if (isTextTruncated) {
      hoverDelayTimeout.current = setTimeout(() => {
        setOpen(true)
      }, 200)
    }
  }

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (): void => {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current)
    }

    handleHideTooltip()
  }

  const handleHideTooltip = (): void => {
    if (!isOpen) return
    setOpen(false)
  }

  return {
    isOpen,
    onOpenChange: setOpen,
    handleMouseEnter,
    handleMouseLeave
  }
}
