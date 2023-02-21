import React from 'react'

import cn from 'classnames'
import styles from './CalendarComponents.module.css'

export default function CalendarFooter(props: {
  className?: string
}): React.ReactElement {
  const { className, ...attributes } = props
  return (
    <div
      {...attributes}
      aria-label="calendar-footer"
      className={cn(styles.body, className)}
    >
      <div> header</div>
    </div>
  )
}
