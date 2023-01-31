import { ReactElement, ReactNode } from 'react'
import '../style/list-item-content.scss'
import cn from 'classnames'

export interface ListItemContentProps {
  /** Занимает всю доступную ширину
   * @default true
   */
  stretched?: boolean
  children?: ReactNode
}

const ListItemContent = ({
  stretched = true,
  children
}: ListItemContentProps): ReactElement => {
  return (
    <div
      className={cn('inf-list-item-content', {
        'inf-list-item-content--unstretched': !stretched
      })}
    >
      {children}
    </div>
  )
}

export default ListItemContent
