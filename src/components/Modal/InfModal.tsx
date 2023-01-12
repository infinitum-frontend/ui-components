import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react'
import { InfPortal } from '../Portal'
import './index.scss'
import { useClickOutside } from '../../hooks/useClickOutside'

export interface InfModalProps extends PropsWithChildren<ReactElement> {
  isOpen?: boolean
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  onClose: () => void
}

const InfModal = ({
  isOpen = false,
  closeOnClickOutside = true,
  closeOnEsc = true,
  children,
  onClose
}: InfModalProps): ReactElement | null => {
  let ref = null

  // обработка closeOnEsc
  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', keydownHandler)
    return () => document.removeEventListener('keydown', keydownHandler)
  }, [closeOnEsc])

  // обработка closeOnClickOutside
  if (closeOnClickOutside) {
    ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => {
      onClose()
    })
  }

  // render
  if (!isOpen) {
    return null
  }
  return (
    <InfPortal>
      <div className={'inf-modal__body'} ref={ref}>{children}</div>
      <div className={'inf-modal__backdrop'} />
    </InfPortal>
  )
}

export default InfModal
