import { ReactElement, ReactNode } from 'react'
import '../style/list-item-content.scss'

export interface ListItemContentProps {
  children?: ReactNode
}

const ListItemContent = ({ children }: ListItemContentProps): ReactElement => {
  return <div className={'inf-list-item-content'}>{children}</div>
}

export default ListItemContent
