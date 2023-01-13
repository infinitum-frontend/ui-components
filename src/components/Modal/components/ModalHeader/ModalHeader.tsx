import { PropsWithChildren, ReactElement } from 'react'
import './ModalHeader.scss'

const ModalHeader = ({
  children
}: PropsWithChildren<ReactElement>): ReactElement | null => {
  return (
    <div className="inf-modal-header">
      {children}
    </div>
  )
}

export default ModalHeader
