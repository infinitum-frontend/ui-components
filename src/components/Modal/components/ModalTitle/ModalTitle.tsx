import { PropsWithChildren, ReactElement } from 'react'
import { InfHeading } from '../../../Heading'

const ModalTitle = ({
  children
}: PropsWithChildren<ReactElement>): ReactElement | null => {
  return (
    <InfHeading className="inf-modal-title" level="3">
      {children}
    </InfHeading>
  )
}

export default ModalTitle
