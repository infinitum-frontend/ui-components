import { PropsWithChildren, ReactElement } from 'react'
import './ModalFooter.scss'

const ModalFooter = ({
  children
}: PropsWithChildren<ReactElement>): ReactElement | null => {
  return (
    <div className="inf-modal-footer">
      {children}
    </div>
  )
}

export default ModalFooter
